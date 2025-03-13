import React from 'react';

import { getClassName } from '@kibalabs/core';
import { getIsRunningOnBrowser, IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { GlobalCss } from './globalCss';
import { resetCss } from './resetCss';
import { ITheme, ThemeProvider } from '../theming';
import { ComponentDefinition } from '../theming/cssBuilder';
import { ThemeType } from '../util';
import { BackgroundView, IBackgroundConfig } from '../wrappers';

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange.js';
import 'lazysizes/plugins/respimg/ls.respimg.js';

interface IStyledMainViewProps {
  $extraCss?: string;
}

const StyledMainView = styled.div<IStyledMainViewProps>`
  min-height: 100vh;

  &.fullPage {
    /* NOTE(krishan711): the min-height doesn't propagate to children that have height:100% unless this is here (https://stackoverflow.com/questions/8468066) */
    height: 1px;
    min-height: 100%;
  }

  ${(props: IStyledMainViewProps): string => props.$extraCss || ''};
`;

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
  // NOTE(krishan711): the default is false because if this is rehydrating it would be false on the server and needs to match.
  const [isRunningOnBrowser, setIsRunningOnBrowser] = React.useState<boolean>(!props.isRehydrating);

  useInitialization((): void => {
    setIsRunningOnBrowser(getIsRunningOnBrowser());
    if (isRunningOnBrowser) {
      // @ts-ignore
      window.lazySizes.cfg = window.lazySizes.cfg || {};
      // @ts-ignore
      window.lazySizes.cfg.minSize = 20;
    }

    // NOTE(krishan711): helpful to debug lazysizes
    // window.addEventListener('lazybeforesizes', function(e) {
    //   console.log(e);
    // });
  });

  return (
    <ThemeProvider theme={props.theme} extraComponentDefinitions={props.extraComponentDefinitions}>
      <GlobalCss
        theme={props.theme}
        resetCss={resetCss}
        extraCss={props.extraGlobalCss}
        isFullPageApp={props.isFullPageApp}
      />
      <link href='https://assets-cdn.kiba.dev' rel='preconnect' crossOrigin='anonymous' />
      { Object.keys(props.theme.fonts || {}).map((fontKey: string): React.ReactElement => (
        <React.Fragment key={fontKey}>
          <link href={props.theme.fonts[fontKey].url} rel='preload' as='style' />
          {/* TODO(krishan711): the lazy loading doesn't work here */}
          {/* <link href={theme.fonts[fontKey].url} rel='stylesheet' media='print' onLoad={((event: React.SyntheticEvent<HTMLLinkElement>): void => {(event.target as HTMLLinkElement).media = 'all'})} />
          <noscript><link href={theme.fonts[fontKey].url} rel='stylesheet' /></noscript> */}
          <link href={props.theme.fonts[fontKey].url} rel='stylesheet' />
        </React.Fragment>
      ))}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <BackgroundView {...props.background}>
        <StyledMainView
          className={getClassName(isRunningOnBrowser ? 'js' : 'no-js', props.isFullPageApp && 'fullPage')}
          $extraCss={props.extraCss}
        >
          {props.children}
        </StyledMainView>
      </BackgroundView>
    </ThemeProvider>
  );
}
