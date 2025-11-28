import React from 'react';

import { getClassName } from '@kibalabs/core';

import { Direction, IComponentProps, MultiDirection } from '../../model';
import { getPaddingSizeCss, PaddingSize } from '../dimensions';

import './styles.scss';

export interface ISpacingProps extends IComponentProps {
  direction?: Direction | MultiDirection;
  style?: React.CSSProperties;
}

export function Spacing({
  className = '',
  variant = 'default',
  direction = MultiDirection.Both,
  ...props
}: ISpacingProps): React.ReactElement {
  const size = getPaddingSizeCss(variant as PaddingSize);
  const marginLeft = direction === MultiDirection.Both || direction === MultiDirection.Horizontal ? size : '0';
  const marginTop = direction === MultiDirection.Both || direction === MultiDirection.Vertical ? size : '0';
  const spacingStyles: React.CSSProperties = {
    ...props.style,
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
