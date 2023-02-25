import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IIconTheme } from './theme';
import { defaultComponentProps, IComponentProps, useBuiltTheme } from '../..';

interface IStyledIconProps {
  $theme: IIconTheme;
  $color?: string;
  $shouldAddFill?: boolean;
  $shouldAddStroke?: boolean;
}

const StyledIcon = styled.div<IStyledIconProps>`
  width: ${(props: IStyledIconProps): string => props.$theme.size};
  height: ${(props: IStyledIconProps): string => props.$theme.size};
  min-width: ${(props: IStyledIconProps): string => props.$theme.size};
  min-height: ${(props: IStyledIconProps): string => props.$theme.size};
  color: ${(props: IStyledIconProps): string => props.$color || 'currentColor'};
  overflow: hidden;

  svg {
    height: 100%;
    width: 100%;
    display: block;
    fill: ${(props: IStyledIconProps): string => (props.$shouldAddFill ? 'currentColor' : 'none')};
    stroke: ${(props: IStyledIconProps): string => (props.$shouldAddStroke ? 'currentColor' : 'none')};
  }
`;

export interface IIconProps extends IComponentProps<IIconTheme> {
  _color?: string;
  shouldAddFill?: boolean;
  shouldAddStroke?: boolean;
  svgContent: string;
}

// maybe use react-inlinesvg instead!
export const Icon = (props: IIconProps): React.ReactElement => {
  const theme = useBuiltTheme('icons', props.variant, props.theme);
  return (
    <StyledIcon
      id={props.id}
      className={getClassName(Icon.displayName, props.className)}
      $theme={theme}
      // eslint-disable-next-line no-underscore-dangle
      $color={props._color}
      $shouldAddFill={props.shouldAddFill}
      $shouldAddStroke={props.shouldAddStroke}
      dangerouslySetInnerHTML={{ __html: props.svgContent }}
      // as={'img'}
      // src={`data:image/svg+xml;utf8,${encodeURIComponent(props.svgContent)}`}
    />
  );
};

Icon.displayName = 'Icon';
Icon.defaultProps = {
  ...defaultComponentProps,
  shouldAddFill: true,
  shouldAddStroke: true,
};
