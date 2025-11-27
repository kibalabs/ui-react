import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';

export interface IContainerProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  style?: React.CSSProperties;
}

export function Container({
  className = '',
  isFullHeight = true,
  ...props
}: IContainerProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  return (
    <div
      id={props.id}
      className={getClassName(Container.displayName, className, isFullHeight && 'fullHeight')}
      style={{
        maxWidth: theme.screenWidthMax,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
Container.displayName = 'KibaContainer';
