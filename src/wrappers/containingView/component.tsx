import React from 'react';

import { getClassName } from '@kibalabs/core';

import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IContainingViewProps extends IWrapperProps {
  isCenteredHorizontally?: boolean;
  maxWidth?: string;
}

export function ContainingView(props: IContainingViewProps): React.ReactElement {
  const isCenteredHorizontally = props.isCenteredHorizontally ?? true;
  const wrapperStyle: React.CSSProperties = {
    maxWidth: props.maxWidth ?? 'var(--kiba-screen-width-max)',
    width: '100%',
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
