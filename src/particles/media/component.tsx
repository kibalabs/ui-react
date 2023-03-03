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
  width?: string;
  height?: string;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  isCenteredHorizontally?: boolean;
  isLazyLoadable?: boolean;
}

const getExtension = (url: string): string => {
  // NOTE(krishan711): the url is only used to check the type so it doesn't matter if it's actually the correct url or not (for now).
  const source = new URL(url, typeof window !== 'undefined' && window?.location ? window.location.href : 'https://kibalabs.com');
  const fileExtension = source.pathname.split('.').pop()?.toLowerCase() || '';
  return fileExtension;
};

export const Media = (props: IMediaProps): React.ReactElement => {
  const [mediaType, setMediaType] = React.useState<string | null>(null);
  const isVideo = React.useMemo((): boolean => {
    if (!props.source) {
      return false;
    }
    const videoTypes = new Set(['mp4', 'webm', 'ogg']);
    const fileExtension = getExtension(props.source);
    return videoTypes.has(fileExtension);
  }, [props.source]);

  const isImage = React.useMemo((): boolean => {
    if (!props.source) {
      return true;
    }
    const imageTypes = new Set(['png', 'jpg', 'gif', 'jpeg', 'tif', 'tiff', 'raw']);
    const fileExtension = getExtension(props.source);
    return imageTypes.has(fileExtension);
  }, [props.source]);

  React.useEffect((): void => {
    if (!props.source) {
      setMediaType(null);
      return;
    }

    if (isImage) {
      setMediaType('image');
      return;
    }
    if (isVideo) {
      setMediaType('video');
      return;
    }
    fetch(props.source, { method: 'HEAD', redirect: 'follow' })
      .then((response: Response) => {
        if (response.status >= 400) {
          throw new Error(`Failed to fetch content type: ${response}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType) {
          setMediaType(null);
          return;
        }
        const contentTypeParts = contentType.split('/');
        if (contentTypeParts.length === 0) {
          setMediaType(null);
          return;
        }
        setMediaType(contentTypeParts[0]);
      })
      .catch((error: Error) => {
        console.error(error);
        setMediaType(null);
      });
  }, [props.source, isVideo, isImage]);

  return (isVideo || mediaType === 'video') ? (
    <Video shouldShowControls={false} shouldLoop={true} shouldMute={true} shouldAutoplay={true} {...props} />
  ) : mediaType && mediaType !== 'image' ? (
    <WebView url={props.source} />
  ) : (
    <Image {...props as IImageProps} />
  );
};

Media.displayName = 'KibaMedia';
Media.defaultProps = {
  ...defaultComponentProps,
};
