import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, useBuiltTheme } from '../..';
import { IVideoTheme } from './theme';

export interface IStyledVideoProps {
  $theme: IVideoTheme;
  $isFullWidth: boolean;
  $isFullHeight: boolean;
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
  width: ${(props: IStyledVideoProps): string => (props.$isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledVideoProps): string => (props.$isFullHeight ? '100%' : 'auto')};
  object-fit: ${(props: IStyledVideoProps): string => getImageFit(props.$fitType)};
  max-width: 100%;
  max-height: 100%;

  .no-js &.lazyload {
    display: none;
  }

  // fade in after lazy load
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
`;

export interface IVideoProps extends IComponentProps<IVideoTheme> {
  source: string;
  alternativeText: string;
  fitType?: 'crop' | 'cover' | 'scale' | 'contain';
  isFullWidth?: boolean;
  isFullHeight?: boolean;
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

export const Video = (props: IVideoProps): React.ReactElement => {
  const theme = useBuiltTheme('videos', props.variant, props.theme);
  const fitType = props.fitType || 'scale';
  const shouldShowControls = props.shouldShowControls != null ? props.shouldShowControls : true;

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
      className={getClassName(Video.displayName, props.className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered')}
      $theme={theme}
      $fitType={fitType}
      $isFullWidth={Boolean(props.isFullWidth)}
      $isFullHeight={Boolean(props.isFullHeight)}
      autoPlay={props.isLazyLoadable ? undefined : Boolean(props.shouldAutoplay)}
      dataAutoplay={props.isLazyLoadable ? Boolean(props.shouldAutoplay) : undefined}
      muted={Boolean(props.shouldMute)}
      playsInline={true}
      controls={shouldShowControls}
      loop={Boolean(props.shouldLoop)}
      onEnded={onEnded}
      onPlay={onPlayed}
      onPause={onPaused}
    >
      <source src={props.source} />
      {props.alternativeText}
    </StyledVideo>
  );
};

Video.displayName = 'Video';
Video.defaultProps = {
  ...defaultComponentProps,
  shouldShowControls: true,
};
