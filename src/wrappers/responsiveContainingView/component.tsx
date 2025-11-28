import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { ResponsiveField } from '../../util';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

const DEFAULT_COLUMN_COUNT = 12;

export const getGridItemSizeCss = (totalColumnCount: number, columnCount: number, baseSize = '100%'): string => {
  return `calc(${baseSize} * ${(columnCount / totalColumnCount).toFixed(1)})`;
};

export interface IResponsiveContainingViewProps extends IWrapperProps {
  columnCount?: number;
  size?: number;
  sizeResponsive?: ResponsiveField<number>;
  isFullWidth?: boolean;
  shouldIncludeMaxSize?: boolean;
  isCenteredHorizontally?: boolean;
}

export function ResponsiveContainingView(props: IResponsiveContainingViewProps): React.ReactElement {
  const isCenteredHorizontally = props.isCenteredHorizontally ?? true;
  const isFullWidth = props.isFullWidth ?? true;
  const shouldIncludeMaxSize = props.shouldIncludeMaxSize ?? true;
  const columnCount = props.columnCount ?? DEFAULT_COLUMN_COUNT;
  if (props.size == null && props.sizeResponsive?.base == null) {
    throw new Error(`One of {size, sizeResponsive.base} must be passed to ${ResponsiveContainingView.displayName}`);
  }
  const sizeField: ResponsiveField<number> = { base: props.size, ...props.sizeResponsive };
  const wrapperStyle: Record<string, string | undefined> = {
    width: isFullWidth ? '100%' : 'auto',
    '--rcv-max-width-base': sizeField.base !== undefined ? getGridItemSizeCss(columnCount, sizeField.base) : undefined,
    '--rcv-max-width-small': sizeField.small !== undefined ? getGridItemSizeCss(columnCount, sizeField.small) : undefined,
    '--rcv-max-width-medium': sizeField.medium !== undefined ? getGridItemSizeCss(columnCount, sizeField.medium) : undefined,
    '--rcv-max-width-large': sizeField.large !== undefined ? getGridItemSizeCss(columnCount, sizeField.large) : undefined,
    '--rcv-max-width-extra-large': sizeField.extraLarge !== undefined ? getGridItemSizeCss(columnCount, sizeField.extraLarge) : undefined,
  };
  if (shouldIncludeMaxSize) {
    const largestColumnCount = sizeField.extraLarge || sizeField.large || sizeField.medium || sizeField.small || sizeField.base || 12;
    wrapperStyle['--rcv-max-width-max'] = getGridItemSizeCss(columnCount, largestColumnCount, 'var(--kiba-screen-width-max)');
  }
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(ResponsiveContainingView.displayName, isCenteredHorizontally && 'centered')}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
ResponsiveContainingView.displayName = 'KibaResponsiveContainingView';
