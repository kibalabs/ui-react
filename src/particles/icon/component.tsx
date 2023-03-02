import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { IIconTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';

export const IconThemedStyle = (theme: RecursivePartial<IIconTheme>): string => `
  width: ${theme.size};
  height: ${theme.size};
  // min-width: ${theme.size};
  // min-height: ${theme.size};
`;

interface IStyledIconProps {
  $theme?: RecursivePartial<IIconTheme>;
  $color?: string;
  $shouldAddFill?: boolean;
  $shouldAddStroke?: boolean;
}

const StyledIcon = styled.div<IStyledIconProps>`
  svg {
    height: 100%;
    width: 100%;
    display: block;
    fill: ${(props: IStyledIconProps): string => (props.$shouldAddFill ? 'currentColor' : 'none')};
    stroke: ${(props: IStyledIconProps): string => (props.$shouldAddStroke ? 'currentColor' : 'none')};
  }
  overflow: hidden;
  color: ${(props: IStyledIconProps): string => props.$color || 'currentColor'};
  && {
    ${(props: IStyledIconProps): string => (props.$theme ? IconThemedStyle(props.$theme) : '')};
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
  return (
    <StyledIcon
      id={props.id}
      className={getClassName(Icon.displayName, props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
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

Icon.displayName = 'KibaIcon';
Icon.defaultProps = {
  ...defaultComponentProps,
  shouldAddFill: true,
  shouldAddStroke: true,
};
