import React from 'react';

import { defaultComponentProps, IComponentProps, ThemeType } from '../..';
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
  const isVideo = React.useMemo((): boolean => {
    if (!props.source) {
      return false;
    }
    console.log('props.source', props.source)
    // NOTE(krishan711): the url is only used to check the type so it doesn't matter if it's actually the correct url or not (for now).
    const source = new URL(props.source, location ? location.href : 'https://kibalabs.com');
    const fileExtension = source.pathname.split('.').pop()?.toLowerCase() || '';
    return fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg';
  }, [props.source]);

  return isVideo ? (
    <Video shouldShowControls={false} shouldLoop={true} shouldMute={true} shouldAutoplay={true} {...props} />
  ) : (
    <Image {...props as IImageProps} />
  );
};

Media.displayName = 'Media';
Media.defaultProps = {
  ...defaultComponentProps,
};
