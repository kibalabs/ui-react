import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IOptionalSingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IBoxTheme } from './theme';

interface IStyledBoxProps {
  $theme: IBoxTheme;
  $height: string;
  $width: string;
  $maxHeight: string;
  $maxWidth: string;
  $minHeight: string;
  $minWidth: string;
  $blockType: string;
  $zIndex?: number;
}

const StyledBox = styled.div<IStyledBoxProps>`
  ${(props: IStyledBoxProps): string => themeToCss(props.$theme)};
  box-sizing: border-box;
  height: ${(props: IStyledBoxProps): string => props.$height};
  width: ${(props: IStyledBoxProps): string => props.$width};
  max-height: ${(props: IStyledBoxProps): string => props.$maxHeight};
  max-width: ${(props: IStyledBoxProps): string => props.$maxWidth};
  min-height: ${(props: IStyledBoxProps): string => props.$minHeight};
  min-width: ${(props: IStyledBoxProps): string => props.$minWidth};
  display: ${(props: IStyledBoxProps): string => props.$blockType};
  flex-direction: column;
  z-index: ${(props: IStyledBoxProps): string => (props.$zIndex ? `${props.$zIndex}` : 'auto')};
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
`;

export interface IBoxProps extends IComponentProps<IBoxTheme>, IOptionalSingleAnyChildProps {
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
  zIndex?: number;
  title?: string;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  shouldClipContent?: boolean;
  shouldCaptureTouches?: boolean;
}

export const Box = React.forwardRef((props: IBoxProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const theme = useBuiltTheme('boxes', props.variant, props.theme);
  const height = props.height || (props.isFullHeight ? '100%' : 'auto');
  const width = props.width || (props.isFullWidth ? '100%' : 'auto');
  const maxHeight = props.maxHeight || 'none';
  const maxWidth = props.maxWidth || 'none';
  const minHeight = props.minHeight || 'auto';
  const minWidth = props.minWidth || 'auto';
  const blockType = width === '100%' ? 'block' : 'flex';

  return (
    <StyledBox
      id={props.id}
      className={getClassName(Box.displayName, props.className, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally', props.shouldClipContent && 'clipContent', props.shouldCaptureTouches && 'captureTouches')}
      $theme={theme}
      $height={height}
      $width={width}
      $maxHeight={maxHeight}
      $maxWidth={maxWidth}
      $minHeight={minHeight}
      $minWidth={minWidth}
      $blockType={blockType}
      $zIndex={props.zIndex}
      title={props.title}
      ref={ref}
    >
      {props.children}
    </StyledBox>
  );
});

Box.displayName = 'Box';
Box.defaultProps = {
  ...defaultComponentProps,
  isFullWidth: true,
  shouldClipContent: false,
};
