// NOTE(krishan711): this runs in node (inside vite), so it must only import node builtins and never the browser code
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import type { HtmlTagDescriptor, IndexHtmlTransformContext, IndexHtmlTransformResult, Logger, Plugin, ResolvedConfig } from 'vite';

export interface IKibaFontsPluginOptions {
  // NOTE(krishan711): where downloaded stylesheets and fonts are kept between builds, defaults to node_modules/.cache/kiba-fonts in the vite root
  cacheDirectory?: string;
  // NOTE(krishan711): preloads the latin normal style file (closest to weight 400) of each family, defaults to true
  shouldPreloadFonts?: boolean;
}

interface IFontFormat {
  extension: string;
  mimeType: string;
  cssFormat: string;
  signatures: Buffer[];
}

interface IFontFace {
  descriptors: [string, string][];
  family: string;
  style: string;
  weight: string;
  subset: string | null;
  hasUnicodeRange: boolean;
  fontUrl: string;
}

interface IFont {
  content: Buffer;
  format: IFontFormat;
  hash: string;
}

interface IStylesheet {
  faces: IFontFace[];
  fonts: Map<string, IFont>;
  preloadFontUrls: Set<string>;
}

interface IEmittedFont {
  referenceId: string;
  mimeType: string;
  shouldPreload: boolean;
  fileName: string | null;
}

const STYLESHEET_HOST = 'fonts.googleapis.com';
const FONT_HOST = 'fonts.gstatic.com';
const STYLESHEET_PATHS = new Set(['/css', '/css2']);
// NOTE(krishan711): google serves woff2 files split into unicode-range subsets only to modern browsers
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const FETCH_TIMEOUT_MS = 20_000;
const MAX_STYLESHEET_SIZE = 512 * 1024;
const MAX_FONT_SIZE = 5 * 1024 * 1024;
const FONT_FORMATS: IFontFormat[] = [
  { extension: 'woff2', mimeType: 'font/woff2', cssFormat: 'woff2', signatures: [Buffer.from('wOF2')] },
  { extension: 'woff', mimeType: 'font/woff', cssFormat: 'woff', signatures: [Buffer.from('wOFF')] },
  { extension: 'ttf', mimeType: 'font/ttf', cssFormat: 'truetype', signatures: [Buffer.from([0x00, 0x01, 0x00, 0x00]), Buffer.from('true')] },
];
const FONT_EXTENSIONS = new Set(FONT_FORMATS.map((format) => format.extension));
const FONT_CONTENT_TYPES = new Set(['font/woff2', 'font/woff', 'font/ttf', 'font/sfnt', 'application/font-woff', 'application/font-woff2', 'application/x-font-ttf', 'application/font-sfnt']);
// NOTE(krishan711): only these descriptors are copied from google's css, so nothing else from it ends up in the app
const FONT_FACE_DESCRIPTORS = new Set(['font-family', 'font-style', 'font-weight', 'font-stretch', 'font-display', 'unicode-range']);
const SAFE_DESCRIPTOR_VALUE_REGEX = /^[\w\s'"+\-,.?%]+$/;
const FONT_FACE_REGEX = /(?:\/\*\s*([\w-]+)\s*\*\/\s*)?@font-face\s*\{([^{}]*)\}/g;
const FONT_SOURCE_REGEX = /^url\(\s*['"]?(https:\/\/fonts\.gstatic\.com\/[\w\-./]+)['"]?\s*\)/;
const CSS_IMPORT_REGEX = /@import\s+(?:url\(\s*(?:"([^"]*)"|'([^']*)'|([^"'()\s]+))\s*\)|"([^"]*)"|'([^']*)')\s*;/g;
const CSS_FILE_REGEX = /\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
const LINK_TAG_REGEX = /<link\b[^>]*>/gi;
const PLACEHOLDER_REGEX = /__KIBA_FONT_([a-f0-9]{16})__/g;

const hashContent = (content: string | Buffer): string => {
  return crypto.createHash('sha256').update(content).digest('hex');
};

const getStylesheetUrl = (value: string): string | null => {
  let url: URL;
  try {
    url = new URL(value.startsWith('//') ? `https:${value}` : value);
  } catch {
    return null;
  }
  if ((url.protocol !== 'https:' && url.protocol !== 'http:') || url.hostname !== STYLESHEET_HOST || url.port || url.username || url.password || !STYLESHEET_PATHS.has(url.pathname)) {
    return null;
  }
  url.protocol = 'https:';
  return url.href;
};

const getContentType = (headers: Headers): string => {
  return (headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
};

const fetchContent = async (url: string, allowedHost: string, maxSize: number): Promise<{ content: Buffer; contentType: string }> => {
  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== allowedHost) {
    throw new Error(`only https://${allowedHost} is allowed, not ${url}`);
  }
  // NOTE(krishan711): redirects are refused so nothing is fetched from any other host
  const response = await fetch(parsedUrl, { headers: { 'User-Agent': USER_AGENT }, redirect: 'error', signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok || !response.body) {
    throw new Error(`${url} responded with ${response.status}`);
  }
  if (Number(response.headers.get('content-length') ?? 0) > maxSize) {
    await response.body.cancel();
    throw new Error(`${url} is larger than ${maxSize} bytes`);
  }
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    size += value.byteLength;
    if (size > maxSize) {
      // eslint-disable-next-line no-await-in-loop
      await reader.cancel();
      throw new Error(`${url} is larger than ${maxSize} bytes`);
    }
    chunks.push(value);
  }
  return { content: Buffer.concat(chunks), contentType: getContentType(response.headers) };
};

const getFontFormat = (content: Buffer): IFontFormat | null => {
  if (content.length > MAX_FONT_SIZE) {
    return null;
  }
  return FONT_FORMATS.find((format) => format.signatures.some((signature) => content.subarray(0, signature.length).equals(signature))) ?? null;
};

// NOTE(krishan711): google's css only has (commented) @font-face rules, anything else means it isn't what was expected
const parseStylesheet = (css: string): IFontFace[] => {
  const faces = [...css.matchAll(FONT_FACE_REGEX)].map((match): IFontFace => {
    const descriptors: [string, string][] = [];
    let fontUrl: string | null = null;
    match[2].split(';').map((declaration) => declaration.trim()).filter((declaration) => declaration.length > 0).forEach((declaration) => {
      const separatorIndex = declaration.indexOf(':');
      if (separatorIndex < 0) {
        throw new Error(`unexpected declaration in @font-face: ${declaration}`);
      }
      const name = declaration.slice(0, separatorIndex).trim().toLowerCase();
      const value = declaration.slice(separatorIndex + 1).trim();
      if (name === 'src') {
        fontUrl = value.match(FONT_SOURCE_REGEX)?.[1] ?? null;
        if (!fontUrl) {
          throw new Error(`unexpected @font-face src: ${value}`);
        }
      } else if (FONT_FACE_DESCRIPTORS.has(name)) {
        if (!SAFE_DESCRIPTOR_VALUE_REGEX.test(value)) {
          throw new Error(`unexpected @font-face ${name}: ${value}`);
        }
        descriptors.push([name, value]);
      }
    });
    const getDescriptor = (name: string): string | undefined => descriptors.find(([descriptorName]) => descriptorName === name)?.[1];
    const family = getDescriptor('font-family')?.replace(/['"]/g, '').trim();
    if (!family || !fontUrl) {
      throw new Error('@font-face without a font-family or src');
    }
    return {
      descriptors,
      family,
      style: getDescriptor('font-style') ?? 'normal',
      weight: getDescriptor('font-weight') ?? '400',
      subset: match[1] ?? null,
      hasUnicodeRange: getDescriptor('unicode-range') !== undefined,
      fontUrl,
    };
  });
  if (faces.length === 0 || css.replace(FONT_FACE_REGEX, '').replace(/\/\*[\s\S]*?\*\//g, '').trim().length > 0) {
    throw new Error('the stylesheet has something other than @font-face rules');
  }
  return faces;
};

const getWeightDistance = (weight: string): number => {
  const weights = weight.split(/\s+/).map((value) => (value === 'bold' ? 700 : Number(value) || 400));
  const minimumWeight = Math.min(...weights);
  const maximumWeight = Math.max(...weights);
  return Math.max(minimumWeight - 400, 400 - maximumWeight, 0);
};

// NOTE(krishan711): preloading too much slows the page down, so only the file most text needs is preloaded for each family
const getPreloadFontUrls = (faces: IFontFace[]): Set<string> => {
  const familyFaces = new Map<string, IFontFace>();
  faces.filter((face) => face.style === 'normal' && (face.subset === 'latin' || !face.hasUnicodeRange)).forEach((face) => {
    const currentFace = familyFaces.get(face.family);
    if (!currentFace || getWeightDistance(face.weight) < getWeightDistance(currentFace.weight)) {
      familyFaces.set(face.family, face);
    }
  });
  return new Set([...familyFaces.values()].map((face) => face.fontUrl));
};

const getFontAssetName = (face: IFontFace, format: IFontFormat): string => {
  const name = [face.family, face.weight, face.style, face.subset ?? ''].join('-').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${name}.${format.extension}`;
};

const readCacheFile = (filePath: string): Buffer | null => {
  try {
    return fs.readFileSync(filePath);
  } catch {
    return null;
  }
};

const writeCacheFile = (filePath: string, content: Buffer): void => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const temporaryFilePath = `${filePath}.${process.pid}.tmp`;
    fs.writeFileSync(temporaryFilePath, content);
    fs.renameSync(temporaryFilePath, filePath);
  } catch {
    // NOTE(krishan711): the cache only saves downloads, so failing to write it is fine
  }
};

export const kibaFontsPlugin = (options: IKibaFontsPluginOptions = {}): Plugin => {
  const shouldPreloadFonts = options.shouldPreloadFonts ?? true;
  let rootDirectory = process.cwd();
  let cacheDirectory = path.join(rootDirectory, 'node_modules', '.cache', 'kiba-fonts');
  let base = '/';
  let logger: Logger | null = null;
  let stylesheetPromises = new Map<string, Promise<IStylesheet | null>>();
  const emittedFonts = new Map<string, IEmittedFont>();

  const loadFont = async (fontUrl: string): Promise<IFont> => {
    const extension = path.posix.extname(new URL(fontUrl).pathname).slice(1);
    const cacheFilePath = path.join(cacheDirectory, `${hashContent(fontUrl).slice(0, 32)}.${FONT_EXTENSIONS.has(extension) ? extension : 'font'}`);
    let content = readCacheFile(cacheFilePath);
    let format = content ? getFontFormat(content) : null;
    if (!content || !format) {
      const response = await fetchContent(fontUrl, FONT_HOST, MAX_FONT_SIZE);
      if (!FONT_CONTENT_TYPES.has(response.contentType) && !FONT_EXTENSIONS.has(extension)) {
        throw new Error(`${fontUrl} is not a font (${response.contentType})`);
      }
      content = response.content;
      format = getFontFormat(content);
      if (!format) {
        throw new Error(`${fontUrl} is not a woff2, woff or ttf file`);
      }
      writeCacheFile(cacheFilePath, content);
    }
    return { content, format, hash: hashContent(content) };
  };

  const loadStylesheet = async (url: string): Promise<IStylesheet> => {
    const cacheFilePath = path.join(cacheDirectory, `${hashContent(`${USER_AGENT}\n${url}`).slice(0, 32)}.css`);
    const cachedContent = readCacheFile(cacheFilePath);
    let faces: IFontFace[] | null = null;
    if (cachedContent) {
      try {
        faces = parseStylesheet(cachedContent.toString('utf-8'));
      } catch {
        faces = null;
      }
    }
    if (!faces) {
      const response = await fetchContent(url, STYLESHEET_HOST, MAX_STYLESHEET_SIZE);
      if (response.contentType !== 'text/css') {
        throw new Error(`${url} is not css (${response.contentType})`);
      }
      faces = parseStylesheet(response.content.toString('utf-8'));
      writeCacheFile(cacheFilePath, response.content);
    }
    const fontUrls = [...new Set(faces.map((face) => face.fontUrl))];
    const fonts = await Promise.all(fontUrls.map((fontUrl) => loadFont(fontUrl)));
    return { faces, fonts: new Map(fontUrls.map((fontUrl, index) => [fontUrl, fonts[index]])), preloadFontUrls: getPreloadFontUrls(faces) };
  };

  // NOTE(krishan711): a failed download leaves the @import as it is (so the browser loads it from google) and is warned about once
  const getStylesheet = (url: string): Promise<IStylesheet | null> => {
    let stylesheetPromise = stylesheetPromises.get(url);
    if (!stylesheetPromise) {
      stylesheetPromise = loadStylesheet(url).catch((error: unknown): null => {
        // NOTE(krishan711): fetch's own errors only say "fetch failed" with the reason in the cause
        const reason = error instanceof Error ? [error.message, 'cause' in error && error.cause instanceof Error ? error.cause.message : null].filter(Boolean).join(': ') : String(error);
        logger?.warn(`[kiba-fonts] Leaving ${url} to be loaded from Google at runtime because downloading it failed: ${reason}`);
        return null;
      });
      stylesheetPromises.set(url, stylesheetPromise);
    }
    return stylesheetPromise;
  };

  const getFontUrl = (hostFileName: string, fontFileName: string): string => {
    if (base === './' || base === '') {
      const relativePath = path.posix.relative(path.posix.dirname(hostFileName), fontFileName);
      return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
    }
    return `${base}${fontFileName}`;
  };

  const replacePlaceholders = (content: string, hostFileName: string): string => {
    return content.replace(PLACEHOLDER_REGEX, (placeholder: string, key: string): string => {
      const fileName = emittedFonts.get(key)?.fileName;
      return fileName ? getFontUrl(hostFileName, fileName) : placeholder;
    });
  };

  const getUsedFontKeys = (content: string): string[] => {
    return [...content.matchAll(PLACEHOLDER_REGEX)].map((match) => match[1]);
  };

  const hasStylesheetUrl = (content: string): boolean => {
    return [...content.matchAll(CSS_IMPORT_REGEX)].some((match) => getStylesheetUrl(match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? '') !== null);
  };

  return {
    name: 'kiba-fonts',
    // NOTE(krishan711): in dev the @import is left as it is, so the browser loads the fonts from google
    apply: 'build',
    configResolved(config: ResolvedConfig): void {
      rootDirectory = config.root;
      cacheDirectory = options.cacheDirectory ? path.resolve(config.root, options.cacheDirectory) : path.join(config.root, 'node_modules', '.cache', 'kiba-fonts');
      base = config.base;
      logger = config.logger;
    },
    buildStart(): void {
      stylesheetPromises = new Map();
      emittedFonts.clear();
    },
    // NOTE(krishan711): runs after vite:css, so the code is css even for sass files (sass leaves @import url(...) as a plain css @import)
    async transform(code: string, id: string) {
      if (this.environment?.config.consumer === 'server' || !code.includes(STYLESHEET_HOST)) {
        return null;
      }
      // NOTE(krishan711): the html's inline styles have ids like index.html?html-proxy&inline-css&index=0.css, so those are css
      if (id.endsWith('.html')) {
        // NOTE(krishan711): stylesheet links become inline @imports, which vite then passes through the css transform below
        const links = [...code.matchAll(LINK_TAG_REGEX)].map((match) => {
          const getAttribute = (name: string): string | null => {
            const attributeMatch = match[0].match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i'));
            return attributeMatch ? (attributeMatch[1] ?? attributeMatch[2] ?? attributeMatch[3]) : null;
          };
          const isStylesheet = (getAttribute('rel') ?? '').toLowerCase().split(/\s+/).includes('stylesheet') && getAttribute('media') === null;
          return { tag: match[0], url: isStylesheet ? getStylesheetUrl((getAttribute('href') ?? '').replace(/&amp;/g, '&')) : null };
        }).filter((link): link is { tag: string; url: string } => link.url !== null);
        const stylesheets = await Promise.all(links.map((link) => getStylesheet(link.url)));
        let html = code;
        links.forEach((link, index) => {
          if (stylesheets[index]) {
            html = html.replace(link.tag, (): string => `<style>@import url("${link.url}");</style>`);
          }
        });
        return html === code ? null : { code: html, map: null };
      }
      // NOTE(krishan711): ?inline css ends up in js strings where the placeholders can't be replaced
      if (!CSS_FILE_REGEX.test(id) || (!/[?&]html-proxy\b/.test(id) && /[?&](?:inline|raw)\b/.test(id)) || /[?&]style-attr\b/.test(id)) {
        return null;
      }
      const imports = [...code.matchAll(CSS_IMPORT_REGEX)].map((match) => ({ statement: match[0], url: getStylesheetUrl(match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? '') }));
      const stylesheetUrls = [...new Set(imports.map((cssImport) => cssImport.url).filter((url): url is string => url !== null))];
      if (stylesheetUrls.length === 0) {
        return null;
      }
      const stylesheets = await Promise.all(stylesheetUrls.map((url) => getStylesheet(url)));
      const stylesheetCss = new Map<string, string>();
      stylesheetUrls.forEach((url, index) => {
        const stylesheet = stylesheets[index];
        if (!stylesheet) {
          return;
        }
        const fontFaces = stylesheet.faces.map((face) => {
          const font = stylesheet.fonts.get(face.fontUrl);
          if (!font) {
            return '';
          }
          const key = font.hash.slice(0, 16);
          if (!emittedFonts.has(key)) {
            const referenceId = this.emitFile({ type: 'asset', name: getFontAssetName(face, font.format), source: font.content });
            emittedFonts.set(key, { referenceId, mimeType: font.format.mimeType, shouldPreload: false, fileName: null });
          }
          const emittedFont = emittedFonts.get(key);
          if (emittedFont && stylesheet.preloadFontUrls.has(face.fontUrl)) {
            emittedFont.shouldPreload = true;
          }
          // NOTE(krishan711): the placeholder has the font's hash, so the css file's hash changes when the font does
          const declarations = [...face.descriptors.map(([name, value]) => `${name}: ${value};`), `src: url(__KIBA_FONT_${key}__) format('${font.format.cssFormat}');`];
          return `@font-face {\n  ${declarations.join('\n  ')}\n}\n`;
        });
        stylesheetCss.set(url, fontFaces.join(''));
      });
      // NOTE(krishan711): @font-face rules can go anywhere, so they replace the @import where it was
      let css = code;
      imports.forEach((cssImport) => {
        const fontFaceCss = cssImport.url ? stylesheetCss.get(cssImport.url) : undefined;
        if (fontFaceCss !== undefined) {
          css = css.replace(cssImport.statement, (): string => fontFaceCss);
        }
      });
      return css === code ? null : { code: css, map: null };
    },
    // NOTE(krishan711): the file names are needed in transformIndexHtml, which runs (in vite:build-html's generateBundle) before this plugin's generateBundle
    renderChunk(): null {
      emittedFonts.forEach((emittedFont) => {
        if (!emittedFont.fileName) {
          // eslint-disable-next-line no-param-reassign
          emittedFont.fileName = this.getFileName(emittedFont.referenceId);
        }
      });
      return null;
    },
    // NOTE(krishan711): post so the css vite emits in its own generateBundle (when cssCodeSplit is off) is included
    generateBundle: {
      order: 'post',
      handler(_, bundle): void {
        Object.values(bundle).forEach((output) => {
          if (output.type !== 'asset' || !(output.fileName.endsWith('.css') || output.fileName.endsWith('.html'))) {
            return;
          }
          const source = typeof output.source === 'string' ? output.source : Buffer.from(output.source).toString('utf-8');
          if (source.includes('__KIBA_FONT_')) {
            // eslint-disable-next-line no-param-reassign
            output.source = replacePlaceholders(source, output.fileName);
          }
        });
      },
    },
    transformIndexHtml: {
      order: 'post',
      handler(html: string, context: IndexHtmlTransformContext): IndexHtmlTransformResult | undefined {
        if (!context.bundle) {
          return undefined;
        }
        const htmlFileName = path.relative(rootDirectory, context.filename).split(path.sep).join('/');
        const linkedCss = Object.values(context.bundle).map((output): string => {
          if (output.type !== 'asset' || !output.fileName.endsWith('.css') || !html.includes(output.fileName)) {
            return '';
          }
          return typeof output.source === 'string' ? output.source : Buffer.from(output.source).toString('utf-8');
        }).join('\n');
        const tags: HtmlTagDescriptor[] = [];
        if (shouldPreloadFonts) {
          const usedFontKeys = new Set([...getUsedFontKeys(html), ...getUsedFontKeys(linkedCss)]);
          usedFontKeys.forEach((key) => {
            const emittedFont = emittedFonts.get(key);
            if (emittedFont?.shouldPreload && emittedFont.fileName) {
              tags.push({ tag: 'link', attrs: { rel: 'preload', href: getFontUrl(htmlFileName, emittedFont.fileName), as: 'font', type: emittedFont.mimeType, crossorigin: true }, injectTo: 'head' });
            }
          });
        }
        let newHtml = replacePlaceholders(html, htmlFileName);
        // NOTE(krishan711): connecting to google early is pointless once nothing loads from it
        if (!hasStylesheetUrl(newHtml) && !hasStylesheetUrl(linkedCss)) {
          newHtml = newHtml.replace(LINK_TAG_REGEX, (tag: string): string => {
            return /\srel\s*=\s*["']?(?:preconnect|dns-prefetch)\b/i.test(tag) && /\shref\s*=\s*["']?https:\/\/fonts\.(?:googleapis|gstatic)\.com\/?["'\s>]/i.test(tag) ? '' : tag;
          });
        }
        return { html: newHtml, tags };
      },
    },
  };
};
