import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, IOptionalSingleAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Alignment } from '../../model';

interface ILayerProps extends IOptionalSingleAnyChildProps {
  className?: string;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  isStatic?: boolean;
  alignmentVertical: Alignment;
  alignmentHorizontal: Alignment;
  shouldPassThroughTouches?: boolean;
}

class Layer extends React.Component<ILayerProps> {
  static defaultProps = {
    className: '',
    isFullWidth: true,
    isFullHeight: true,
    isStatic: false,
    alignmentVertical: Alignment.Start,
    alignmentHorizontal: Alignment.Start,
    shouldPassThroughTouches: false,
  };
}

const StyledLayerContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

interface ILayerContainerProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
}

export const LayerContainer = (props: ILayerContainerProps): React.ReactElement => {
  const children = flattenChildren(props.children).map((child: React.ReactChild, index: number): React.ReactElement<ILayerProps> => (
    typeof child === 'object' && 'type' in child && child.type === Layer ? child : <Layer key={index}>{ child }</Layer>
  ));

  return (
    <StyledLayerContainer
      id={props.id}
      className={getClassName(LayerContainer.displayName, props.className)}
    >
      { children.map((child: React.ReactElement, index: number): React.ReactElement<ILayerProps> => (
        <StyledLayer
          id={props.id && `${props.id}-layer-${index}`}
          className={getClassName(StyledLayer.displayName, child.props.className, child.props.isFullWidth && 'isFullWidth', child.props.isFullHeight && 'isFullHeight', child.props.shouldPassThroughTouches && 'passThroughTouches')}
          key={child.key || index}
          isStatic={child.props.isStatic}
          alignmentVertical={child.props.alignmentVertical}
          alignmentHorizontal={child.props.alignmentHorizontal}
        >
          {child.props.children}
        </StyledLayer>
      ))}
    </StyledLayerContainer>
  );
};

LayerContainer.displayName = 'LayerContainer';
LayerContainer.defaultProps = {
  className: '',
};
LayerContainer.Layer = Layer;

const getStaticTranslateCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.Center) {
    return '-50%';
  }
  if (alignment === Alignment.End) {
    return '-100%';
  }
  return '0';
};

const getStaticAlignmentCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.Center) {
    return '50%';
  }
  if (alignment === Alignment.End) {
    return '100%';
  }
  return '0';
};

const getStaticPositioningCss = (alignmentVertical: Alignment, alignmentHorizontal: Alignment): string => {
  const top = getStaticAlignmentCssValue(alignmentVertical);
  const left = getStaticAlignmentCssValue(alignmentHorizontal);
  const translateY = getStaticTranslateCssValue(alignmentVertical);
  const translateX = getStaticTranslateCssValue(alignmentHorizontal);
  return `top: ${top}; left: ${left}; transform: translate(${translateX}, ${translateY})`;
};

interface IStyledLayerProps extends ISingleAnyChildProps {
  className?: string;
  isStatic: boolean;
  alignmentVertical: Alignment;
  alignmentHorizontal: Alignment;
}

const StyledLayer = styled.div<IStyledLayerProps>`
  position: ${(props: IStyledLayerProps): string => (props.isStatic ? 'static' : 'absolute')};
  ${(props: IStyledLayerProps): string => getStaticPositioningCss(props.alignmentVertical, props.alignmentHorizontal)};

  &.isFullWidth {
    width: 100%;
  }
  &.isFullHeight {
    height: 100%;
  }
  &.passThroughTouches {
    pointer-events: none;
  }
`;
StyledLayer.displayName = 'LayerContainer.Layer';
