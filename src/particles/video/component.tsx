import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, useBuiltTheme } from '../..';
import { IVideoTheme } from './theme';

export interface IStyledVideoProps {
  theme: IVideoTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'cover' | 'scale' | 'contain';
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
  width: ${(props: IStyledVideoProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledVideoProps): string => (props.isFullHeight ? '100%' : 'auto')};
  object-fit: ${(props: IStyledVideoProps): string => getImageFit(props.fitType)};
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

  // TODO(krish): should all things be like this?
  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
`;

export interface IVideoProps extends IComponentProps<IVideoTheme> {
  source: string;
  alternativeText: string;
  fitType: 'crop' | 'cover' | 'scale' | 'contain';
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  isCenteredHorizontally?: boolean;
  shouldShowControls?: boolean;
  shouldAutoplay?: boolean;
  shouldMute?: boolean;
  shouldLoop?: boolean;
  isLazyLoadable?: boolean;
}

export const Video = (props: IVideoProps): React.ReactElement => {
  const theme = useBuiltTheme('videos', props.variant, props.theme);
  return (
    <StyledVideo
      id={props.id}
      className={getClassName(Video.displayName, props.className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered')}
      theme={theme}
      autoPlay={Boolean(props.shouldAutoplay)}
      muted={Boolean(props.shouldMute)}
      playsInline={true}
      controls={Boolean(props.shouldShowControls)}
      loop={Boolean(props.shouldLoop)}
      fitType={props.fitType}
      isFullWidth={Boolean(props.isFullWidth)}
      isFullHeight={Boolean(props.isFullHeight)}
    >
      <source
        src={props.isLazyLoadable ? undefined : props.source}
        data-src={props.isLazyLoadable ? props.source : undefined}
      />
      {props.isLazyLoadable && (
        <noscript>
          <source
            src={props.source}
          />
        </noscript>
      )}
      {props.alternativeText}
    </StyledVideo>
  );
};

Video.displayName = 'Video';
Video.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
  shouldShowControls: true,
};
