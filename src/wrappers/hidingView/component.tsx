import React from 'react';

import { getClassName } from '@kibalabs/core';

import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
  isInvisible?: boolean;
}

export function HidingView(props: IHidingViewProps): React.ReactElement {
  const wrapperStyle: React.CSSProperties = {
    ...(props.isHidden ? { display: 'none' } : {}),
    ...(props.isInvisible ? { visibility: 'hidden' } : {}),
  };
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(HidingView.displayName)}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
HidingView.displayName = 'KibaHidingView';
