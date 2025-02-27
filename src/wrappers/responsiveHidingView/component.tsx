import React from 'react';

import { getClassName } from '@kibalabs/core';
import { styled } from 'styled-components';

import { getScreenSize, IDimensionGuide, ScreenSize } from '../../particles/dimensions';
import { useDimensions } from '../../theming';
import { IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledResponsiveHidingViewProps extends IWrapperProps {
  $hiddenAboveSize?: string;
  $hiddenBelowSize?: string;
}

const StyledResponsiveHidingView = wrappingComponent((Component: React.ComponentType<IStyledResponsiveHidingViewProps>): React.ComponentType<IStyledResponsiveHidingViewProps> => {
  return styled(Component)<IStyledResponsiveHidingViewProps>`
    ${(props: IStyledResponsiveHidingViewProps): string => (props.$hiddenAboveSize ? `@media (min-width: ${props.$hiddenAboveSize}) {display: none !important;}` : '')};
    ${(props: IStyledResponsiveHidingViewProps): string => (props.$hiddenBelowSize ? `@media not all and (min-width: ${props.$hiddenBelowSize}) {display: none !important;}` : '')};
  `;
});

export interface IResponsiveHidingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  hiddenAbove?: ScreenSize;
  hiddenBelow?: ScreenSize;
}

export function ResponsiveHidingView({
  className = '',
  ...props
}: IResponsiveHidingViewProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  return (
    <StyledResponsiveHidingView
      className={getClassName(ResponsiveHidingView.displayName, className)}
      $hiddenAboveSize={props.hiddenAbove && getScreenSize(props.hiddenAbove, theme)}
      $hiddenBelowSize={props.hiddenBelow && getScreenSize(props.hiddenBelow, theme)}
    >
      {props.children}
    </StyledResponsiveHidingView>
  );
}
ResponsiveHidingView.displayName = 'KibaResponsiveHidingView';
