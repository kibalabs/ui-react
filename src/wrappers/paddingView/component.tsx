import React from 'react';

import { getClassName } from '@kibalabs/core';

import { getPaddingSizeCss, PaddingSizeProp } from '../../particles/dimensions';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IPaddingViewPaddingProps {
  paddingTop?: PaddingSizeProp;
  paddingBottom?: PaddingSizeProp;
  paddingLeft?: PaddingSizeProp;
  paddingRight?: PaddingSizeProp;
  paddingHorizontal?: PaddingSizeProp;
  paddingVertical?: PaddingSizeProp;
  padding?: PaddingSizeProp;
}

export interface IPaddingViewProps extends IWrapperProps, IPaddingViewPaddingProps {
}

export function PaddingView(props: IPaddingViewProps): React.ReactElement {
  const paddingTop = props.paddingTop || props.paddingVertical || props.padding;
  const paddingBottom = props.paddingBottom || props.paddingVertical || props.padding;
  const paddingRight = props.paddingRight || props.paddingHorizontal || props.padding;
  const paddingLeft = props.paddingLeft || props.paddingHorizontal || props.padding;
  const wrapperStyle: React.CSSProperties = {
    ...(paddingTop ? { paddingTop: getPaddingSizeCss(paddingTop) } : {}),
    ...(paddingBottom ? { paddingBottom: getPaddingSizeCss(paddingBottom) } : {}),
    ...(paddingLeft ? { paddingLeft: getPaddingSizeCss(paddingLeft) } : {}),
    ...(paddingRight ? { paddingRight: getPaddingSizeCss(paddingRight) } : {}),
  };
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(PaddingView.displayName)}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
PaddingView.displayName = 'KibaPaddingView';
