import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IImageTheme } from './theme';

export interface IStyledImageProps {
  theme: IImageTheme;
  isFullWidth: boolean;
  isFullHeight: boolean;
  fitType: 'crop' | 'cover' | 'scale' | 'contain';
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
  ${(props: IStyledImageProps): string => themeToCss(props.theme.background)};
  display: block;
  pointer-events: none;
  width: ${(props: IStyledImageProps): string => (props.isFullWidth ? '100%' : 'auto')};
  height: ${(props: IStyledImageProps): string => (props.isFullHeight ? '100%' : 'auto')};
  object-fit: ${(props: IStyledImageProps): string => getImageFit(props.fitType)};
  max-width: 100%;
  max-height: 100%;

  .no-js &.lazyload {
    display: none;
  }

  // fade in after lazy load
  &.lazyload, &.lazyloading {
    opacity: 0;
  }
  &.lazyloaded {
    display: block;
    opacity: 1;
    transition: opacity 0.15s;
  }

  // TODO(krish): should all things be like this?
  &.centered {
    margin-left: auto;
    margin-right: auto;
  }
`;

export interface IImageProps extends IComponentProps<IImageTheme> {
  source: string;
  alternativeText: string;
  fitType: 'crop' | 'cover' | 'scale' | 'contain';
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  isCenteredHorizontally?: boolean;
  isLazyLoadable?: boolean;
}

export const Image = (props: IImageProps): React.ReactElement => {
  const theme = useBuiltTheme('images', props.variant, props.theme);
  return (
    <React.Fragment>
      <StyledImage
        id={props.id}
        className={getClassName(Image.displayName, props.className, props.isLazyLoadable ? 'lazyload' : 'unlazy', props.isCenteredHorizontally && 'centered')}
        theme={theme}
        src={props.isLazyLoadable ? undefined : props.source}
        data-src={props.isLazyLoadable ? props.source : undefined}
        alt={props.alternativeText}
        fitType={props.fitType}
        isFullWidth={Boolean(props.isFullWidth)}
        isFullHeight={Boolean(props.isFullHeight)}
      />
      {props.isLazyLoadable && (
        <noscript>
          <StyledImage
            id={props.id}
            className={getClassName(Image.displayName, props.className, 'unlazy', props.isCenteredHorizontally && 'centered')}
            theme={theme}
            src={props.source}
            alt={props.alternativeText}
            fitType={props.fitType}
            isFullWidth={Boolean(props.isFullWidth)}
            isFullHeight={Boolean(props.isFullHeight)}
          />
        </noscript>
      )}
    </React.Fragment>
  );
};

Image.displayName = 'Image';
Image.defaultProps = {
  ...defaultComponentProps,
  fitType: 'scale',
};
