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
  display: ${(props: IStyledBoxProps): string => props.$blockType};
  flex-direction: column;
  z-index: ${(props: IStyledBoxProps): string => (props.$zIndex ? `${props.$zIndex}` : 'auto')};
  &.clipContent {
    overflow: hidden;
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
  zIndex?: number;
  title?: string;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  shouldClipContent?: boolean;
}

export const Box = React.forwardRef((props: IBoxProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const theme = useBuiltTheme('boxes', props.variant, props.theme);
  const height = props.height || (props.isFullHeight ? '100%' : 'auto');
  const width = props.width || (props.isFullWidth ? '100%' : 'auto');
  const maxHeight = props.maxHeight || 'none';
  const maxWidth = props.maxWidth || 'none';
  const blockType = width === '100%' ? 'block' : 'flex';
  const shouldClipContent = props.shouldClipContent;

  if ((props.isScrollableHorizontally || props.isScrollableVertically) && props.shouldClipContent) {
    console.error('Either shouldClipContent prop or Scroll props can be true at once.');
  }

  return (
    <StyledBox
      id={props.id}
      className={getClassName(Box.displayName, props.className, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally', shouldClipContent && 'clipContent')}
      $theme={theme}
      $height={height}
      $width={width}
      $maxHeight={maxHeight}
      $maxWidth={maxWidth}
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
