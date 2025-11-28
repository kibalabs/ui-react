import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IOptionalSingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../..';
import { ResponsiveField } from '../../util';


export interface IBoxProps extends IComponentProps, IOptionalSingleAnyChildProps {
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
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function Box({
  className = '',
  variant = 'default',
  isFullWidth = true,
  ...props
}: IBoxProps): React.ReactElement {
  const height = props.height || (props.isFullHeight ? '100%' : 'auto');
  const width = props.width || (isFullWidth ? '100%' : 'auto');
  const blockType = width === '100%' ? 'block' : 'flex';
  const combinedStyles: React.CSSProperties = {
    ...props.style,
    // @ts-expect-error CSS custom properties are valid but not in CSSProperties type
    '--kiba-box-display': blockType,
    '--kiba-box-width': width,
    '--kiba-box-width-sm': props.widthResponsive?.small,
    '--kiba-box-width-md': props.widthResponsive?.medium,
    '--kiba-box-width-lg': props.widthResponsive?.large,
    '--kiba-box-width-xl': props.widthResponsive?.extraLarge,
    '--kiba-box-height': height,
    '--kiba-box-height-sm': props.heightResponsive?.small,
    '--kiba-box-height-md': props.heightResponsive?.medium,
    '--kiba-box-height-lg': props.heightResponsive?.large,
    '--kiba-box-height-xl': props.heightResponsive?.extraLarge,
    '--kiba-box-max-width': props.maxWidth,
    '--kiba-box-max-width-sm': props.maxWidthResponsive?.small,
    '--kiba-box-max-width-md': props.maxWidthResponsive?.medium,
    '--kiba-box-max-width-lg': props.maxWidthResponsive?.large,
    '--kiba-box-max-width-xl': props.maxWidthResponsive?.extraLarge,
    '--kiba-box-max-height': props.maxHeight,
    '--kiba-box-max-height-sm': props.maxHeightResponsive?.small,
    '--kiba-box-max-height-md': props.maxHeightResponsive?.medium,
    '--kiba-box-max-height-lg': props.maxHeightResponsive?.large,
    '--kiba-box-max-height-xl': props.maxHeightResponsive?.extraLarge,
    '--kiba-box-min-width': props.minWidth,
    '--kiba-box-min-width-sm': props.minWidthResponsive?.small,
    '--kiba-box-min-width-md': props.minWidthResponsive?.medium,
    '--kiba-box-min-width-lg': props.minWidthResponsive?.large,
    '--kiba-box-min-width-xl': props.minWidthResponsive?.extraLarge,
    '--kiba-box-min-height': props.minHeight,
    '--kiba-box-min-height-sm': props.minHeightResponsive?.small,
    '--kiba-box-min-height-md': props.minHeightResponsive?.medium,
    '--kiba-box-min-height-lg': props.minHeightResponsive?.large,
    '--kiba-box-min-height-xl': props.minHeightResponsive?.extraLarge,
    zIndex: props.zIndex,
    position: props.position as React.CSSProperties['position'],
  };
  return (
    <div
      id={props.id}
      className={getClassName(Box.displayName, className, props.isScrollableVertically && 'scrollableVertically', props.isScrollableHorizontally && 'scrollableHorizontally', props.shouldClipContent && 'clipContent', props.shouldCaptureTouches && 'captureTouches', ...(variant?.split('-') || []))}
      title={props.title}
      ref={props.ref}
      style={combinedStyles}
    >
      {props.children}
    </div>
  );
}
Box.displayName = 'KibaBox';
