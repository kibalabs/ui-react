import React from 'react';

import { getClassName } from '@kibalabs/core';

import { Direction, IComponentProps, MultiDirection } from '../../model';
import { useDimensions } from '../../theming';
import { getPaddingSize, IDimensionGuide, PaddingSize } from '../dimensions';

import './styles.scss';

export interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction?: Direction | MultiDirection;
}

export function Spacing({
  className = '',
  variant = 'default',
  direction = MultiDirection.Both,
  ...props
}: ISpacingProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const size = getPaddingSize(variant as PaddingSize, theme);
  const marginLeft = direction === MultiDirection.Both || direction === MultiDirection.Horizontal ? size : '0';
  const marginTop = direction === MultiDirection.Both || direction === MultiDirection.Vertical ? size : '0';
  const spacingStyles: React.CSSProperties = {
    '--kiba-spacing-margin-left': marginLeft,
    '--kiba-spacing-margin-top': marginTop,
  } as React.CSSProperties;
  return (
    <div
      id={props.id}
      className={getClassName(Spacing.displayName, className)}
      style={spacingStyles}
    />
  );
}
Spacing.displayName = 'KibaSpacing';
