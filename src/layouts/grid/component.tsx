import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiChildProps, IOptionalSingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { Alignment, getFlexContentAlignment, getFlexItemAlignment, PaddingSize, PaddingSizeProp } from '../..';
import { getPaddingSize, IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { ResponsiveField } from '../../util';
import { IPaddingViewPaddingProps, PaddingView } from '../../wrappers/paddingView';

export interface IGridItemProps extends IOptionalSingleAnyChildProps {
  id?: string;
  className?: string;
  isFullHeight?: boolean;
  size?: number;
  sizeResponsive?: ResponsiveField<number>;
  alignment?: Alignment;
  style?: React.CSSProperties;
}

export function GridItem(props: IGridItemProps): React.ReactElement {
  return <React.Fragment />;
}
GridItem.displayName = 'KibaGridItem';

export interface IGridProps extends IMultiChildProps<IGridItemProps>, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  defaultGutter?: PaddingSizeProp;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  style?: React.CSSProperties;
}

const getItemWidth = (columnCount: number, size: number, gutter: string): string => {
  return `calc(${(100.0 * size) / columnCount}% - 2 * ${gutter})`;
};

const getItemDisplay = (size: number): string => {
  return size === 0 ? 'none' : 'flex';
};

export function Grid({
  className = '',
  isFullHeight = true,
  shouldAddGutters = false,
  childAlignment = Alignment.Fill,
  contentAlignment = Alignment.Center,
  ...props
}: IGridProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  const defaultGutter = props.defaultGutter || PaddingSize.Default;
  const innerShouldAddGutters = shouldAddGutters && defaultGutter !== PaddingSize.None;
  const gutter = innerShouldAddGutters ? getPaddingSize(defaultGutter, theme) : '0px';
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number), index: number): React.ReactElement<IGridItemProps> => (
    typeof child === 'object' && 'type' in child && child.type === GridItem ? child : <GridItem key={index}>{child}</GridItem>
  ));
  const gridStyles: React.CSSProperties = {
    ...props.style,
    // @ts-expect-error CSS custom properties
    '--kiba-grid-height': isFullHeight ? '100%' : 'auto',
    '--kiba-grid-child-alignment': getFlexItemAlignment(childAlignment),
    '--kiba-grid-content-alignment': getFlexContentAlignment(contentAlignment),
  };
  return (
    <PaddingView className={className} {...props as IPaddingViewPaddingProps}>
      <div
        id={props.id}
        className={getClassName(Grid.displayName, className)}
        style={gridStyles}
      >
        {children.map((child: React.ReactElement<IGridItemProps>): React.ReactElement => {
          const size = child.props.size ?? 12;
          const sizeResponsive = child.props.sizeResponsive ?? {};
          const itemStyles: React.CSSProperties = {
            ...child.props.style,
            // @ts-expect-error CSS custom properties
            '--kiba-grid-item-gutter': gutter,
            '--kiba-grid-item-alignment': child.props.alignment ? getFlexItemAlignment(child.props.alignment) : 'auto',
            '--kiba-grid-item-width': getItemWidth(theme.columnCount, size, gutter),
            '--kiba-grid-item-display': getItemDisplay(size),
            ...(child.props.isFullHeight ? {
              '--kiba-grid-item-height': '100%',
              '--kiba-grid-item-overflow-y': 'auto',
            } : {}),
            ...(sizeResponsive.small !== undefined ? {
              '--kiba-grid-item-width-sm': getItemWidth(theme.columnCount, sizeResponsive.small, gutter),
              '--kiba-grid-item-display-sm': getItemDisplay(sizeResponsive.small),
            } : {}),
            ...(sizeResponsive.medium !== undefined ? {
              '--kiba-grid-item-width-md': getItemWidth(theme.columnCount, sizeResponsive.medium, gutter),
              '--kiba-grid-item-display-md': getItemDisplay(sizeResponsive.medium),
            } : {}),
            ...(sizeResponsive.large !== undefined ? {
              '--kiba-grid-item-width-lg': getItemWidth(theme.columnCount, sizeResponsive.large, gutter),
              '--kiba-grid-item-display-lg': getItemDisplay(sizeResponsive.large),
            } : {}),
            ...(sizeResponsive.extraLarge !== undefined ? {
              '--kiba-grid-item-width-xl': getItemWidth(theme.columnCount, sizeResponsive.extraLarge, gutter),
              '--kiba-grid-item-display-xl': getItemDisplay(sizeResponsive.extraLarge),
            } : {}),
          };
          return (
            <div
              key={child.key}
              id={child.props.id}
              className={getClassName('KibaGridItem', child.props.className)}
              style={itemStyles}
            >
              {child.props.children}
            </div>
          );
        })}
      </div>
    </PaddingView>
  );
}
Grid.displayName = 'KibaGrid';
Grid.Item = GridItem;
