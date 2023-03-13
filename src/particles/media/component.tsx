import React from 'react';

import { KibaException } from '@kibalabs/core';

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

const getContentType = async (source: string, useGet = false): Promise<string | null> => {
  return fetch(source, { method: useGet ? 'GET' : 'HEAD', redirect: 'follow' })
    .then(async (response: Response): Promise<string | null> => {
      if (response.status >= 400) {
        const content = await response.text();
        throw new KibaException(content || 'Failed to fetch', response.status);
      }
      const contentType = response.headers.get('Content-Type');
      if (!contentType) {
        return Promise.resolve(null);
      }
      const contentTypeParts = contentType.split('/');
      if (contentTypeParts.length === 0) {
        return Promise.resolve(null);
      }
      return Promise.resolve(contentTypeParts[0]);
    });
};

export const Media = (props: IMediaProps): React.ReactElement => {
  const [mediaType, setMediaType] = React.useState<string | null | undefined>(undefined);

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

  const updateContentType = React.useCallback(async (): Promise<void> => {
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
    try {
      const contentType = await getContentType(props.source);
      setMediaType(contentType);
    } catch (error: unknown) {
      console.error(error);
      try {
        const contentType = await getContentType(props.source, true);
        setMediaType(contentType);
      } catch (innerError: unknown) {
        console.error(innerError);
        setMediaType(null);
      }
    }
  }, [props.source, isVideo, isImage]);

  React.useEffect((): void => {
    updateContentType();
  }, [updateContentType]);

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
