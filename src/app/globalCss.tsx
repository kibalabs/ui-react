import React from 'react';

import '../styles/global.scss';

interface IGlobalCssProps {
  isFullPageApp?: boolean;
}

export function GlobalCss(props: IGlobalCssProps): React.ReactElement | null {
  React.useEffect(() => {
    if (props.isFullPageApp) {
      document.documentElement.classList.add('kiba-full-page');
    }
    return () => {
      document.documentElement.classList.remove('kiba-full-page');
    };
  }, [props.isFullPageApp]);
  return null;
}
