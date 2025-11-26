import React from 'react';

import { getClassName } from '@kibalabs/core';
import { getIsRunningOnBrowser, IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { ITheme, ThemeProvider } from '../theming';
import { ComponentDefinition } from '../theming/cssBuilder';
import { ThemeType } from '../util';
import { BackgroundView, IBackgroundConfig } from '../wrappers';

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange.js';
import 'lazysizes/plugins/respimg/ls.respimg.js';

export interface IKibaAppProps extends IMultiAnyChildProps {
  theme: ITheme;
  isRehydrating?: boolean;
  isFullPageApp?: boolean;
  extraGlobalCss?: string;
  extraCss?: string;
  background?: IBackgroundConfig;
  extraComponentDefinitions?: ComponentDefinition<ThemeType>[];
}

export function KibaApp({
  ...props
}: IKibaAppProps): React.ReactElement {
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
  const extraCssStyle = props.extraCss ? <style dangerouslySetInnerHTML={{ __html: props.extraCss }} /> : null;
  const mainViewStyle: React.CSSProperties = {
    minHeight: props.isFullPageApp ? '100%' : '100vh',
    ...(props.isFullPageApp ? { height: '1px' } : {}),
  };
  return (
    <ThemeProvider theme={props.theme} extraComponentDefinitions={props.extraComponentDefinitions}>
      <GlobalCss
        theme={props.theme}
        resetCss={resetCss}
        extraCss={props.extraGlobalCss}
        isFullPageApp={props.isFullPageApp}
      />
      {extraCssStyle}
      <link href='https://assets-cdn.kiba.dev' rel='preconnect' crossOrigin='anonymous' />
      { Object.keys(props.theme.fonts || {}).map((fontKey: string): React.ReactElement => (
        <React.Fragment key={fontKey}>
          <link href={props.theme.fonts[fontKey].url} rel='preload' as='style' />
          <link href={props.theme.fonts[fontKey].url} rel='stylesheet' />
        </React.Fragment>
      ))}
      <BackgroundView {...props.background}>
        <div
          className={getClassName(isRunningOnBrowser ? 'js' : 'no-js')}
          style={mainViewStyle}
        >
          {props.children}
        </div>
      </BackgroundView>
    </ThemeProvider>
  );
}
