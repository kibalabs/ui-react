import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { getResponsiveCss, ResponsiveField } from '../../util';
import { IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledResponsiveContainingViewProps extends IWrapperProps {
  $theme: IDimensionGuide;
  $size: ResponsiveField<number>;
  $isFullWidth: boolean;
  $shouldIncludeMaxSize: boolean;
}

export const getGridItemSizeCss = (totalColumnCount: number, columnCount: number, baseSize = '100%'): string => {
  return `max-width: calc(${baseSize} * ${(columnCount / totalColumnCount).toFixed(1)}) !important;`;
};

const columnCountsToCss = (field: ResponsiveField<number>, theme: IDimensionGuide, shouldIncludeMaxSize?: boolean): string => {
  const output: string[] = [];
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
    const largestColumnCount = field.extraLarge || field.large || field.medium || field.small || field.base || 12;
    output.push(getResponsiveCss(theme.screenWidthMax, getGridItemSizeCss(theme.columnCount, largestColumnCount, theme.screenWidthMax)));
  }
  return output.join('\n');
};

const StyledResponsiveContainingView = wrappingComponent((Component: React.ComponentType<IStyledResponsiveContainingViewProps>): React.ComponentType<IStyledResponsiveContainingViewProps> => {
  return styled(Component)<IStyledResponsiveContainingViewProps>`
    max-width: 100%;
    width: ${(props: IStyledResponsiveContainingViewProps): string => (props.$isFullWidth ? '100%' : 'auto')};
    ${(props: IStyledResponsiveContainingViewProps): string => columnCountsToCss(props.$size, props.$theme, props.$shouldIncludeMaxSize)};
    &.centered {
      margin-right: auto;
      margin-left: auto;
    }
  `;
});

export interface IResponsiveContainingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  size?: number;
  sizeResponsive?: ResponsiveField<number>;
  isFullWidth?: boolean;
  shouldIncludeMaxSize?: boolean;
  isCenteredHorizontally?: boolean;
}

export function ResponsiveContainingView({
  className = '',
  isCenteredHorizontally = true,
  ...props
}: IResponsiveContainingViewProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const isFullWidth = props.isFullWidth === true || props.isFullWidth == null;
  const shouldIncludeMaxSize = props.shouldIncludeMaxSize === true || props.shouldIncludeMaxSize == null;
  if (props.size == null && props.sizeResponsive?.base == null) {
    throw new Error(`One of {size, sizeResponsive.base} must be passed to ${ResponsiveContainingView.displayName}`);
  }
  return (
    <StyledResponsiveContainingView
      className={getClassName(ResponsiveContainingView.displayName, className, isCenteredHorizontally && 'centered')}
      $theme={theme}
      $size={{ base: props.size, ...props.sizeResponsive }}
      $isFullWidth={isFullWidth}
      $shouldIncludeMaxSize={shouldIncludeMaxSize}
    >
      {props.children}
    </StyledResponsiveContainingView>
  );
}
ResponsiveContainingView.displayName = 'KibaResponsiveContainingView';
