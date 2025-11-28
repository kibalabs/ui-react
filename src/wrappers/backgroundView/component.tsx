import React from 'react';

import { valueToCss } from '../../util';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IBackgroundLayer {
  color?: string;
  linearGradient?: string;
  radialGradient?: string;
  imageUrl?: string;
  patternImageUrl?: string;
}

// Allow someone to use a single background instead of specifying layers
export interface IBackgroundConfig extends IBackgroundLayer {
  layers?: IBackgroundLayer[];
}

const getLayersCss = (backgroundLayers: IBackgroundLayer[]): string => {
  return backgroundLayers.slice().reverse().map((backgroundLayer: IBackgroundLayer): string => getLayerCss(backgroundLayer)).join(', ');
};

const getLayerCss = (backgroundLayer: IBackgroundLayer): string => {
  const layers: string[] = [];
  if (backgroundLayer.color) {
    layers.push(`linear-gradient(${valueToCss(backgroundLayer.color)}, ${valueToCss(backgroundLayer.color)})`);
  }
  if (backgroundLayer.linearGradient) {
    layers.push(`linear-gradient(${backgroundLayer.linearGradient})`);
  }
  if (backgroundLayer.radialGradient) {
    layers.push(`radial-gradient(${backgroundLayer.radialGradient})`);
  }
  if (backgroundLayer.imageUrl) {
    layers.push(`url(${backgroundLayer.imageUrl}) no-repeat center / cover`);
  }
  if (backgroundLayer.patternImageUrl) {
    layers.push(`url(${backgroundLayer.patternImageUrl}) repeat top left`);
  }
  return layers.join(', ');
};

export interface IBackgroundViewProps extends IWrapperProps, IBackgroundConfig {
}

export function BackgroundView(props: IBackgroundViewProps): React.ReactElement {
  const layers = props.layers || [];
  if (props.color || props.linearGradient || props.radialGradient || props.imageUrl || props.patternImageUrl || layers.length === 0) {
    layers.splice(0, 0, {
      color: props.color,
      linearGradient: props.linearGradient,
      radialGradient: props.radialGradient,
      imageUrl: props.imageUrl,
      patternImageUrl: props.patternImageUrl,
    });
  }
  const backgroundCss = getLayersCss(layers);
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={BackgroundView.displayName}
      wrapperStyle={backgroundCss ? { background: backgroundCss } : undefined}
    >
      {props.children}
    </WrapperView>
  );
}
BackgroundView.displayName = 'KibaBackgroundView';
