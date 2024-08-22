import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiChildProps, IOptionalSingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Alignment, getFlexContentAlignment, getFlexItemAlignment, PaddingSize, PaddingSizeProp } from '../..';
import { getPaddingSize, IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { getResponsiveCss, ResponsiveField } from '../../util';
import { IPaddingViewPaddingProps, PaddingView } from '../../wrappers/paddingView';


export interface IGridItemProps extends IOptionalSingleAnyChildProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  isFullHeight?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  size?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  sizeResponsive?: ResponsiveField<number>;
  // eslint-disable-next-line react/no-unused-prop-types
  alignment?: Alignment;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function GridItem(props: IGridItemProps): React.ReactElement {
  return (
    <React.Fragment />
  );
}
GridItem.displayName = 'KibaGridItem';

interface IStyledGridProps {
  $isFullHeight?: boolean;
  $childAlignment: Alignment;
  $contentAlignment: Alignment;
}

const StyledGrid = styled.div<IStyledGridProps>`
  height: ${(props: IStyledGridProps): string => (props.$isFullHeight ? '100%' : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
  align-items: ${(props: IStyledGridProps): string => getFlexItemAlignment(props.$childAlignment)};
  justify-content: ${(props: IStyledGridProps): string => getFlexContentAlignment(props.$contentAlignment)};
`;

export interface IGridProps extends IMultiChildProps<IGridItemProps>, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  defaultGutter?: PaddingSizeProp;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
}

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

  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number), index: number): React.ReactElement<IGridItemProps> => (
    // eslint-disable-next-line react/no-array-index-key
    typeof child === 'object' && 'type' in child && child.type === GridItem ? child : <GridItem key={index}>{ child }</GridItem>
  ));
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PaddingView className={className} {...props as IPaddingViewPaddingProps}>
      <StyledGrid
        id={props.id}
        className={getClassName(Grid.displayName, className)}
        $isFullHeight={isFullHeight}
        $childAlignment={childAlignment}
        $contentAlignment={contentAlignment}
      >
        { children.map((child: React.ReactElement<IGridItemProps>): React.ReactElement => (
          <StyledGridItem
            key={child.key}
            id={child.props.id}
            className={getClassName(StyledGridItem.displayName, child.props.className)}
            $theme={theme}
            $size={{ base: child.props.size || 12, ...child.props.sizeResponsive }}
            $isFullHeight={child.props.isFullHeight || false}
            $gutter={innerShouldAddGutters ? getPaddingSize(defaultGutter, theme) : '0px'}
            $alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledGridItem>
        ))}
      </StyledGrid>
    </PaddingView>
  );
}
Grid.displayName = 'KibaGrid';
Grid.Item = GridItem;

const getCssSize = (totalColumnCount: number, gutter: string, columnCount: number): string => {
  return `
    width: calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutter});
    ${columnCount === 0 ? 'display: none' : 'display: flex'};
  `;
};

// TODO(krishan711): this can be consolidated with responsiveUtil.fieldToResponsiveCss with some kind of currying for the above function.
const columnCountsToCss = (field: ResponsiveField<number>, theme: IDimensionGuide, gutter: string): string => {
  const output: string[] = [];
  if (field?.base !== undefined) {
    output.push(getCssSize(theme.columnCount, gutter, field.base));
  }
  if (field?.small !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthSmall, getCssSize(theme.columnCount, gutter, field.small)));
  }
  if (field?.medium !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthMedium, getCssSize(theme.columnCount, gutter, field.medium)));
  }
  if (field?.large !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthLarge, getCssSize(theme.columnCount, gutter, field.large)));
  }
  if (field?.extraLarge !== undefined) {
    output.push(getResponsiveCss(theme.screenWidthExtraLarge, getCssSize(theme.columnCount, gutter, field.extraLarge)));
  }
  return output.join('\n');
};

interface IStyledGridItemProps {
  $gutter: string;
  $theme: IDimensionGuide;
  $alignment?: Alignment;
  $isFullHeight: boolean;
  $size: ResponsiveField<number>;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  height: ${(props: IStyledGridItemProps): string => (props.$isFullHeight ? '100%' : 'auto')};
  ${(props: IStyledGridItemProps): string => columnCountsToCss(props.$size, props.$theme, props.$gutter)};
  overflow-y: ${(props: IStyledGridItemProps): string => (props.$isFullHeight ? 'auto' : 'visible')};
  margin-left: ${(props: IStyledGridItemProps): string => props.$gutter};
  margin-right: ${(props: IStyledGridItemProps): string => props.$gutter};
  margin-top: ${(props: IStyledGridItemProps): string => props.$gutter};
  margin-bottom: ${(props: IStyledGridItemProps): string => props.$gutter};
  align-self: ${(props: IStyledGridItemProps): string => (props.$alignment ? getFlexItemAlignment(props.$alignment) : 'auto')};
`;
