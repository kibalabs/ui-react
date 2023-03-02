import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IOptionalSingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IBoxTheme } from './theme';
import { defaultComponentProps, IComponentProps, IDimensionGuide, themeToCss, useDimensions } from '../..';
import { fieldToResponsiveCss, getCss, propertyToCss, ResponsiveField } from '../../util';

export const BoxThemedStyle = (theme: RecursivePartial<IBoxTheme>): string => `
  ${themeToCss(theme)};
`;

interface IStyledBoxProps {
  $theme?: RecursivePartial<IBoxTheme>;
  $dimensions: IDimensionGuide;
  $height: ResponsiveField<string>;
  $width: ResponsiveField<string>;
  $maxHeight: ResponsiveField<string> | null;
  $maxWidth: ResponsiveField<string> | null;
  $minHeight: ResponsiveField<string> | null;
  $minWidth: ResponsiveField<string> | null;
  $blockType: string;
  $zIndex?: number;
  $position?: string;
}

const StyledBox = styled.div<IStyledBoxProps>`
  box-sizing: border-box;
  flex-direction: column;
  &.clipContent {
    overflow: hidden;
  }
  &.captureTouches {
    pointer-events: all;
  }
  &.scrollableVertically {
    overflow-y: auto;
  }
  &.scrollableHorizontally {
    overflow-x: auto;
  }
  ${(props: IStyledBoxProps): string => fieldToResponsiveCss(props.$height, props.$dimensions, getCss('height'))};
  ${(props: IStyledBoxProps): string => fieldToResponsiveCss(props.$width, props.$dimensions, getCss('width'))};
  ${(props: IStyledBoxProps): string => (props.$maxHeight ? fieldToResponsiveCss(props.$maxHeight, props.$dimensions, getCss('max-height')) : '')};
  ${(props: IStyledBoxProps): string => (props.$maxWidth ? fieldToResponsiveCss(props.$maxWidth, props.$dimensions, getCss('max-width')) : '')};
  ${(props: IStyledBoxProps): string => (props.$minHeight ? fieldToResponsiveCss(props.$minHeight, props.$dimensions, getCss('min-height')) : '')};
  ${(props: IStyledBoxProps): string => (props.$minWidth ? fieldToResponsiveCss(props.$minWidth, props.$dimensions, getCss('min-width')) : '')};
  ${(props: IStyledBoxProps): string => propertyToCss('display', props.$blockType)};
  ${(props: IStyledBoxProps): string => propertyToCss('z-index', props.$zIndex)};
  ${(props: IStyledBoxProps): string => propertyToCss('position', props.$position)};

  && {
    ${(props: IStyledBoxProps): string => (props.$theme ? BoxThemedStyle(props.$theme) : '')};
  }
`;

export interface IBoxProps extends IComponentProps<IBoxTheme>, IOptionalSingleAnyChildProps {
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
  zIndex?: number;
  title?: string;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  shouldClipContent?: boolean;
  shouldCaptureTouches?: boolean;
  position?: string;
}

export const Box = React.forwardRef((props: IBoxProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const dimensions = useDimensions();
  const height = props.height || (props.isFullHeight ? '100%' : 'auto');
  const width = props.width || (props.isFullWidth ? '100%' : 'auto');
  const maxHeight = props.maxHeight || null;
  const maxWidth = props.maxWidth || null;
  const minHeight = props.minHeight || null;
  const minWidth = props.minWidth || null;
  const maxHeightResponsive = props.maxHeightResponsive || maxHeight ? { base: (maxHeight || undefined), ...props.maxHeightResponsive } : null;
  const maxWidthResponsive = props.maxWidthResponsive || maxWidth ? { base: (maxWidth || undefined), ...props.maxWidthResponsive } : null;
  const minHeightResponsive = props.minHeightResponsive || minHeight ? { base: (minHeight || undefined), ...props.minHeightResponsive } : null;
  const minWidthResponsive = props.minWidthResponsive || minWidth ? { base: (minWidth || undefined), ...props.minWidthResponsive } : null;
  const blockType = width === '100%' ? 'block' : 'flex';

  return (
    <StyledBox
      id={props.id}
      className={getClassName(Box.displayName, props.className, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally', props.shouldClipContent && 'clipContent', props.shouldCaptureTouches && 'captureTouches', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      $dimensions={dimensions}
      $height={{ base: height, ...props.heightResponsive }}
      $width={{ base: width, ...props.widthResponsive }}
      $maxHeight={maxHeightResponsive}
      $maxWidth={maxWidthResponsive}
      $minHeight={minHeightResponsive}
      $minWidth={minWidthResponsive}
      $blockType={blockType}
      $zIndex={props.zIndex}
      $position={props.position}
      title={props.title}
      ref={ref}
    >
      {props.children}
    </StyledBox>
  );
});

Box.displayName = 'KibaBox';
Box.defaultProps = {
  ...defaultComponentProps,
  isFullWidth: true,
  shouldClipContent: false,
};
