import React from 'react';

import { getClassName } from '@kibalabs/core';
import { getIsRunningOnBrowser, IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { BackgroundView, IBackgroundConfig } from '../wrappers';

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange.js';
import 'lazysizes/plugins/respimg/ls.respimg.js';

export interface IKibaAppProps extends IMultiAnyChildProps {
  isRehydrating?: boolean;
  isFullPageApp?: boolean;
  /** @deprecated Use SCSS imports instead */
  extraGlobalCss?: string;
  /** @deprecated Use SCSS imports instead */
  extraCss?: string;
  background?: IBackgroundConfig;
}

export function KibaApp(props: IKibaAppProps): React.ReactElement {
  const [isRunningOnBrowser, setIsRunningOnBrowser] = React.useState<boolean>(!props.isRehydrating);
  useInitialization((): void => {
    setIsRunningOnBrowser(getIsRunningOnBrowser());
    if (isRunningOnBrowser) {
      // @ts-ignore
      window.lazySizes.cfg = window.lazySizes.cfg || {};
      // @ts-ignore
      window.lazySizes.cfg.minSize = 20;
    }
  });
  const extraGlobalCssStyle = props.extraGlobalCss ? <style dangerouslySetInnerHTML={{ __html: props.extraGlobalCss }} /> : null;
  const extraCssStyle = props.extraCss ? <style dangerouslySetInnerHTML={{ __html: props.extraCss }} /> : null;
  const mainViewStyle: React.CSSProperties = {
    minHeight: props.isFullPageApp ? '100%' : '100vh',
    ...(props.isFullPageApp ? { height: '1px' } : {}),
  };
  return (
    <React.Fragment>
      <GlobalCss
        isFullPageApp={props.isFullPageApp}
      />
      {extraGlobalCssStyle}
      {extraCssStyle}
      <link href='https://assets-cdn.kiba.dev' rel='preconnect' crossOrigin='anonymous' />
      <BackgroundView {...props.background}>
        <div
          className={getClassName(isRunningOnBrowser ? 'js' : 'no-js')}
          style={mainViewStyle}
        >
          {props.children}
        </div>
      </BackgroundView>
    </React.Fragment>
  );
}
