// NOTE(krishan711): this runs in node (inside vite), so it must only import node builtins and never the browser code
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { HmrContext, Logger, Plugin, ResolvedConfig, ViteDevServer } from 'vite';

export interface IKibaIconsPluginOptions {
  // NOTE(krishan711): directories (relative to the vite root) scanned for icon ids, defaults to src (or the root if there is no src)
  sourceDirectories?: string[];
  // NOTE(krishan711): the module that exports registerKibaIcons, only needs changing when building ui-react itself
  registrationModule?: string;
}

interface IIconSet {
  prefix: string;
  packageName: string;
  iconsDirectory: string;
  getIconFilePaths: (iconsDirectoryPath: string, iconName: string) => string[];
}

const VIRTUAL_MODULE_ID = 'virtual:kiba-icons';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;
const ICON_ID_REGEX = /(?<=['"`])(ion|mui|bs|feather|remix)-([a-z0-9]+(?:-[a-z0-9]+)*)(?=['"`])/g;
const SOURCE_FILE_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.mdx']);
const IGNORED_DIRECTORY_NAMES = new Set(['node_modules', 'dist', 'build', 'tmp']);
const MATERIAL_ICON_STYLES = ['outlined', 'round', 'sharp', 'two-tone'];

const remixIconFilePaths = new Map<string, Map<string, string>>();

const getRemixIconFilePaths = (iconsDirectoryPath: string): Map<string, string> => {
  let iconFilePaths = remixIconFilePaths.get(iconsDirectoryPath);
  if (!iconFilePaths) {
    iconFilePaths = new Map<string, string>();
    // NOTE(krishan711): remixicon puts icons in category directories, e.g. icons/Buildings/home-line.svg
    fs.readdirSync(iconsDirectoryPath, { withFileTypes: true }).filter((entry) => entry.isDirectory()).forEach((categoryEntry) => {
      fs.readdirSync(path.join(iconsDirectoryPath, categoryEntry.name)).filter((fileName) => fileName.endsWith('.svg')).forEach((fileName) => {
        iconFilePaths?.set(fileName.slice(0, -'.svg'.length), path.join(iconsDirectoryPath, categoryEntry.name, fileName));
      });
    });
    remixIconFilePaths.set(iconsDirectoryPath, iconFilePaths);
  }
  return iconFilePaths;
};

const ICON_SETS: IIconSet[] = [{
  prefix: 'ion',
  packageName: 'ionicons',
  // NOTE(krishan711): the svg files are used (not the ionicons/icons data uris) because those style outlines with classes from ion-icon's css
  iconsDirectory: 'dist/svg',
  getIconFilePaths: (iconsDirectoryPath, iconName) => [path.join(iconsDirectoryPath, `${iconName}.svg`)],
}, {
  prefix: 'mui',
  packageName: '@material-design-icons/svg',
  iconsDirectory: '.',
  // NOTE(krishan711): mui-account-box is filled/account_box.svg and mui-account-box-outlined is outlined/account_box.svg
  getIconFilePaths: (iconsDirectoryPath, iconName) => {
    const filePaths = [path.join(iconsDirectoryPath, 'filled', `${iconName.replace(/-/g, '_')}.svg`)];
    MATERIAL_ICON_STYLES.filter((style) => iconName.endsWith(`-${style}`)).forEach((style) => {
      filePaths.push(path.join(iconsDirectoryPath, style, `${iconName.slice(0, -(style.length + 1)).replace(/-/g, '_')}.svg`));
    });
    return filePaths;
  },
}, {
  prefix: 'bs',
  packageName: 'bootstrap-icons',
  iconsDirectory: 'icons',
  getIconFilePaths: (iconsDirectoryPath, iconName) => [path.join(iconsDirectoryPath, `${iconName}.svg`)],
}, {
  prefix: 'feather',
  packageName: 'feather-icons',
  iconsDirectory: 'dist/icons',
  getIconFilePaths: (iconsDirectoryPath, iconName) => [path.join(iconsDirectoryPath, `${iconName}.svg`)],
}, {
  prefix: 'remix',
  packageName: 'remixicon',
  iconsDirectory: 'icons',
  getIconFilePaths: (iconsDirectoryPath, iconName) => {
    const filePath = getRemixIconFilePaths(iconsDirectoryPath).get(iconName);
    return filePath ? [filePath] : [];
  },
}];

const ICON_SETS_BY_PREFIX = new Map(ICON_SETS.map((iconSet) => [iconSet.prefix, iconSet]));

// NOTE(krishan711): the same normalisation KibaIcon does to fetched icons, plus removing whitespace between tags
const normalizeSvgContent = (svgContent: string): string => {
  return svgContent
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title>.*<\/title>/gi, '')
    .replace(/stroke:#000/gi, 'stroke:currentColor')
    .replace(/fill:#000/gi, 'fill:currentColor')
    .replace(/>\s+</g, '><')
    .trim();
};

const findIconIds = (content: string): string[] => {
  return [...new Set([...content.matchAll(ICON_ID_REGEX)].map((match) => match[0]))];
};

const findPackageDirectory = (rootDirectory: string, packageName: string): string | null => {
  let directory = path.resolve(rootDirectory);

  while (true) {
    const packageDirectory = path.join(directory, 'node_modules', ...packageName.split('/'));
    if (fs.existsSync(path.join(packageDirectory, 'package.json'))) {
      return packageDirectory;
    }
    const parentDirectory = path.dirname(directory);
    if (parentDirectory === directory) {
      return null;
    }
    directory = parentDirectory;
  }
};

const listSourceFiles = (directory: string, fileExtensions: Set<string>, ignoredDirectories: Set<string>): string[] => {
  if (!fs.existsSync(directory) || ignoredDirectories.has(directory)) {
    return [];
  }
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry): string[] => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || IGNORED_DIRECTORY_NAMES.has(entry.name)) {
        return [];
      }
      return listSourceFiles(entryPath, fileExtensions, ignoredDirectories);
    }
    return entry.isFile() && fileExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
  });
};

// NOTE(krishan711): ui-react's own components use KibaIcon too, so its built files are scanned along with the app's source
const getUiReactDirectories = (): { libraryDirectory: string | null; pluginDirectory: string | null } => {
  try {
    const pluginDirectory = path.dirname(fileURLToPath(import.meta.url));
    let directory = pluginDirectory;
    while (path.dirname(directory) !== directory) {
      const packageFilePath = path.join(directory, 'package.json');
      if (fs.existsSync(packageFilePath)) {
        const packageData = JSON.parse(fs.readFileSync(packageFilePath, 'utf-8'));
        return { libraryDirectory: packageData.name === '@kibalabs/ui-react' ? path.join(directory, 'dist') : null, pluginDirectory };
      }
      directory = path.dirname(directory);
    }
    return { libraryDirectory: null, pluginDirectory };
  } catch {
    return { libraryDirectory: null, pluginDirectory: null };
  }
};

export const kibaIconsPlugin = (options: IKibaIconsPluginOptions = {}): Plugin => {
  const registrationModule = options.registrationModule ?? '@kibalabs/ui-react';
  let rootDirectory = process.cwd();
  let logger: Logger | null = null;
  let sourceDirectories: string[] = [];
  let libraryDirectory: string | null = null;
  let pluginDirectory: string | null = null;
  const fileIconIds = new Map<string, string[]>();
  const iconSvgContents = new Map<string, string | null>();
  const packageDirectories = new Map<string, string | null>();
  const warnedIconIds = new Set<string>();
  const entryModuleIds = new Set<string>();

  const isSourceFile = (filePath: string): boolean => {
    return SOURCE_FILE_EXTENSIONS.has(path.extname(filePath)) && sourceDirectories.some((directory) => filePath.startsWith(`${directory}${path.sep}`)) && !filePath.split(path.sep).includes('node_modules');
  };

  const scanFile = (filePath: string, content?: string): boolean => {
    let fileContent = content;
    if (fileContent === undefined) {
      try {
        fileContent = fs.readFileSync(filePath, 'utf-8');
      } catch {
        fileContent = '';
      }
    }
    const previousIconIds = fileIconIds.get(filePath) ?? [];
    const iconIds = findIconIds(fileContent);
    fileIconIds.set(filePath, iconIds);
    return iconIds.length !== previousIconIds.length || iconIds.some((iconId) => !previousIconIds.includes(iconId));
  };

  const scanAllFiles = (): void => {
    fileIconIds.clear();
    const ignoredDirectories = new Set(pluginDirectory ? [pluginDirectory] : []);
    sourceDirectories.forEach((directory) => {
      listSourceFiles(directory, SOURCE_FILE_EXTENSIONS, ignoredDirectories).forEach((filePath) => scanFile(filePath));
    });
    if (libraryDirectory) {
      listSourceFiles(libraryDirectory, new Set(['.js']), ignoredDirectories).forEach((filePath) => scanFile(filePath));
    }
  };

  const getPackageDirectory = (packageName: string): string | null => {
    if (!packageDirectories.has(packageName)) {
      packageDirectories.set(packageName, findPackageDirectory(rootDirectory, packageName));
    }
    return packageDirectories.get(packageName) ?? null;
  };

  const loadIconSvgContent = (iconId: string): string | null => {
    if (!iconSvgContents.has(iconId)) {
      const separatorIndex = iconId.indexOf('-');
      const iconSet = ICON_SETS_BY_PREFIX.get(iconId.slice(0, separatorIndex));
      const packageDirectory = iconSet ? getPackageDirectory(iconSet.packageName) : null;
      let svgContent: string | null = null;
      if (iconSet && packageDirectory) {
        const iconsDirectoryPath = path.join(packageDirectory, iconSet.iconsDirectory);
        const iconFilePath = fs.existsSync(iconsDirectoryPath) ? iconSet.getIconFilePaths(iconsDirectoryPath, iconId.slice(separatorIndex + 1)).find((filePath) => fs.existsSync(filePath)) : undefined;
        svgContent = iconFilePath ? normalizeSvgContent(fs.readFileSync(iconFilePath, 'utf-8')) : null;
      }
      iconSvgContents.set(iconId, svgContent);
    }
    return iconSvgContents.get(iconId) ?? null;
  };

  const getIcons = (): Record<string, string> => {
    const iconIds = [...new Set([...fileIconIds.values()].flat())].sort();
    const missingIconIds = new Map<IIconSet, string[]>();
    const icons: Record<string, string> = {};
    iconIds.forEach((iconId) => {
      const iconSet = ICON_SETS_BY_PREFIX.get(iconId.slice(0, iconId.indexOf('-')));
      if (!iconSet) {
        return;
      }
      const packageDirectory = getPackageDirectory(iconSet.packageName);
      if (!packageDirectory || !fs.existsSync(path.join(packageDirectory, iconSet.iconsDirectory))) {
        if (!warnedIconIds.has(iconId)) {
          missingIconIds.set(iconSet, [...(missingIconIds.get(iconSet) ?? []), iconId]);
          warnedIconIds.add(iconId);
        }
        return;
      }
      const svgContent = loadIconSvgContent(iconId);
      // NOTE(krishan711): strings that look like icon ids but aren't icons are skipped
      if (svgContent) {
        icons[iconId] = svgContent;
      }
    });
    if (missingIconIds.size > 0) {
      const missingDescriptions = [...missingIconIds.entries()].map(([iconSet, setIconIds]) => {
        const reason = getPackageDirectory(iconSet.packageName) ? `the installed version has no ${iconSet.iconsDirectory} directory` : 'not installed';
        return `${iconSet.packageName} (${reason}): ${setIconIds.join(', ')}`;
      });
      logger?.warn(`[kiba-icons] KibaIcon will fetch these icons at runtime because their icon package is missing:\n  ${missingDescriptions.join('\n  ')}`);
    }
    return icons;
  };

  // NOTE(krishan711): returns whether the file uses icons that weren't registered yet
  const rescanFile = (filePath: string, content?: string): boolean => {
    const previousIconIds = new Set(Object.keys(getIcons()));
    if (!scanFile(filePath, content)) {
      return false;
    }
    return Object.keys(getIcons()).some((iconId) => !previousIconIds.has(iconId));
  };

  // NOTE(krishan711): reloads the page so new icons are registered before anything renders them
  const reloadWithNewIcons = (server: ViteDevServer): void => {
    const virtualModule = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
    if (virtualModule) {
      server.moduleGraph.invalidateModule(virtualModule);
    }
    server.ws.send({ type: 'full-reload' });
  };

  return {
    name: 'kiba-icons',
    enforce: 'pre',
    configResolved(config: ResolvedConfig): void {
      rootDirectory = config.root;
      logger = config.logger;
      const directories = options.sourceDirectories ?? (fs.existsSync(path.join(config.root, 'src')) ? ['src'] : ['.']);
      sourceDirectories = directories.map((directory) => path.resolve(config.root, directory));
      ({ libraryDirectory, pluginDirectory } = getUiReactDirectories());
    },
    buildStart(): void {
      iconSvgContents.clear();
      packageDirectories.clear();
      warnedIconIds.clear();
      scanAllFiles();
      // NOTE(krishan711): called here so missing packages are warned about once at the start
      getIcons();
    },
    async resolveId(source, importer, resolveOptions) {
      if (source === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
      // NOTE(krishan711): non-html entries (e.g. the server entry of an ssr build) import the icons directly
      if (resolveOptions.isEntry && !source.endsWith('.html')) {
        const resolved = await this.resolve(source, importer, { ...resolveOptions, skipSelf: true });
        if (resolved && !resolved.external && !resolved.id.endsWith('.html')) {
          entryModuleIds.add(resolved.id);
        }
        return resolved;
      }
      return null;
    },
    load(id: string): string | null {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
        return null;
      }
      return `import { registerKibaIcons } from ${JSON.stringify(registrationModule)};\nregisterKibaIcons(${JSON.stringify(getIcons())});\n`;
    },
    transform(code: string, id: string): { code: string; map: null } | null {
      if (!entryModuleIds.has(id)) {
        return null;
      }
      return { code: `import ${JSON.stringify(VIRTUAL_MODULE_ID)};\n${code}`, map: null };
    },
    // NOTE(krishan711): pre so the build bundles the script (and it runs before the app's entry script)
    transformIndexHtml: {
      order: 'pre',
      handler: () => [{
        tag: 'script',
        attrs: { type: 'module' },
        children: `import ${JSON.stringify(VIRTUAL_MODULE_ID)};`,
        injectTo: 'head-prepend',
      }],
    },
    configureServer(server: ViteDevServer): void {
      server.watcher.on('add', (filePath: string): void => {
        if (isSourceFile(filePath) && rescanFile(filePath)) {
          reloadWithNewIcons(server);
        }
      });
      server.watcher.on('unlink', (filePath: string): void => {
        fileIconIds.delete(filePath);
      });
    },
    async handleHotUpdate(context: HmrContext) {
      if (!isSourceFile(context.file) || !rescanFile(context.file, await context.read())) {
        return undefined;
      }
      reloadWithNewIcons(context.server);
      return [];
    },
  };
};
