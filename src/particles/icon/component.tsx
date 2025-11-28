import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';


export interface IIconProps extends IComponentProps {
  _color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
  svgContent: string;
}

export function Icon({
  className = '',
  variant = 'default',
  shouldAddFill = true,
  shouldAddStroke = true,
  ...props
}: IIconProps): React.ReactElement {
  const iconStyles: React.CSSProperties = {
    ...props.style,
    // eslint-disable-next-line no-underscore-dangle
    ...(props._color && { '--kiba-icon-color': props._color } as React.CSSProperties),
  };
  return (
    <div
      id={props.id}
      className={getClassName(Icon.displayName, className, shouldAddFill && 'fill', shouldAddStroke && 'stroke', ...(variant?.split('-') || []))}
      style={iconStyles}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: props.svgContent }}
    />
  );
}
Icon.displayName = 'KibaIcon';
