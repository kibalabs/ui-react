import React from 'react';

import { getClassName, updateQueryString } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';


const getImageFit = (fitType: string): string => {
  if (fitType === 'crop' || fitType === 'cover') {
    return 'cover';
  }
  if (fitType === 'contain') {
    return 'contain';
  }
  return 'fill';
};

export interface IImageProps extends IComponentProps {
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
  const imageStyles: React.CSSProperties = {
    ...props.style,
    '--kiba-image-width': width,
    '--kiba-image-height': height,
    '--kiba-image-max-width': props.maxWidth || 'none',
    '--kiba-image-max-height': props.maxHeight || 'none',
    '--kiba-image-fit': getImageFit(fitType),
  } as React.CSSProperties;

  return (
    <React.Fragment>
      <img
        id={props.id}
        className={getClassName(Image.displayName, className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered', ...(variant?.split('-') || []))}
        style={imageStyles}
        src={props.isLazyLoadable ? undefined : source}
        data-src={props.isLazyLoadable ? source : undefined}
        sizes={isSourceResponsive && !props.isLazyLoadable ? 'auto' : undefined}
        data-sizes={isSourceResponsive && props.isLazyLoadable ? 'auto' : undefined}
        srcSet={isSourceResponsive && !props.isLazyLoadable ? getResponsiveImageString(source) : undefined}
        data-srcset={isSourceResponsive && props.isLazyLoadable ? getResponsiveImageString(source) : undefined}
        alt={props.alternativeText}
      />
      {props.isLazyLoadable && (
        <noscript>
          <img
            id={props.id}
            className={getClassName(Image.displayName, className, 'unlazy', props.isCenteredHorizontally && 'centered', ...(variant?.split('-') || []))}
            style={imageStyles}
            src={props.source}
            sizes={isSourceResponsive ? 'auto' : undefined}
            srcSet={isSourceResponsive ? getResponsiveImageString(props.source) : undefined}
            alt={props.alternativeText}
          />
        </noscript>
      )}
    </React.Fragment>
  );
}
Image.displayName = 'KibaImage';
