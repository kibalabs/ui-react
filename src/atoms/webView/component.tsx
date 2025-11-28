import React from 'react';

import { getClassName } from '@kibalabs/core';
import { useInitialization } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { LoadingSpinner } from '../../particles';

export { WebViewThemedStyle } from '../../util/legacyThemeCompat';

export interface IWebViewProps extends IComponentProps {
  url: string;
  permissions?: string[];
  shouldShowLoadingSpinner?: boolean;
  errorView?: React.FunctionComponent;
  title?: string;
  isLazyLoadable?: boolean;
  aspectRatio?: number;
  onLoadingChanged?: (isLoading: boolean) => void;
}

function DefaultErrorView(): React.ReactElement {
  return (
    <div>Something went wrong</div>
  );
}

export function WebView({
  variant = 'default',
  shouldShowLoadingSpinner = true,
  title = 'Embedded View',
  permissions = [],
  ...props
}: IWebViewProps): React.ReactElement {
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
  const aspectRatioStyle = props.aspectRatio ? { paddingBottom: `calc(${props.aspectRatio} * 100%)` } : undefined;
  return (
    <div
      id={props.id}
      className={getClassName(WebView.displayName, props.className, ...(variant?.split('-') || []))}
      style={{ ...props.style, ...aspectRatioStyle }}
    >
      <noscript>
        <iframe
          id={props.id && `${props.id}-iframe`}
          className={getClassName('web-view-iframe', 'unlazy')}
          title={title}
          key={currentUrl}
          src={currentUrl}
          allow={permissions.join(';')}
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
          { isLoading && shouldShowLoadingSpinner && (
            <div id={props.id && `${props.id}-loading-wrapper`} className='web-view-loading-wrapper'>
              <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} className='web-view-loading-spinner' />
            </div>
          )}
          <iframe
            id={props.id && `${props.id}-iframe`}
            className={getClassName('web-view-iframe', props.isLazyLoadable ? 'lazyload' : 'unlazy', isLoading && 'isLoading')}
            title={title}
            key={currentUrl}
            src={props.isLazyLoadable ? undefined : currentUrl}
            data-src={props.isLazyLoadable ? currentUrl : undefined}
            onLoad={handleOnLoad}
            onError={handleOnError}
            allow={permissions.join(';')}
          />
        </React.Fragment>
      )}
    </div>
  );
}
WebView.displayName = 'KibaWebView';
