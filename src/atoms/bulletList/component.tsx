import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { IBulletTextProps } from '../bulletText';


export interface IBulletListProps extends IComponentProps, IMultiChildProps<IBulletTextProps> {
}

export function BulletList({
  variant = 'default',
  ...props
}: IBulletListProps): React.ReactElement {
  return (
    <ul
      id={props.id}
      className={getClassName(BulletList.displayName, props.className, ...(variant?.split('-') || []))}
      style={props.style}
    >
      {props.children}
    </ul>
  );
}
BulletList.displayName = 'KibaBulletList';
