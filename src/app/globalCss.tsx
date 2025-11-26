import React from 'react';

import { IBulletListTheme, IBulletTextTheme, ILinkTheme } from '../atoms';
import { ITheme } from '../theming';
import { ThemeMap, themeToCss } from '../util';

interface IGlobalCssProps {
  theme: ITheme;
  extraCss?: string;
  isFullPageApp?: boolean;
}

export function GlobalCss(props: IGlobalCssProps): React.ReactElement {
  const cssString = React.useMemo((): string => {
    const fullPageCss = props.isFullPageApp ? `
      html, body {
        width: 100%;
        height: 100%;
        overscroll-behavior: none;
      }
      #root {
        width: 100%;
        height: 100%;
      }
    ` : '';
    return `
      html {
        scroll-behavior: smooth;
        image-rendering: pixelated;
        image-rendering: -webkit-optimize-contrast;
        -ms-interpolation-mode: nearest-neighbor;
      }

      body {
        background-color: ${props.theme.colors.background};
        ${themeToCss(props.theme.texts.default)}
        overflow: auto;
        text-align: left;
      }

      ${fullPageCss}

      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink) {
        ${themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.normal.default.text)}
      }
      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink):hover {
        ${themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.normal.hover.text)}
      }
      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink):visited {
        ${themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.visited?.default?.text)}
      }

      p { ${themeToCss(props.theme.texts.paragraph)} }
      b { ${themeToCss(props.theme.texts.bold)} }
      strong { ${themeToCss(props.theme.texts.strong)} }
      i { ${themeToCss(props.theme.texts.italic)} }
      em { ${themeToCss(props.theme.texts.emphasis)} }
      mark { ${themeToCss(props.theme.texts.mark)} }
      small { ${themeToCss(props.theme.texts.small)} }
      del { ${themeToCss(props.theme.texts.deleted)} }
      ins { ${themeToCss(props.theme.texts.inserted)} }
      sub { ${themeToCss(props.theme.texts.subscript)} }
      sup { ${themeToCss(props.theme.texts.superscript)} }

      h1 { ${themeToCss(props.theme.texts.header1)} }
      h2 { ${themeToCss(props.theme.texts.header2)} }
      h3 { ${themeToCss(props.theme.texts.header3)} }
      h4 { ${themeToCss(props.theme.texts.header4)} }
      h5 { ${themeToCss(props.theme.texts.header5)} }
      h6 { ${themeToCss(props.theme.texts.header6)} }

      ul {
        ${themeToCss((props.theme.bulletLists as ThemeMap<IBulletListTheme>).default.normal.default.bulletList)}
        list-style-position: outside;
        text-indent: -0.1em;
        display: table;
      }
      ul li {
        ${themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).default.normal.default.text)}
        display: table;
      }
      ul li:before {
        display: table-cell;
        padding-right: 1em;
        ${themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).default.normal.default.bullet)}
      }

      ol {
        ${themeToCss((props.theme.bulletLists as ThemeMap<IBulletListTheme>).default.normal.default.bulletList)}
        list-style-position: outside;
        counter-reset: list-number;
        text-indent: -0.1em;
        display: table;
      }
      ol li {
        ${themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).numbered?.normal?.default?.text)}
        counter-increment: list-number;
        display: table;
      }
      ol li:before {
        display: table-cell;
        padding-right: 1em;
        ${themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).numbered?.normal?.default?.bullet)}
      }

      ${props.extraCss || ''}
    `;
  }, [props.theme, props.extraCss, props.isFullPageApp]);
  return (
    <style dangerouslySetInnerHTML={{ __html: cssString }} />
  );
}
