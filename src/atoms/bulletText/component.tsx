import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IOptionalSingleChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { IBulletListProps } from '../bulletList';

export { BulletTextThemedStyle } from '../../util/legacyThemeCompat';

export interface IBulletTextProps extends IComponentProps, IOptionalSingleChildProps<IBulletListProps> {
  text: string;
}

export function BulletText({
  text,
  variant = 'default',
  ...props
}: IBulletTextProps): React.ReactElement {
  return (
    <li
      id={props.id}
      className={getClassName(BulletText.displayName, props.className, ...(variant?.split('-') || []))}
      style={props.style}
    >
      {text}
      {props.children}
    </li>
  );
}
BulletText.displayName = 'KibaBulletText';
