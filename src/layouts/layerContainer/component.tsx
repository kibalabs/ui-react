import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, IOptionalSingleAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Alignment } from '../../model';

interface ILayerProps extends IOptionalSingleAnyChildProps {
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  isFullWidth?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  isFullHeight?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  isStatic?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  alignmentVertical?: Alignment;
  // eslint-disable-next-line react/no-unused-prop-types
  alignmentHorizontal?: Alignment;
  // eslint-disable-next-line react/no-unused-prop-types
  shouldPassThroughTouches?: boolean;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function Layer(props: ILayerProps): React.ReactElement {
  return (
    <React.Fragment />
  );
}
Layer.displayName = 'KibaLayer';

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

export function LayerContainer({
  className = '',
  ...props
}: ILayerContainerProps): React.ReactElement {
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number), index: number): React.ReactElement<ILayerProps> => (
  // eslint-disable-next-line react/no-array-index-key
    typeof child === 'object' && 'type' in child && child.type === Layer ? child : <Layer key={index}>{ child }</Layer>
  ));

  return (
    <StyledLayerContainer
      id={props.id}
      className={getClassName(LayerContainer.displayName, className)}
    >
      { children.map((child: React.ReactElement, index: number): React.ReactElement<ILayerProps> => (
        <StyledLayer
          id={props.id && `${props.id}-layer-${index}`}
          className={getClassName(StyledLayer.displayName, child.props.className, (child.props.isFullWidth || child.props.isFullWidth == null) && 'isFullWidth', (child.props.isFullHeight || child.props.isFullHeight == null) && 'isFullHeight', child.props.shouldPassThroughTouches && 'passThroughTouches')}
          key={child.key}
          $isStatic={child.props.isStatic || false}
          $alignmentVertical={child.props.alignmentVertical || Alignment.Start}
          $alignmentHorizontal={child.props.alignmentHorizontal || Alignment.Start}
        >
          {child.props.children}
        </StyledLayer>
      ))}
    </StyledLayerContainer>
  );
}
LayerContainer.displayName = 'KibaLayerContainer';
LayerContainer.Layer = Layer;

const getStaticTranslateCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.Center) {
    return '-50%';
  }
  // if (alignment === Alignment.End) {
  //   return '-100%';
  // }
  return '0';
};

const getStaticAlignmentCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.Center) {
    return '50%';
  }
  if (alignment === Alignment.End) {
    return 'auto';
  }
  return '0';
};

const getStaticAlignmentEndCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.End) {
    return '0';
  }
  return 'auto';
};

const getStaticPositioningCss = (alignmentVertical: Alignment, alignmentHorizontal: Alignment): string => {
  const top = getStaticAlignmentCssValue(alignmentVertical);
  const left = getStaticAlignmentCssValue(alignmentHorizontal);
  const bottom = getStaticAlignmentEndCssValue(alignmentVertical);
  const right = getStaticAlignmentEndCssValue(alignmentHorizontal);
  const translateY = getStaticTranslateCssValue(alignmentVertical);
  const translateX = getStaticTranslateCssValue(alignmentHorizontal);
  return `top: ${top}; left: ${left}; bottom: ${bottom}; right: ${right}; transform: translate(${translateX}, ${translateY})`;
};

interface IStyledLayerProps extends ISingleAnyChildProps {
  className?: string;
  $isStatic: boolean;
  $alignmentVertical: Alignment;
  $alignmentHorizontal: Alignment;
}

const StyledLayer = styled.div<IStyledLayerProps>`
  position: ${(props: IStyledLayerProps): string => (props.$isStatic ? 'static' : 'absolute')};
  ${(props: IStyledLayerProps): string => getStaticPositioningCss(props.$alignmentVertical, props.$alignmentHorizontal)};

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
StyledLayer.displayName = 'KibaLayerContainerLayer';
