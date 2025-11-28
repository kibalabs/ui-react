import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';

export { DividerThemedStyle } from '../../util/legacyThemeCompat';

interface IDividerProps extends IComponentProps {
  orientation?: string;
}

export function Divider({
  className = '',
  variant = 'default',
  orientation = 'horizontal',
  ...props
}: IDividerProps): React.ReactElement {
  return (
    <hr
      id={props.id}
      className={getClassName(Divider.displayName, className, orientation, ...(variant?.split('-') || []))}
      style={props.style}
    />
  );
}
Divider.displayName = 'Divider';
