import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, ISingleAnyChildProps, flattenChildren } from '@kibalabs/core-react';

import { Alignment, getFlexItemAlignment, getFlexContentAlignment } from '../../model';
import { useDimensions } from '../../theming';
import { IDimensionGuide } from '../../subatoms';
import { PaddingView, IPaddingViewPaddingProps } from '../../wrappers/paddingView';
import { ResponsiveField, getResponsiveCss } from '../../util';


export interface IGridItemProps extends ISingleAnyChildProps {
  id?: string;
  className: string;
  isFullHeight: boolean;
  size: number;
  sizeResponsive?: ResponsiveField<number>;
  alignment?: Alignment;
}

class GridItem extends React.Component<IGridItemProps> {
  static defaultProps = {
    className: '',
    isFullHeight: false,
    size: 12,
  };
}

interface IStyledGridProps {
  isFullHeight?: boolean;
  childAlignment: Alignment;
  contentAlignment: Alignment;
}

const StyledGrid = styled.div<IStyledGridProps>`
  height: ${(props: IStyledGridProps): string => (props.isFullHeight ? '100%' : 'auto')};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
  align-items: ${(props: IStyledGridProps): string => getFlexItemAlignment(props.childAlignment)};
  justify-content: ${(props: IStyledGridProps): string => getFlexContentAlignment(props.contentAlignment)};
`;

export interface IGridProps extends IMultiChildProps<IGridItemProps>, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment: Alignment;
  contentAlignment: Alignment;
}

export const Grid = (props: IGridProps): React.ReactElement => {
  const theme = props.theme || useDimensions();
  const children = flattenChildren(props.children).map((child: React.ReactElement, index: number): React.ReactElement<IGridItemProps> => (
    child.type !== GridItem ? <GridItem key={index}>{ child }</GridItem> : child
  ));
  return (
    <PaddingView {...props as IPaddingViewPaddingProps}>
      <StyledGrid
        id={props.id}
        className={getClassName(Grid.displayName, props.className)}
        isFullHeight={props.isFullHeight}
        childAlignment={props.childAlignment}
        contentAlignment={props.contentAlignment}
      >
        { children.map((child: React.ReactElement<IGridItemProps>, index: number): React.ReactElement => (
          <StyledGridItem
            key={index}
            id={child.props.id}
            className={getClassName(StyledGridItem.displayName, child.props.className)}
            theme={theme}
            size={{base: child.props.size, ...child.props.sizeResponsive}}
            isFullHeight={child.props.isFullHeight}
            gutter={props.shouldAddGutters ? theme.gutter : '0px'}
            alignment={child.props.alignment}
          >
            {child.props.children}
          </StyledGridItem>
        ))}
      </StyledGrid>
      </PaddingView>
  );
};

Grid.defaultProps = {
  className: '',
  isFullHeight: true,
  shouldAddGutters: false,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Center,
};
Grid.Item = GridItem;

const getCssSize = (totalColumnCount: number, gutter: string, columnCount: number): string => {
  // TODO(krish): it should be display: unset below (not block) but ie11 doesn't like this. find a nicer way!
  return `width: calc(${(100.0 * columnCount) / totalColumnCount}% - 2 * ${gutter});
    ${columnCount === 0 ? 'display: none' : 'display: block'};
  `;
};

// TODO(krish): this can be consolidated with responsiveUtil.fieldToResponsiveCss with some kind of currying for the above function.
const columnCountsToCss = (field: ResponsiveField<number>, theme: IDimensionGuide, gutter: string): string => {
  const output = [];
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
  gutter: string;
  theme: IDimensionGuide;
  alignment?: Alignment;
  isFullHeight: boolean;
  size: ResponsiveField<number>;
}

const StyledGridItem = styled.div<IStyledGridItemProps>`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  height: ${(props: IStyledGridItemProps): string => (props.isFullHeight ? '100%' : 'auto')};
  ${(props: IStyledGridItemProps): string => columnCountsToCss(props.size, props.theme, props.gutter)};
  overflow-y: ${(props: IStyledGridItemProps): string => (props.isFullHeight ? 'auto' : 'visible')};
  margin-left: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-right: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-top: ${(props: IStyledGridItemProps): string => props.gutter};
  margin-bottom: ${(props: IStyledGridItemProps): string => props.gutter};
  align-self: ${(props: IStyledGridItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
`;
