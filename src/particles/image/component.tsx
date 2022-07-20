import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IImageTheme } from './theme';

export interface IStyledImageProps {
  $theme: IImageTheme;
  $width: string;
  $height: string;
  $maxWidth: string;
  $maxHeight: string;
  $fitType: 'crop' | 'cover' | 'scale' | 'contain';
}

const getImageFit = (fitType: string): string => {
  if (fitType === 'crop' || fitType === 'cover') {
    return 'cover';
  }
  if (fitType === 'contain') {
    return 'contain';
  }
  return 'fill';
};

const StyledImage = styled.img<IStyledImageProps>`
  ${(props: IStyledImageProps): string => themeToCss(props.$theme.background)};
  display: block;
  pointer-events: none;
  width: ${(props: IStyledImageProps): string => props.$width};
  height: ${(props: IStyledImageProps): string => props.$height};
  max-width: ${(props: IStyledImageProps): string => props.$maxWidth};
  max-height: ${(props: IStyledImageProps): string => props.$maxHeight};
  object-fit: ${(props: IStyledImageProps): string => getImageFit(props.$fitType)};

  .no-js &.lazyload {
    display: none;
  }

  // fade in after lazy load
  /* &.lazyload, &.lazyloading {
    opacity: 0;
  } */
  &.lazyloaded {
    display: block;
    opacity: 1;
    transition: opacity 0.15s;
  }

  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
`;

export interface IImageProps extends IComponentProps<IImageTheme> {
  source: string;
  alternativeText: string;
  fitType?: 'crop' | 'cover' | 'scale' | 'contain';
  width?: string;
  height?: string;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  isCenteredHorizontally?: boolean;
  isLazyLoadable?: boolean;
}

const _RESPONSIVE_IMAGE_SIZES = [100, 200, 300, 500, 640, 750, 1000, 1080, 1920, 2500]

const getResponsiveImageString = (url: string) => {
  const widthValues = _RESPONSIVE_IMAGE_SIZES.map((size: number): string => {
    return `${url}?w=${size} ${size}w`;
  });
  // const heightValues = _RESPONSIVE_IMAGE_SIZES.map((size: number): string => {
  //   return `${url}?h=${size} ${size}h`;
  // });
  const heightValues = [];
  return [...widthValues, ...heightValues].join(', ');
}

export const Image = (props: IImageProps): React.ReactElement => {
  const theme = useBuiltTheme('images', props.variant, props.theme);
  const fitType = props.fitType || 'scale';
  const width = props.width ? props.width : props.isFullWidth ? '100%' : 'auto';
  const height = props.height ? props.height : props.isFullHeight ? '100%' : 'auto';
  const supportsResponsive = props.source.includes('d35ci2i0uce4j6.cloudfront.net');

  return (
    <React.Fragment>
      <StyledImage
        id={props.id}
        className={getClassName(Image.displayName, props.className, props.isLazyLoadable || supportsResponsive ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered')}
        $theme={theme}
        $fitType={fitType}
        $width={width}
        $height={height}
        $maxWidth={props.maxWidth || 'auto'}
        $maxHeight={props.maxHeight || 'auto'}
        src={props.isLazyLoadable ? undefined : props.source}
        sizes={supportsResponsive && !props.isLazyLoadable ? 'atuo' : undefined}
        srcSet={supportsResponsive && !props.isLazyLoadable ? getResponsiveImageString(props.source) : undefined}
        data-src={props.isLazyLoadable ? props.source : undefined}
        data-sizes={props.isLazyLoadable && supportsResponsive ? "auto" : undefined}
        data-srcset={props.isLazyLoadable && supportsResponsive ? getResponsiveImageString(props.source) : undefined}
        alt={props.alternativeText}
      />
      {props.isLazyLoadable && (
        <noscript>
          <StyledImage
            id={props.id}
            className={getClassName(Image.displayName, props.className, 'unlazy', props.isCenteredHorizontally && 'centered')}
            $theme={theme}
            $fitType={fitType}
            $width={width}
            $height={height}
            $maxWidth={props.maxWidth || 'auto'}
            $maxHeight={props.maxHeight || 'auto'}
            src={props.source}
            sizes={supportsResponsive ? "auto" : undefined}
            srcSet={supportsResponsive ? getResponsiveImageString(props.source) : undefined}
            alt={props.alternativeText}
          />
        </noscript>
      )}
    </React.Fragment>
  );
};

Image.displayName = 'Image';
Image.defaultProps = {
  ...defaultComponentProps,
};
