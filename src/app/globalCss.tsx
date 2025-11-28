import React from 'react';

interface IGlobalCssProps {
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
        background-color: var(--color-background);
        font-family: var(--font-family-main, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif);
        font-size: 16px;
        font-weight: normal;
        color: var(--color-text);
        overflow: auto;
        text-align: left;
      }

      ${fullPageCss}

      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink) {
        color: var(--color-brand-primary);
        text-decoration: underline;
      }
      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink):hover {
        color: var(--color-brand-primary-dark10);
      }
      a:not(.KibaButton):not(.KibaLinkBase):not(.KibaIconButton):not(.KibaLink):visited {
        color: var(--color-brand-primary);
      }

      p { margin: 0; }
      b, strong { font-weight: bold; }
      i, em { font-style: italic; }
      mark { background-color: var(--color-warning-clear75); }
      small { font-size: 0.85em; }
      del { text-decoration: line-through; }
      ins { text-decoration: underline; }
      sub { vertical-align: sub; font-size: 0.75em; }
      sup { vertical-align: super; font-size: 0.75em; }

      h1 { font-size: 2.5em; font-weight: bold; margin: 0; }
      h2 { font-size: 2em; font-weight: bold; margin: 0; }
      h3 { font-size: 1.5em; font-weight: bold; margin: 0; }
      h4 { font-size: 1.25em; font-weight: bold; margin: 0; }
      h5 { font-size: 1em; font-weight: bold; margin: 0; }
      h6 { font-size: 0.85em; font-weight: bold; margin: 0; }

      ul {
        list-style-position: outside;
        text-indent: -0.1em;
        display: table;
      }
      ul li {
        display: table;
      }
      ul li:before {
        display: table-cell;
        padding-right: 1em;
        content: '•';
      }

      ol {
        list-style-position: outside;
        counter-reset: list-number;
        text-indent: -0.1em;
        display: table;
      }
      ol li {
        counter-increment: list-number;
        display: table;
      }
      ol li:before {
        display: table-cell;
        padding-right: 1em;
        content: counter(list-number) '.';
      }

      ${props.extraCss || ''}
    `;
  }, [props.extraCss, props.isFullPageApp]);
  return (
    // eslint-disable-next-line react/no-danger
    <style dangerouslySetInnerHTML={{ __html: cssString }} />
  );
}
