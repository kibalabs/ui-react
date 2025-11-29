import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../..';


interface ILoadingSpinnerProps extends IComponentProps {
}

export function LoadingSpinner({
  className = '',
  variant = 'default',
  ...props
}: ILoadingSpinnerProps): React.ReactElement {
  return (
    <div
      id={props.id}
      className={getClassName(LoadingSpinner.displayName, className, ...(variant?.split('-') || []))}
      style={props.style}
    />
  );
}
LoadingSpinner.displayName = 'KibaLoadingSpinner';
