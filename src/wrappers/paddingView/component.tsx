import React from 'react';

import { getClassName } from '@kibalabs/core';
import { styled } from 'styled-components';

import { getPaddingSize, IDimensionGuide, PaddingSizeProp } from '../../particles/dimensions';
import { useDimensions } from '../../theming';
import { IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

export interface IPaddingViewPaddingProps {
  paddingTop?: PaddingSizeProp;
  paddingBottom?: PaddingSizeProp;
  paddingLeft?: PaddingSizeProp;
  paddingRight?: PaddingSizeProp;
  paddingHorizontal?: PaddingSizeProp;
  paddingVertical?: PaddingSizeProp;
  padding?: PaddingSizeProp;
}

interface IStyledPaddingViewProps extends IWrapperProps {
  $theme: IDimensionGuide;
  $paddingTop?: PaddingSizeProp;
  $paddingBottom?: PaddingSizeProp;
  $paddingLeft?: PaddingSizeProp;
  $paddingRight?: PaddingSizeProp;
}

const StyledPaddingView = wrappingComponent((Component: React.ComponentType<IStyledPaddingViewProps>): React.ComponentType<IStyledPaddingViewProps> => {
  return styled(Component)<IStyledPaddingViewProps>`
    ${(props: IStyledPaddingViewProps): string => (props.$paddingTop ? `padding-top: ${getPaddingSize(props.$paddingTop, props.$theme)}` : '')};
    ${(props: IStyledPaddingViewProps): string => (props.$paddingBottom ? `padding-bottom: ${getPaddingSize(props.$paddingBottom, props.$theme)}` : '')};
    ${(props: IStyledPaddingViewProps): string => (props.$paddingLeft ? `padding-left: ${getPaddingSize(props.$paddingLeft, props.$theme)}` : '')};
    ${(props: IStyledPaddingViewProps): string => (props.$paddingRight ? `padding-right: ${getPaddingSize(props.$paddingRight, props.$theme)}` : '')};
  `;
});

export interface IPaddingViewProps extends IWrapperProps, IPaddingViewPaddingProps {
  theme?: IDimensionGuide;
}

export function PaddingView({
  className = '',
  ...props
}: IPaddingViewProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const paddingTop = props.paddingTop || props.paddingVertical || props.padding;
  const paddingBottom = props.paddingBottom || props.paddingVertical || props.padding;
  const paddingRight = props.paddingRight || props.paddingHorizontal || props.padding;
  const paddingLeft = props.paddingLeft || props.paddingHorizontal || props.padding;
  return (
    <StyledPaddingView
      className={getClassName(PaddingView.displayName, className)}
      $theme={theme}
      $paddingTop={paddingTop}
      $paddingBottom={paddingBottom}
      $paddingRight={paddingRight}
      $paddingLeft={paddingLeft}
    >
      {props.children}
    </StyledPaddingView>
  );
}
PaddingView.displayName = 'KibaPaddingView';
