import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';

export { VideoThemedStyle } from '../../util/legacyThemeCompat';

const getVideoFit = (fitType: string): string => {
  if (fitType === 'crop' || fitType === 'cover') {
    return 'cover';
  }
  if (fitType === 'contain') {
    return 'contain';
  }
  return 'fill';
};

export interface IVideoProps extends IComponentProps {
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
  ipfsPrefix?: string;
  onEnded?: () => void;
  onPlayed?: () => void;
  onPaused?: () => void;
}

export function Video({
  className = '',
  variant = 'default',
  shouldShowControls = true,
  ...props
}: IVideoProps): React.ReactElement {
  const fitType = props.fitType || 'scale';
  const width = props.width ? props.width : props.isFullWidth ? '100%' : 'auto';
  const height = props.height ? props.height : props.isFullHeight ? '100%' : 'auto';
  const source = props.source.startsWith('ipfs://') ? props.source.replace('ipfs://', props.ipfsPrefix ?? 'https://ipfs.io/ipfs/') : props.source;
  const videoStyles: React.CSSProperties = {
    ...props.style,
    '--kiba-video-width': width,
    '--kiba-video-height': height,
    '--kiba-video-max-width': props.maxWidth || 'none',
    '--kiba-video-max-height': props.maxHeight || 'none',
    '--kiba-video-fit': getVideoFit(fitType),
  } as React.CSSProperties;
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
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      id={props.id}
      className={getClassName(Video.displayName, className, props.isCenteredHorizontally && 'centered', ...(variant?.split('-') || []))}
      style={videoStyles}
      autoPlay={Boolean(props.shouldAutoplay)}
      muted={Boolean(props.shouldMute)}
      playsInline={true}
      controls={shouldShowControls}
      loop={Boolean(props.shouldLoop)}
      onEnded={onEnded}
      onPlay={onPlayed}
      onPause={onPaused}
      src={source}
    >
      {props.alternativeText}
    </video>
  );
}
Video.displayName = 'KibaVideo';
