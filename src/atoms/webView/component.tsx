import React from 'react';

import { getClassName } from '@kibalabs/core';
import { useInitialization } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { LoadingSpinner } from '../../particles';
import { IWebViewTheme } from './theme';

interface IStyledWebViewProps {
  theme: IWebViewTheme;
  aspectRatio?: number;
}

const StyledWebView = styled.div<IStyledWebViewProps>`
  ${(props: IStyledWebViewProps): string => themeToCss(props.theme.normal?.default?.background)};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: ${(props: IStyledWebViewProps): string => (props.aspectRatio ? `calc(${props.aspectRatio} * 100%)` : 'auto')};
`;

const LoadingWrapper = styled.div<IStyledWebViewProps>`
  position: absolute;
`;

interface IStyledIframeProps {
}

const StyledIframe = styled.iframe<IStyledIframeProps>`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  border: none;

  .no-js &.lazyload {
    display: none;
  }

  &.lazyload, &.lazyloading, &.isLoading {
    opacity: 0;
  }
  &.lazyloaded {
    display: block;
    opacity: 1;
    transition: opacity 0.15s;
  }
`;

export interface IWebViewProps extends IComponentProps<IWebViewTheme> {
  url: string;
  errorView: React.FunctionComponent;
  permissions: string[];
  shouldShowLoadingSpinner: boolean;
  title?: string;
  isLazyLoadable?: boolean;
  aspectRatio?: number;
  onLoadingChanged?: (isLoading: boolean) => void;
}

export const WebView = (props: IWebViewProps): React.ReactElement => {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>(props.url);
  const [hasFailedToLoad, setHasFailedToLoad] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const isInitialized = useInitialization((): void => {});
  const theme = useBuiltTheme('webViews', props.variant, props.theme);

  React.useEffect((): void => {
    if (props.url !== currentUrl) {
      setIsLoading(true);
      setCurrentUrl(props.url);
      setHasFailedToLoad(false);
    }
  }, [props.url, currentUrl]);

  const handleOnError = (): void => {
    setIsLoading(false);
    setHasFailedToLoad(true);
  };

  const handleOnLoad = (event: React.SyntheticEvent<HTMLIFrameElement, Event>): void => {
    setIsLoading(false);
    const iframe: HTMLIFrameElement = event.target as HTMLIFrameElement;
    if (!(iframe && iframe.contentWindow && iframe.contentWindow.window && iframe.contentWindow.window.length > 0)) {
      // setHasFailedToLoad(true);
    }
  };

  React.useEffect((): void => {
    if (props.onLoadingChanged) {
      props.onLoadingChanged(isLoading);
    }
  // NOTE(krishan711): not sure why this disable is needed. eslint complains it needs all of props??
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onLoadingChanged, isLoading]);

  return (
    <StyledWebView
      id={props.id}
      className={getClassName(WebView.displayName, props.className)}
      theme={theme}
      aspectRatio={props.aspectRatio}
    >
      <noscript>
        <StyledIframe
          id={props.id && `${props.id}-iframe`}
          className={getClassName('web-view-iframe', 'unlazy')}
          title={props.title}
          key={currentUrl}
          src={currentUrl}
          allow={props.permissions.join(';')}
        />
      </noscript>
      {isInitialized && (
        hasFailedToLoad
          ? props.errorView
          : (
            <React.Fragment>
              { isLoading && props.shouldShowLoadingSpinner && (
                <LoadingWrapper id={props.id && `${props.id}-loading-wrapper`}>
                  <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} className={'web-view-loading-spinner'} />
                </LoadingWrapper>
              )}
              <StyledIframe
                id={props.id && `${props.id}-iframe`}
                className={getClassName('web-view-iframe', props.isLazyLoadable ? 'lazyload' : 'unlazy', isLoading && 'isLoading')}
                title={props.title}
                key={currentUrl}
                src={props.isLazyLoadable ? undefined : currentUrl}
                data-src={props.isLazyLoadable ? currentUrl : undefined}
                onLoad={handleOnLoad}
                onError={handleOnError}
                allow={props.permissions.join(';')}
              />
            </React.Fragment>
          )
      )}
    </StyledWebView>
  );
};

WebView.displayName = 'WebView';
WebView.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldOpenSameTab: false,
  shouldShowLoadingSpinner: true,
  title: 'Embedded View',
  permissions: [],
};
