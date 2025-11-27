import React from 'react';

import { getClassName } from '@kibalabs/core';

import { getPaddingSize, IDimensionGuide, PaddingSizeProp } from '../../particles/dimensions';
import { useDimensions } from '../../theming';
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
  theme?: IDimensionGuide;
}

export function PaddingView(props: IPaddingViewProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const paddingTop = props.paddingTop || props.paddingVertical || props.padding;
  const paddingBottom = props.paddingBottom || props.paddingVertical || props.padding;
  const paddingRight = props.paddingRight || props.paddingHorizontal || props.padding;
  const paddingLeft = props.paddingLeft || props.paddingHorizontal || props.padding;
  const wrapperStyle: React.CSSProperties = {
    ...(paddingTop ? { paddingTop: getPaddingSize(paddingTop, theme) } : {}),
    ...(paddingBottom ? { paddingBottom: getPaddingSize(paddingBottom, theme) } : {}),
    ...(paddingLeft ? { paddingLeft: getPaddingSize(paddingLeft, theme) } : {}),
    ...(paddingRight ? { paddingRight: getPaddingSize(paddingRight, theme) } : {}),
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
