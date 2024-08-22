import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IColorGuide } from '../../particles';
import { useColors } from '../../theming';
import { valueToCss } from '../../util';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

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

const getLayersCss = (backgroundLayers: IBackgroundLayer[], colors: IColorGuide): string => {
  return backgroundLayers.slice().reverse().map((backgroundLayer: IBackgroundLayer): string => getLayerCss(backgroundLayer, colors)).join(', ');
};

// eslint-disable-next-line unused-imports/no-unused-vars
const getLayerCss = (backgroundLayer: IBackgroundLayer, colors: IColorGuide): string => {
  const layers: string[] = [];
  // TODO(krishan711): this resolve doesn't do the "full resolution" thing for IE
  // TODO(krishan711): resolve values for linear and radial gradients too
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

interface IStyledBackgroundViewProps extends ISingleAnyChildProps {
  className?: string;
  $backgroundLayers: IBackgroundLayer[];
  $colors: IColorGuide;
}

const StyledBackgroundView = wrappingComponent((Component: React.ComponentType<IStyledBackgroundViewProps>): React.ComponentType<IStyledBackgroundViewProps> => {
  return styled(Component)<IStyledBackgroundViewProps>`
    background: ${(props: IStyledBackgroundViewProps): string => getLayersCss(props.$backgroundLayers, props.$colors)};
  `;
});

export interface IBackgroundViewProps extends IWrapperProps, IBackgroundConfig {
}

export function BackgroundView({
  className = '',
  ...props
}: IBackgroundViewProps): React.ReactElement {
  const colors = useColors();
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
  return (
    <StyledBackgroundView
      className={getClassName(BackgroundView.displayName, className)}
      $backgroundLayers={layers}
      $colors={colors}
    >
      { props.children }
    </StyledBackgroundView>
  );
}

BackgroundView.displayName = 'KibaBackgroundView';
BackgroundView.defaultProps = {
  ...defaultWrapperProps,
};
