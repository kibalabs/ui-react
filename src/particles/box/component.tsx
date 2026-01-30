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
  const height = props.height ?? props.heightResponsive?.base ?? (props.isFullHeight ? '100%' : undefined);
  const width = props.width ?? props.widthResponsive?.base ?? (isFullWidth ? '100%' : undefined);
  const blockType = width === '100%' ? 'block' : 'flex';
  const combinedStyles: React.CSSProperties = {
    ...props.style,
    // @ts-expect-error CSS custom properties are valid but not in CSSProperties type
    '--kiba-box-display': blockType,
    '--kiba-box-width': width ?? 'initial',
    '--kiba-box-width-sm': props.widthResponsive?.small ?? 'initial',
    '--kiba-box-width-md': props.widthResponsive?.medium ?? 'initial',
    '--kiba-box-width-lg': props.widthResponsive?.large ?? 'initial',
    '--kiba-box-width-xl': props.widthResponsive?.extraLarge ?? 'initial',
    '--kiba-box-height': height ?? 'initial',
    '--kiba-box-height-sm': props.heightResponsive?.small ?? 'initial',
    '--kiba-box-height-md': props.heightResponsive?.medium ?? 'initial',
    '--kiba-box-height-lg': props.heightResponsive?.large ?? 'initial',
    '--kiba-box-height-xl': props.heightResponsive?.extraLarge ?? 'initial',
    '--kiba-box-max-width': props.maxWidth ?? 'initial',
    '--kiba-box-max-width-sm': props.maxWidthResponsive?.small ?? 'initial',
    '--kiba-box-max-width-md': props.maxWidthResponsive?.medium ?? 'initial',
    '--kiba-box-max-width-lg': props.maxWidthResponsive?.large ?? 'initial',
    '--kiba-box-max-width-xl': props.maxWidthResponsive?.extraLarge ?? 'initial',
    '--kiba-box-max-height': props.maxHeight ?? 'initial',
    '--kiba-box-max-height-sm': props.maxHeightResponsive?.small ?? 'initial',
    '--kiba-box-max-height-md': props.maxHeightResponsive?.medium ?? 'initial',
    '--kiba-box-max-height-lg': props.maxHeightResponsive?.large ?? 'initial',
    '--kiba-box-max-height-xl': props.maxHeightResponsive?.extraLarge ?? 'initial',
    '--kiba-box-min-width': props.minWidth ?? 'initial',
    '--kiba-box-min-width-sm': props.minWidthResponsive?.small ?? 'initial',
    '--kiba-box-min-width-md': props.minWidthResponsive?.medium ?? 'initial',
    '--kiba-box-min-width-lg': props.minWidthResponsive?.large ?? 'initial',
    '--kiba-box-min-width-xl': props.minWidthResponsive?.extraLarge ?? 'initial',
    '--kiba-box-min-height': props.minHeight ?? 'initial',
    '--kiba-box-min-height-sm': props.minHeightResponsive?.small ?? 'initial',
    '--kiba-box-min-height-md': props.minHeightResponsive?.medium ?? 'initial',
    '--kiba-box-min-height-lg': props.minHeightResponsive?.large ?? 'initial',
    '--kiba-box-min-height-xl': props.minHeightResponsive?.extraLarge ?? 'initial',
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
