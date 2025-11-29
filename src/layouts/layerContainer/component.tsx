import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, IOptionalSingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
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

interface ILayerContainerProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const getStaticTranslateCssValue = (alignment: Alignment): string => {
  if (alignment === Alignment.Center) {
    return '-50%';
  }
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

const getLayerStyles = (isStatic: boolean, alignmentVertical: Alignment, alignmentHorizontal: Alignment): React.CSSProperties => {
  const top = getStaticAlignmentCssValue(alignmentVertical);
  const left = getStaticAlignmentCssValue(alignmentHorizontal);
  const bottom = getStaticAlignmentEndCssValue(alignmentVertical);
  const right = getStaticAlignmentEndCssValue(alignmentHorizontal);
  const translateY = getStaticTranslateCssValue(alignmentVertical);
  const translateX = getStaticTranslateCssValue(alignmentHorizontal);
  return {
    position: isStatic ? 'static' : 'absolute',
    top,
    left,
    bottom,
    right,
    transform: `translate(${translateX}, ${translateY})`,
  };
};

export function LayerContainer({
  className = '',
  ...props
}: ILayerContainerProps): React.ReactElement {
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number), index: number): React.ReactElement<ILayerProps> => (
  // eslint-disable-next-line react/no-array-index-key
    typeof child === 'object' && 'type' in child && child.type === Layer ? child as React.ReactElement<ILayerProps> : <Layer key={`child-${index}`}>{ child }</Layer>
  ));
  return (
    <div
      id={props.id}
      className={getClassName(LayerContainer.displayName, className)}
      style={props.style}
    >
      { children.map((child: React.ReactElement<ILayerProps>, index: number): React.ReactElement => (
        <div
          id={props.id && `${props.id}-layer-${index}`}
          className={getClassName('KibaLayerContainerLayer', child.props.className, (child.props.isFullWidth || child.props.isFullWidth == null) && 'isFullWidth', (child.props.isFullHeight || child.props.isFullHeight == null) && 'isFullHeight', child.props.shouldPassThroughTouches && 'passThroughTouches')}
          key={child.key}
          style={getLayerStyles(child.props.isStatic || false, child.props.alignmentVertical || Alignment.Start, child.props.alignmentHorizontal || Alignment.Start)}
        >
          {child.props.children}
        </div>
      ))}
    </div>
  );
}
LayerContainer.displayName = 'KibaLayerContainer';
LayerContainer.Layer = Layer;
