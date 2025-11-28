import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';

export interface IContainerProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  isFullHeight?: boolean;
  style?: React.CSSProperties;
}

export function Container({
  className = '',
  isFullHeight = true,
  ...props
}: IContainerProps): React.ReactElement {
  return (
    <div
      id={props.id}
      className={getClassName(Container.displayName, className, isFullHeight && 'fullHeight')}
      style={{
        maxWidth: 'var(--kiba-screen-width-max)',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
Container.displayName = 'KibaContainer';
