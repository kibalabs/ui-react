import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { getScreenSize, IDimensionGuide, ScreenSize } from '../../particles/dimensions';
import { useDimensions } from '../../theming';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';

interface IStyledResponsiveHidingViewProps extends IWrapperProps {
  hiddenAboveSize?: string;
  hiddenBelowSize?: string;
}

const withResponsiveHidingView = (Component: React.ComponentType<IStyledResponsiveHidingViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveHidingViewProps>`
  ${(props: IStyledResponsiveHidingViewProps): string => (props.hiddenAboveSize ? `@media (min-width: ${props.hiddenAboveSize}) {display: none !important;}` : '')};
  ${(props: IStyledResponsiveHidingViewProps): string => (props.hiddenBelowSize ? `@media not all and (min-width: ${props.hiddenBelowSize}) {display: none !important;}` : '')};
`;

const StyledResponsiveHidingView = withResponsiveHidingView((props: IStyledResponsiveHidingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div key='defaultChild' />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })));
});

export interface IResponsiveHidingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  hiddenAbove?: ScreenSize;
  hiddenBelow?: ScreenSize;
}

export const ResponsiveHidingView = (props: IResponsiveHidingViewProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  return (
    <StyledResponsiveHidingView
      className={getClassName(ResponsiveHidingView.displayName, props.className)}
      hiddenAboveSize={props.hiddenAbove && getScreenSize(props.hiddenAbove, theme)}
      hiddenBelowSize={props.hiddenBelow && getScreenSize(props.hiddenBelow, theme)}
    >
      {props.children}
    </StyledResponsiveHidingView>
  );
};

ResponsiveHidingView.displayName = 'ResponsiveHidingView';
ResponsiveHidingView.defaultProps = {
  ...defaultWrapperProps,
};
