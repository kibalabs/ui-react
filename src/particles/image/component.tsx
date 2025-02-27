import React from 'react';

import { getClassName, RecursivePartial, updateQueryString } from '@kibalabs/core';
import { styled } from 'styled-components';

import { IImageTheme } from './theme';
import { IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const ImageThemedStyle = (theme: RecursivePartial<IImageTheme>): string => `
  ${themeToCss(theme.background)};
`;

export interface IStyledImageProps {
  $theme?: RecursivePartial<IImageTheme>;
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
  display: block;
  pointer-events: none;
  // fade in after lazy load
  .no-js &.lazyload {
    display: none;
  }
  &.lazyload, &.lazyloading {
    opacity: 0;
  }
  &.lazyloaded {
    display: block;
    opacity: 1;
    transition: opacity 0.15s;
  }
  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
  width: ${(props: IStyledImageProps): string => props.$width};
  height: ${(props: IStyledImageProps): string => props.$height};
  max-width: ${(props: IStyledImageProps): string => props.$maxWidth};
  max-height: ${(props: IStyledImageProps): string => props.$maxHeight};
  object-fit: ${(props: IStyledImageProps): string => getImageFit(props.$fitType)};
  &&&& {
    ${(props: IStyledImageProps): string => (props.$theme ? ImageThemedStyle(props.$theme) : '')};
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
  ipfsPrefix?: string;
}

const RESPONSIVE_IMAGE_SIZES = [100, 200, 300, 500, 640, 750, 1000, 1080, 1920, 2500];

const getResponsiveImageString = (url: string) => {
  const widthValues = RESPONSIVE_IMAGE_SIZES.map((size: number): string => {
    const newUrl = updateQueryString(url, { w: size });
    return `${newUrl} ${size}w`;
  });
  // const heightValues = RESPONSIVE_IMAGE_SIZES.map((size: number): string => {
  //   return `${url}?h=${size} ${size}h`;
  // });
  return [...widthValues].join(', ');
};

export function Image({
  className = '',
  variant = 'default',
  ...props
}: IImageProps): React.ReactElement {
  const fitType = props.fitType || 'scale';
  const width = props.width ? props.width : props.isFullWidth ? '100%' : 'auto';
  const height = props.height ? props.height : props.isFullHeight ? '100%' : 'auto';
  const source = props.source.startsWith('ipfs://') ? props.source.replace('ipfs://', props.ipfsPrefix ?? 'https://ipfs.io/ipfs/') : props.source;
  const isSourceResponsive = source.includes('d35ci2i0uce4j6.cloudfront.net') || source.includes('pablo-images.kibalabs.com');

  return (
    <React.Fragment>
      <StyledImage
        id={props.id}
        className={getClassName(Image.displayName, className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered', ...(variant?.split('-') || []))}
        $theme={props.theme}
        $fitType={fitType}
        $width={width}
        $height={height}
        $maxWidth={props.maxWidth || 'none'}
        $maxHeight={props.maxHeight || 'none'}
        src={props.isLazyLoadable ? undefined : source}
        data-src={props.isLazyLoadable ? source : undefined}
        sizes={isSourceResponsive && !props.isLazyLoadable ? 'auto' : undefined}
        data-sizes={isSourceResponsive && props.isLazyLoadable ? 'auto' : undefined}
        srcSet={isSourceResponsive && !props.isLazyLoadable ? getResponsiveImageString(source) : undefined}
        data-srcset={isSourceResponsive && props.isLazyLoadable ? getResponsiveImageString(source) : undefined}
        alt={props.alternativeText}
        // crossOrigin='anonymous'
      />
      {props.isLazyLoadable && (
        <noscript>
          <StyledImage
            id={props.id}
            className={getClassName(Image.displayName, className, 'unlazy', props.isCenteredHorizontally && 'centered', ...(variant?.split('-') || []))}
            $theme={props.theme}
            $fitType={fitType}
            $width={width}
            $height={height}
            $maxWidth={props.maxWidth || 'none'}
            $maxHeight={props.maxHeight || 'none'}
            src={props.source}
            sizes={isSourceResponsive ? 'auto' : undefined}
            srcSet={isSourceResponsive ? getResponsiveImageString(props.source) : undefined}
            alt={props.alternativeText}
            // crossOrigin='anonymous'
          />
        </noscript>
      )}
    </React.Fragment>
  );
}
Image.displayName = 'KibaImage';
