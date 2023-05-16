import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { useInitialization } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IWebViewTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { LoadingSpinner } from '../../particles';
import { themeToCss } from '../../util';

export const WebViewThemedStyle = (theme: RecursivePartial<IWebViewTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};
`;

interface IStyledWebViewProps {
  $theme?: RecursivePartial<IWebViewTheme>;
  $aspectRatio?: number;
}

const StyledWebView = styled.div<IStyledWebViewProps>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: ${(props: IStyledWebViewProps): string => (props.$aspectRatio ? `calc(${props.$aspectRatio} * 100%)` : 'auto')};

  &&&& {
    ${(props: IStyledWebViewProps): string => (props.$theme ? WebViewThemedStyle(props.$theme) : '')};
  }
`;

const LoadingWrapper = styled.div`
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
  permissions: string[];
  shouldShowLoadingSpinner: boolean;
  errorView?: React.FunctionComponent;
  title?: string;
  isLazyLoadable?: boolean;
  aspectRatio?: number;
  onLoadingChanged?: (isLoading: boolean) => void;
}

// TODO(krishan711): make a better default error view
const DefaultErrorView = (): React.ReactElement => {
  return (
    <div>Something went wrong</div>
  );
};

export const WebView = (props: IWebViewProps): React.ReactElement => {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>(props.url);
  const [hasFailedToLoad, setHasFailedToLoad] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const isInitialized = useInitialization((): void => undefined);

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

  const onLoadingChanged = props.onLoadingChanged;
  React.useEffect((): void => {
    if (onLoadingChanged) {
      onLoadingChanged(isLoading);
    }
  }, [onLoadingChanged, isLoading]);

  return (
    // @ts-ignore
    <StyledWebView
      id={props.id}
      className={getClassName(WebView.displayName, props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      $aspectRatio={props.aspectRatio}
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
      { hasFailedToLoad ? (
        <React.Fragment>
          {props.errorView != null ? (
            <props.errorView />
          ) : (
            <DefaultErrorView />
          )}
        </React.Fragment>
      ) : isInitialized && (
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
      )}
    </StyledWebView>
  );
};

WebView.displayName = 'KibaWebView';
WebView.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  shouldShowLoadingSpinner: true,
  title: 'Embedded View',
  permissions: [],
};
