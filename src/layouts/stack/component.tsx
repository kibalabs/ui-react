import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, IOptionalSingleAnyChildProps } from '@kibalabs/core-react';

import { Alignment, Direction, getFlexContentAlignment, getFlexItemAlignment, getPaddingSizeCss, PaddingSize, PaddingSizeProp, Spacing } from '../..';
import { CssConverter, ResponsiveField, responsiveValueToCss } from '../../util';
import { IPaddingViewPaddingProps, PaddingView } from '../../wrappers/paddingView';

import './styles.scss';

// NOTE(krishan711): if the child of the stack.item declares 100% height (on vertical stack) it doesn't work on safari unless it has flex-basis: 0 (https://github.com/philipwalton/flexbugs/issues/197)

export interface IStackItemProps extends IOptionalSingleAnyChildProps {
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  growthFactor?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  shrinkFactor?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  baseSize?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  isHidden?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  alignment?: Alignment;
  // eslint-disable-next-line react/no-unused-prop-types
  gutterBefore?: PaddingSizeProp;
  // eslint-disable-next-line react/no-unused-prop-types
  gutterAfter?: PaddingSizeProp;
  // eslint-disable-next-line react/no-unused-prop-types
  shouldShrinkBelowContentSize?: boolean;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export function StackItem(props: IStackItemProps): React.ReactElement {
  return <React.Fragment />;
}
StackItem.displayName = 'KibaStackItem';

interface IStackProps extends IMultiAnyChildProps, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  shouldAddGutters?: boolean;
  defaultGutter?: PaddingSizeProp;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
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
  direction?: Direction;
  directionResponsive?: ResponsiveField<Direction>;
  childAlignment?: Alignment;
  childAlignmentResponsive?: ResponsiveField<Alignment>;
  contentAlignment?: Alignment;
  contentAlignmentResponsive?: ResponsiveField<Alignment>;
  shouldWrapItems?: boolean;
}

const getDirectionValue: CssConverter<Direction> = (value: Direction): string => {
  return value === Direction.Horizontal ? 'row' : 'column';
};

function renderStackItemChildren(
  children: React.ReactNode,
  itemProps: IStackItemProps,
): React.ReactNode {
  const growthFactor = itemProps.growthFactor ?? 0;
  const shrinkFactor = itemProps.shrinkFactor ?? 0;
  const baseSize = itemProps.baseSize ?? 'auto';
  const minWidth = shrinkFactor && itemProps.shouldShrinkBelowContentSize ? '0' : 'auto';
  const minHeight = shrinkFactor && itemProps.shouldShrinkBelowContentSize ? '0' : 'auto';
  const alignSelf = itemProps.alignment ? getFlexItemAlignment(itemProps.alignment) : 'auto';
  const itemStyle: React.CSSProperties = {
    flexBasis: baseSize,
    flexGrow: growthFactor,
    flexShrink: shrinkFactor,
    minWidth,
    minHeight,
    alignSelf,
    ...(itemProps.isHidden ? { display: 'none' } : {}),
  };
  const itemClassName = getClassName(itemProps.className, 'KibaStackItem');
  const flatChildren = flattenChildren(children);
  if (flatChildren.length === 0) {
    return <div style={itemStyle} className={itemClassName} />;
  }
  return flatChildren.map((child: React.ReactElement | string | number, index: number): React.ReactNode => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const existingStyle = (child.props as { style?: React.CSSProperties }).style ?? {};
    const existingClassName = (child.props as { className?: string }).className ?? '';
    // itemStyle comes after existingStyle so Stack.Item flex properties (from itemStyle) take precedence over child's existing styles
    return React.cloneElement(child, {
      key: child.key ?? index,
      style: { ...existingStyle, ...itemStyle },
      className: getClassName(existingClassName, itemClassName),
    } as React.HTMLAttributes<HTMLElement>);
  });
}

export function Stack({
  className = '',
  direction = Direction.Vertical,
  childAlignment = Alignment.Fill,
  contentAlignment = Alignment.Fill,
  shouldAddGutters = false,
  isFullWidth = false,
  isFullHeight = false,
  isScrollableVertically = false,
  isScrollableHorizontally = false,
  ...props
}: IStackProps): React.ReactElement {
  const isStackItem = (child: React.ReactElement | string | number): boolean => {
    if (typeof child !== 'object' || !('type' in child)) {
      return false;
    }
    // Check by reference first
    if (child.type === StackItem) {
      return true;
    }
    // Fallback: check by displayName for cases where the reference might differ
    const childType = child.type as { displayName?: string };
    return childType?.displayName === 'KibaStackItem';
  };
  const children = flattenChildren(props.children).map((child: (React.ReactElement | string | number), index: number): React.ReactElement<IStackItemProps> => (
    // eslint-disable-next-line react/no-array-index-key
    isStackItem(child) ? child as React.ReactElement<IStackItemProps> : <StackItem key={`child-${index}`}>{ child }</StackItem>
  ));
  const paddingTop = (props.paddingStart && direction === Direction.Vertical) ? props.paddingStart : undefined;
  const paddingBottom = (props.paddingEnd && direction === Direction.Vertical) ? props.paddingEnd : undefined;
  const paddingLeft = (props.paddingStart && direction === Direction.Horizontal) ? props.paddingStart : undefined;
  const paddingRight = (props.paddingEnd && direction === Direction.Horizontal) ? props.paddingEnd : undefined;
  const height = props.height ?? props.heightResponsive?.base ?? (isFullHeight ? '100%' : 'auto');
  const width = props.width ?? props.widthResponsive?.base ?? (isFullWidth ? '100%' : 'auto');
  const maxHeight = props.maxHeight ?? props.maxHeightResponsive?.base ?? null;
  const maxWidth = props.maxWidth ?? props.maxWidthResponsive?.base ?? null;
  const minHeight = props.minHeight ?? props.minHeightResponsive?.base ?? null;
  const minWidth = props.minWidth ?? props.minWidthResponsive?.base ?? null;
  const maxHeightResponsive = props.maxHeightResponsive || maxHeight ? { base: (maxHeight || undefined), ...props.maxHeightResponsive } : null;
  const maxWidthResponsive = props.maxWidthResponsive || maxWidth ? { base: (maxWidth || undefined), ...props.maxWidthResponsive } : null;
  const minHeightResponsive = props.minHeightResponsive || minHeight ? { base: (minHeight || undefined), ...props.minHeightResponsive } : null;
  const minWidthResponsive = props.minWidthResponsive || minWidth ? { base: (minWidth || undefined), ...props.minWidthResponsive } : null;
  const defaultGutter = props.defaultGutter || PaddingSize.Default;
  const innerShouldAddGutters = shouldAddGutters && defaultGutter !== PaddingSize.None;
  const shouldWrapItems = props.shouldWrapItems || false;
  const stackStyles: React.CSSProperties = {
    '--kiba-stack-direction-base': getDirectionValue(direction),
    ...responsiveValueToCss(props.directionResponsive, '--kiba-stack-direction', getDirectionValue),
    '--kiba-stack-child-alignment-base': getFlexItemAlignment(childAlignment),
    ...responsiveValueToCss(props.childAlignmentResponsive, '--kiba-stack-child-alignment', getFlexItemAlignment),
    '--kiba-stack-content-alignment-base': getFlexContentAlignment(contentAlignment),
    ...responsiveValueToCss(props.contentAlignmentResponsive, '--kiba-stack-content-alignment', getFlexContentAlignment),
    '--kiba-stack-height-base': height,
    ...responsiveValueToCss(props.heightResponsive, '--kiba-stack-height'),
    '--kiba-stack-width-base': width,
    ...responsiveValueToCss(props.widthResponsive, '--kiba-stack-width'),
    ...(maxHeightResponsive ? { '--kiba-stack-max-height-base': maxHeightResponsive.base ?? 'none', ...responsiveValueToCss(maxHeightResponsive, '--kiba-stack-max-height') } : {}),
    ...(maxWidthResponsive ? { '--kiba-stack-max-width-base': maxWidthResponsive.base ?? 'none', ...responsiveValueToCss(maxWidthResponsive, '--kiba-stack-max-width') } : {}),
    ...(minHeightResponsive ? { '--kiba-stack-min-height-base': minHeightResponsive.base ?? '0', ...responsiveValueToCss(minHeightResponsive, '--kiba-stack-min-height') } : {}),
    ...(minWidthResponsive ? { '--kiba-stack-min-width-base': minWidthResponsive.base ?? '0', ...responsiveValueToCss(minWidthResponsive, '--kiba-stack-min-width') } : {}),
    ...(shouldWrapItems && innerShouldAddGutters ? { '--kiba-stack-gap': getPaddingSizeCss(defaultGutter) } : {}),
    ...props.style,
  } as React.CSSProperties;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <PaddingView paddingTop={paddingTop} paddingBottom={paddingBottom} paddingRight={paddingRight} paddingLeft={paddingLeft} className={className} {...props as IPaddingViewPaddingProps}>
      <div
        id={props.id}
        className={getClassName(Stack.displayName, isScrollableVertically && 'scrollableVertically', isScrollableHorizontally && 'scrollableHorizontally', shouldWrapItems && 'wrapItems')}
        style={stackStyles}
      >
        { children.map((child: React.ReactElement<IStackItemProps>, index: number): React.ReactElement => (
          <React.Fragment key={child.key}>
            {child.props.gutterBefore && (
              <Spacing className='stack-gutter' variant={child.props.gutterBefore} />
            )}
            {renderStackItemChildren(child.props.children, child.props)}
            {(child.props.gutterAfter || (!shouldWrapItems && innerShouldAddGutters && index < children.length - 1)) && (
              <Spacing className='stack-gutter' variant={child.props.gutterAfter || defaultGutter} />
            )}
          </React.Fragment>
        ))}
      </div>
    </PaddingView>
  );
}
Stack.displayName = 'KibaStack';
Stack.Item = StackItem;
