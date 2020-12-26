import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { getResponsiveCss, ResponsiveField } from '../../util';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';

interface IStyledResponsiveContainingViewProps extends IWrapperProps {
  theme: IDimensionGuide;
  size: ResponsiveField<number>;
  isFullWidth: boolean;
  shouldIncludeMaxSize: boolean;
}

export const getGridItemSizeCss = (totalColumnCount: number, columnCount: number, baseSize = '100%'): string => {
  return `max-width: calc(${baseSize} * ${(columnCount / totalColumnCount).toFixed(1)}) !important;`;
};

const columnCountsToCss = (field: ResponsiveField<number>, theme: IDimensionGuide, shouldIncludeMaxSize?: boolean): string => {
  const output = [];
  if (field?.base !== undefined) {
    output.push(getGridItemSizeCss(theme.columnCount, field.base));
  }
  if (field?.small !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthSmall, getGridItemSizeCss(theme.columnCount, field.small)));
  }
  if (field?.medium !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthMedium, getGridItemSizeCss(theme.columnCount, field.medium)));
  }
  if (field?.large !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthLarge, getGridItemSizeCss(theme.columnCount, field.large)));
  }
  if (field?.extraLarge !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthExtraLarge, getGridItemSizeCss(theme.columnCount, field.extraLarge)));
  }
  if (shouldIncludeMaxSize) {
    const largestColumnCount = field.extraLarge || field.large || field.medium || field.small || field.base;
    output.push(getResponsiveCss(theme.screenWidthMax, getGridItemSizeCss(theme.columnCount, largestColumnCount, theme.screenWidthMax)));
  }
  return output.join('\n');
};

const withResponsiveContainingView = (Component: React.ComponentType<IStyledResponsiveContainingViewProps>): React.ComponentType => styled(Component)<IStyledResponsiveContainingViewProps>`
  max-width: 100%;
  width: ${(props: IStyledResponsiveContainingViewProps): string => (props.isFullWidth ? '100%' : 'auto')};
  ${(props: IStyledResponsiveContainingViewProps): string => columnCountsToCss(props.size, props.theme, props.shouldIncludeMaxSize)};
  /* &.centered {
    margin-right: auto;
    margin-left: auto;
  } */
`;

const StyledResponsiveContainingView = withResponsiveContainingView((props: IStyledResponsiveContainingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div key='defaultChild' />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })));
});

export interface IResponsiveContainingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  size?: number;
  sizeResponsive?: ResponsiveField<number>;
  isFullWidth?: boolean;
  shouldIncludeMaxSize: boolean;
}

export const ResponsiveContainingView = (props: IResponsiveContainingViewProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  return (
    <StyledResponsiveContainingView
      className={getClassName(ResponsiveContainingView.displayName, props.className)}
      theme={theme}
      size={{ base: props.size, ...props.sizeResponsive }}
      isFullWidth={props.isFullWidth}
      shouldIncludeMaxSize={props.shouldIncludeMaxSize}
    >
      {props.children}
    </StyledResponsiveContainingView>
  );
};

ResponsiveContainingView.displayName = 'ResponsiveContainingView';
ResponsiveContainingView.defaultProps = {
  ...defaultWrapperProps,
  isFullWidth: true,
  shouldIncludeMaxSize: true,
};
