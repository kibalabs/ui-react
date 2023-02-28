import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { IVideoTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';

/* ${(props: IStyledVideoProps): string => themeToCss(props.$theme.background)}; */
// eslint-disable-next-line unused-imports/no-unused-vars
export const VideoThemedStyle = (theme: RecursivePartial<IVideoTheme>): string => `
`;

export interface IStyledVideoProps {
  $theme?: RecursivePartial<IVideoTheme>;
  $width: string;
  $height: string;
  $maxWidth: string;
  $maxHeight: string;
  $fitType: 'crop' | 'cover' | 'scale' | 'contain';
}

const getImageFit = (fitType: string): string => {
  if (fitType === 'crop' || fitType === 'cover') {
    return 'cover';
  }
  if (fitType === 'contain') {
    return 'contain';
  }
  return 'fill';
};

const StyledVideo = styled.video<IStyledVideoProps>`
  display: block;
  // fade in after lazy load
  .no-js &.lazyload {
    display: none;
  }
  &.lazyload, &.lazyloading {
    opacity: 0;
  }
  &.lazyloaded {
    display: block;
    opacity: 1;
    transition: opacity 0.15s;
  }
  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
  width: ${(props: IStyledVideoProps): string => props.$width};
  height: ${(props: IStyledVideoProps): string => props.$height};
  max-width: ${(props: IStyledVideoProps): string => props.$maxWidth};
  max-height: ${(props: IStyledVideoProps): string => props.$maxHeight};
  object-fit: ${(props: IStyledVideoProps): string => getImageFit(props.$fitType)};
  && {
    ${(props: IStyledVideoProps): string => (props.$theme ? VideoThemedStyle(props.$theme) : '')};
  }
`;

export interface IVideoProps extends IComponentProps<IVideoTheme> {
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
  shouldShowControls?: boolean;
  shouldAutoplay?: boolean;
  shouldMute?: boolean;
  shouldLoop?: boolean;
  isLazyLoadable?: boolean;
  onEnded?: () => void;
  onPlayed?: () => void;
  onPaused?: () => void;
}

// NOTE(krishan711): Failed to get lazy loading working properly. try again with https://github.com/aFarkas/lazysizes/issues/697
export const Video = (props: IVideoProps): React.ReactElement => {
  const fitType = props.fitType || 'scale';
  const shouldShowControls = props.shouldShowControls != null ? props.shouldShowControls : true;
  const width = props.width ? props.width : props.isFullWidth ? '100%' : 'auto';
  const height = props.height ? props.height : props.isFullHeight ? '100%' : 'auto';

  const onEnded = (): void => {
    if (props.onEnded) {
      props.onEnded();
    }
  };

  const onPlayed = (): void => {
    if (props.onPlayed) {
      props.onPlayed();
    }
  };

  const onPaused = (): void => {
    if (props.onPaused) {
      props.onPaused();
    }
  };

  return (
    <StyledVideo
      id={props.id}
      // props.isLazyLoadable ? 'lazyload' : 'unlazy'
      className={getClassName(Video.displayName, props.className, props.isCenteredHorizontally && 'centered', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      $fitType={fitType}
      $width={width}
      $height={height}
      $maxWidth={props.maxWidth || 'none'}
      $maxHeight={props.maxHeight || 'none'}
      // preload={props.isLazyLoadable ? "none" : "auto"}
      autoPlay={Boolean(props.shouldAutoplay)}
      // data-autoplay={props.isLazyLoadable ? Boolean(props.shouldAutoplay) : undefined}
      muted={Boolean(props.shouldMute)}
      playsInline={true}
      controls={shouldShowControls}
      loop={Boolean(props.shouldLoop)}
      onEnded={onEnded}
      onPlay={onPlayed}
      onPause={onPaused}
      src={props.source}
    >
      {props.alternativeText}
    </StyledVideo>
  );
};

Video.displayName = 'Video';
Video.defaultProps = {
  ...defaultComponentProps,
  shouldShowControls: true,
};
