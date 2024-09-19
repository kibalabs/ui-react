import { createGlobalStyle } from 'styled-components';

import { IBulletListTheme, IBulletTextTheme, ILinkTheme } from '../atoms';
import { ITheme } from '../theming';
import { ThemeMap, themeToCss } from '../util';

interface IGlobalCssProps {
  theme: ITheme;
  resetCss: string;
  extraCss?: string;
  isFullPageApp?: boolean;
}

// NOTE(krishan711): global styles should come before all other styles but there is a problem with this:
// https://github.com/styled-components/styled-components/issues/3146
export const GlobalCss = createGlobalStyle<IGlobalCssProps>`
  ${(props: IGlobalCssProps): string => props.resetCss};

  html {
    scroll-behavior: smooth;
    image-rendering: pixelated;
    image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }

  body {
    background-color: ${(props: IGlobalCssProps): string => props.theme.colors.background};
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.default)};
    overflow: auto;
    text-align: left;
  }

  ${(props: IGlobalCssProps): string => (props.isFullPageApp ? `
    html, body {
      width: 100%;
      height: 100%;
      overscroll-behavior: none;
    }

    // NOTE(krishan711): for ios only disable all body scrolling
    // NOTE(krishan711): disabled cos it wasnt working on safari, not sure what the answer is here
    // _::-webkit-full-page-media, _:future, :root body {
    //   overflow: hidden;
    // }

    #root {
      width: 100%;
      height: 100%;
    }
  ` : '')};

  /* NOTE(krishan711): the :not(.button) needs to be specified as Buttons can act as links and these styles will be used on hover */
  /* since this ":hover" is more specific (when hovering) than the generic styles for the default button (with no modifier) */
  a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink) {
    ${(props: IGlobalCssProps): string => themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.normal.default.text)};
    :hover {
      ${(props: IGlobalCssProps): string => themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.normal.hover.text)};
    }
    :visited {
      ${(props: IGlobalCssProps): string => themeToCss((props.theme.links as ThemeMap<ILinkTheme>).default.visited?.default?.text)};
    }
  }

  p {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.paragraph)};
  }
  b {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.bold)};
  }
  strong {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.strong)};
  }
  i {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.italic)};
  }
  em {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.emphasis)};
  }
  mark {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.mark)};
  }
  small {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.small)};
  }
  del {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.deleted)};
  }
  ins {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.inserted)};
  }
  sub {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.subscript)};
  }
  sup {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.superscript)};
  }

  h1 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header1)};
  }
  h2 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header2)};
  }
  h3 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header3)};
  }
  h4 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header4)};
  }
  h5 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header5)};
  }
  h6 {
    ${(props: IGlobalCssProps): string => themeToCss(props.theme.texts.header6)};
  }

  ul {
    ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletLists as ThemeMap<IBulletListTheme>).default.normal.default.bulletList)};
    list-style-position: outside;
    text-indent: -0.1em;
    display: table;
    li {
      ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).default.normal.default.text)};
      display: table;
      &:before {
        display: table-cell;
        padding-right: 1em;
        ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).default.normal.default.bullet)};
      }
    }
  }


  ol {
    ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletLists as ThemeMap<IBulletListTheme>).default.normal.default.bulletList)};
    list-style-position: outside;
    counter-reset: list-number;
    text-indent: -0.1em;
    display: table;

    li {
      ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).numbered?.normal?.default?.text)};
      counter-increment: list-number;
      display: table;
      &:before {
        display: table-cell;
        padding-right: 1em;
        ${(props: IGlobalCssProps): string => themeToCss((props.theme.bulletTexts as ThemeMap<IBulletTextTheme>).numbered?.normal?.default?.bullet)};
      }
    }
  }


  ${(props: IGlobalCssProps): string => props.extraCss || ''};
`;
