import React from 'react';

import { getClassName } from '@kibalabs/core';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IContainingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  isCenteredHorizontally?: boolean;
}

export function ContainingView(props: IContainingViewProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const isCenteredHorizontally = props.isCenteredHorizontally ?? true;
  const wrapperStyle: React.CSSProperties = {
    maxWidth: theme.screenWidthMax,
    width: '100%',
    overflow: 'auto',
    ...(isCenteredHorizontally ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
  };
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(ContainingView.displayName, isCenteredHorizontally && 'centered')}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
ContainingView.displayName = 'KibaContainingView';
