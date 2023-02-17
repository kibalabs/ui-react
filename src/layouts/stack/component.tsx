import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, IOptionalSingleAnyChildProps, ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Alignment, Direction, getFlexContentAlignment, getFlexItemAlignment, IDimensionGuide, PaddingSize, PaddingSizeProp, Spacing } from '../..';
import { useDimensions } from '../../theming';
import { CssConverter, fieldToResponsiveCss, ResponsiveField } from '../../util';
import { IPaddingViewPaddingProps, PaddingView } from '../../wrappers/paddingView';
import { wrappingComponent } from '../../wrappers/wrappingComponent';

// NOTE(krishan711): if the child of the stack.item declares 100% height (on vertical stack) it doesn't work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)
// NOTE(krishan711): behavior of the above is also different on IE11, be careful!

const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
};

const getChildAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `align-items: ${getFlexItemAlignment(field)};`;
};

const getDirectionCss: CssConverter<Direction> = (field: Direction): string => {
  return `flex-direction: ${field === Direction.Vertical ? 'column' : 'row'};`;
};

export interface IStackItemProps extends IOptionalSingleAnyChildProps {
  className?: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  isHidden: boolean;
  alignment?: Alignment;
  gutterBefore?: PaddingSizeProp;
  gutterAfter?: PaddingSizeProp;
  shouldShrinkBelowContentSize?: boolean;
}

class StackItem extends React.Component<IStackItemProps> {
  static defaultProps = {
    className: '',
    growthFactor: 0,
    shrinkFactor: 0,
    // NOTE(krishan711): see note above
    baseSize: 'auto',
    isHidden: false,
  };
}

interface IStyledStackProps {
  $theme: IDimensionGuide;
  $height: ResponsiveField<string>;
  $width: ResponsiveField<string>;
  $maxHeight: ResponsiveField<string> | null;
  $maxWidth: ResponsiveField<string> | null;
  $minHeight: ResponsiveField<string> | null;
  $minWidth: ResponsiveField<string> | null;
  $direction: ResponsiveField<Direction>;
  $childAlignment: ResponsiveField<Alignment>;
  $contentAlignment: ResponsiveField<Alignment>;
}

const getCss = (fieldName: string): CssConverter<string> => {
  return (value: string): string => `${fieldName}: ${value};`;
};

// width: ${(props: IStyledStackProps): string => (props.$isFullWidth ? '100%' : 'auto')};
// min-width: ${(props: IStyledStackProps): string => (props.$isFullWidth ? 'inherit' : 'auto')};
// height: ${(props: IStyledStackProps): string => (props.$isFullHeight ? '100%' : 'auto')};
// min-height: ${(props: IStyledStackProps): string => (props.$isFullHeight ? 'inherit' : 'auto')};
const StyledStack = styled.div<IStyledStackProps>`
  display: flex;
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$height, props.$theme, getCss('height'))};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$width, props.$theme, getCss('width'))};
  ${(props: IStyledStackProps): string => (props.$maxHeight ? fieldToResponsiveCss(props.$maxHeight, props.$theme, getCss('max-height')) : '')};
  ${(props: IStyledStackProps): string => (props.$maxWidth ? fieldToResponsiveCss(props.$maxWidth, props.$theme, getCss('max-width')) : '')};
  ${(props: IStyledStackProps): string => (props.$minHeight ? fieldToResponsiveCss(props.$minHeight, props.$theme, getCss('min-height')) : '')};
  ${(props: IStyledStackProps): string => (props.$minWidth ? fieldToResponsiveCss(props.$minWidth, props.$theme, getCss('min-width')) : '')};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$direction, props.$theme, getDirectionCss)};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$childAlignment, props.$theme, getChildAlignmentCss)};
  ${(props: IStyledStackProps): string => fieldToResponsiveCss(props.$contentAlignment, props.$theme, getContentAlignmentCss)};

  &.scrollableVertically {
    overflow-y: auto;
  }

  &.scrollableHorizontally {
    overflow-x: auto;
  }

  &.wrapItems {
    flex-wrap: wrap;
    /* NOTE(krishan711): this only works for Chrome>84 and similar. It does not work for IE or safari: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap */
    row-gap: ${(props: IStyledStackProps): string => props.$theme.gutter}
  }
`;

// NOTE(krishan711): the height and width stuff is copied from box, find a way to merge these?
interface IStackProps extends IMultiAnyChildProps, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  shouldAddGutters: boolean;
  defaultGutter?: PaddingSizeProp;
  isScrollableVertically: boolean;
  isScrollableHorizontally: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
  height?: string;
  heightResponsive?: ResponsiveField<string>;
  width?: string;
  widthResponsive?: ResponsiveField<string>;
  maxHeight?: string;
  maxHeightResponsive?: ResponsiveField<string>;
  maxWidth?: string;
  maxWidthResponsive?: ResponsiveField<string>;
  minHeight?: string;
  minHeightResponsive?: ResponsiveField<string>;
  minWidth?: string;
  minWidthResponsive?: ResponsiveField<string>;
  paddingStart?: PaddingSizeProp,
  paddingEnd?: PaddingSizeProp,
  direction: Direction;
  directionResponsive?: ResponsiveField<Direction>;
  childAlignment: Alignment;
  childAlignmentResponsive?: ResponsiveField<Alignment>;
  contentAlignment: Alignment;
  contentAlignmentResponsive?: ResponsiveField<Alignment>;
  shouldWrapItems?: boolean;
}

export const Stack = (props: IStackProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  const children = flattenChildren(props.children).map((child: React.ReactChild, index: number): React.ReactElement<IStackItemProps> => (
    typeof child === 'object' && 'type' in child && child.type === StackItem ? child : <StackItem key={index}>{ child }</StackItem>
  ));
  const paddingTop = (props.paddingStart && props.direction === Direction.Vertical) ? props.paddingStart : undefined;
  const paddingBottom = (props.paddingEnd && props.direction === Direction.Vertical) ? props.paddingEnd : undefined;
  const paddingRight = (props.paddingStart && props.direction === Direction.Horizontal) ? props.paddingStart : undefined;
  const paddingLeft = (props.paddingEnd && props.direction === Direction.Horizontal) ? props.paddingEnd : undefined;

  const height = props.height || (props.isFullHeight ? '100%' : 'auto');
  const width = props.width || (props.isFullWidth ? '100%' : 'auto');
  const maxHeight = props.maxHeight ?? null;
  const maxWidth = props.maxWidth ?? null;
  const minHeight = props.minHeight ?? null;
  const minWidth = props.minWidth ?? null;

  const maxHeightResponsive = props.maxHeightResponsive || maxHeight ? { base: (maxHeight || undefined), ...props.maxHeightResponsive } : null;
  const maxWidthResponsive = props.maxWidthResponsive || maxWidth ? { base: (maxWidth || undefined), ...props.maxWidthResponsive } : null;
  const minHeightResponsive = props.minHeightResponsive || minHeight ? { base: (minHeight || undefined), ...props.minHeightResponsive } : null;
  const minWidthResponsive = props.minWidthResponsive || minWidth ? { base: (minWidth || undefined), ...props.minWidthResponsive } : null;

  const defaultGutter = props.defaultGutter || PaddingSize.Default;
  const shouldAddGutters = props.shouldAddGutters && defaultGutter !== PaddingSize.None;
  const shouldWrapItems = props.shouldWrapItems || false;
  return (
    <PaddingView paddingTop={paddingTop} paddingBottom={paddingBottom} paddingRight={paddingRight} paddingLeft={paddingLeft} {...props as IPaddingViewPaddingProps}>
      <StyledStack
        id={props.id}
        className={getClassName(Stack.displayName, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally', shouldWrapItems && 'wrapItems')}
        $theme={theme}
        $direction={{ base: props.direction, ...props.directionResponsive }}
        $childAlignment={{ base: props.childAlignment, ...props.childAlignmentResponsive }}
        $contentAlignment={{ base: props.contentAlignment, ...props.contentAlignmentResponsive }}
        $height={{ base: height, ...props.heightResponsive }}
        $width={{ base: width, ...props.widthResponsive }}
        $maxHeight={maxHeightResponsive}
        $maxWidth={maxWidthResponsive}
        $minHeight={minHeightResponsive}
        $minWidth={minWidthResponsive}
      >
        { children.map((child: React.ReactElement, index: number): React.ReactElement<IStackItemProps> => (
          <React.Fragment key={index}>
            {child.props.gutterBefore && (
              <Spacing className='stack-gutter' variant={child.props.gutterBefore} />
            )}
            <StyledStackItem
              className={getClassName(StyledStackItem.displayName, child.props.isHidden && 'isHidden')}
              growthFactor={child.props.growthFactor}
              shrinkFactor={child.props.shrinkFactor}
              baseSize={child.props.baseSize}
              alignment={child.props.alignment}
              // NOTE(krishan711): ideally the mins should only be 0 in the correct direction but we can't know the direction in a responsive way
              minWidth={child.props.shrinkFactor && child.props.shouldShrinkBelowContentSize ? '0' : 'auto'}
              minHeight={child.props.shrinkFactor && child.props.shouldShrinkBelowContentSize ? '0' : 'auto'}
            >
              {React.Children.count(child.props.children) > 0 ? child.props.children : <div />}
            </StyledStackItem>
            {(child.props.gutterAfter || (shouldAddGutters && index < children.length - 1)) && (
              <Spacing className='stack-gutter' variant={child.props.gutterAfter || defaultGutter} />
            )}
          </React.Fragment>
        ))}
      </StyledStack>
    </PaddingView>
  );
};

Stack.displayName = 'Stack';
Stack.defaultProps = {
  className: '',
  direction: Direction.Vertical,
  childAlignment: Alignment.Fill,
  contentAlignment: Alignment.Fill,
  shouldAddGutters: false,
  isFullWidth: false,
  isFullHeight: false,
  isScrollableVertically: false,
  isScrollableHorizontally: false,
};
Stack.Item = StackItem;

interface IStyledStackItemProps extends ISingleAnyChildProps {
  className?: string;
  growthFactor: number;
  shrinkFactor: number;
  baseSize: string;
  alignment?: Alignment;
  minWidth: string;
  minHeight: string;
}

const StyledStackItem = wrappingComponent((Component: React.ComponentType<IStyledStackItemProps>): React.ComponentType<IStyledStackItemProps> => {
  return styled(Component)<IStyledStackItemProps>`
    flex-basis: ${(props: IStyledStackItemProps): string => props.baseSize};
    flex-grow: ${(props: IStyledStackItemProps): number => props.growthFactor};
    flex-shrink: ${(props: IStyledStackItemProps): number => props.shrinkFactor};
    min-width: ${(props: IStyledStackItemProps): string => props.minWidth};
    min-height: ${(props: IStyledStackItemProps): string => props.minHeight};
    align-self: ${(props: IStyledStackItemProps): string => (props.alignment ? getFlexItemAlignment(props.alignment) : 'auto')};
    /* Fix for https://github.com/philipwalton/flexbugs#flexbug-2 */
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      /* IE 10+ */
      max-width: 100%;
    }
    &.isHidden {
      display: none;
    }
  `;
});
