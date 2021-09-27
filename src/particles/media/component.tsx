import React from 'react';

import { defaultComponentProps, IComponentProps, ThemeType, WebView } from '../..';
import { IImageProps, Image } from '../image';
import { Video } from '../video';

export interface IMediaTheme extends ThemeType {
}

export interface IMediaProps extends IComponentProps<IMediaTheme> {
  source: string;
  alternativeText: string;
  fitType?: 'crop' | 'cover' | 'scale' | 'contain';
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  isCenteredHorizontally?: boolean;
  isLazyLoadable?: boolean;
}

export const Media = (props: IMediaProps): React.ReactElement => {
  const [mediaType, setMediaType] = React.useState<string | null>(null);
  const isVideo = React.useMemo((): boolean => {
    if (!props.source) {
      return false;
    }
    // NOTE(krishan711): the url is only used to check the type so it doesn't matter if it's actually the correct url or not (for now).
    const source = new URL(props.source, window?.location ? window.location.href : 'https://kibalabs.com');
    const fileExtension = source.pathname.split('.').pop()?.toLowerCase() || '';
    return fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg';
  }, [props.source]);

  React.useEffect((): void => {
    if (!props.source) {
      setMediaType(null);
      return;
    }
    fetch(props.source)
      .then((response) => {
        if (response.status >= 300) {
          throw new Error(`Failed to fetch icon: ${response}`);
        }
        const contentType = response.headers.get('Content-Type');
        // image/jpeg
        const arr = contentType.split('/'); // ['image', 'jpeg'] | ['video', 'mp4']
        if (arr.length === 0) {
          setMediaType(null);
          return;
        }
        setMediaType(arr[0]);
      })
      .catch(() => {
        setMediaType(null);
      });
    // setMediaType(media);
  }, [props.source]);

  return (isVideo || mediaType === 'video') ? (
    <Video shouldShowControls={false} shouldLoop={true} shouldMute={true} shouldAutoplay={true} {...props} />
  ) : mediaType === 'image' ? (
    <Image {...props as IImageProps} />
  ) : <WebView url={props.source} />;
};

Media.displayName = 'Media';
Media.defaultProps = {
  ...defaultComponentProps,
};
