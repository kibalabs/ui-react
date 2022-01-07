import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, useBuiltTheme } from '../..';
import { valueToCss } from '../../util';
import { setDefaults } from '../../util/SetDefaultProps';
import { IDividerTheme } from './theme';

interface IStyledDividerProps {
  $theme: IDividerTheme;
}

const StyledDivider = styled.hr<IStyledDividerProps>`
  color: ${(props: IStyledDividerProps): string => valueToCss(props.$theme.color)};
  flex-shrink: 0;
  margin: 0;
  border-style: solid;
  border-width: 0;

  &.horizontal {
    border-bottom-width: ${(props: IStyledDividerProps): string => props.$theme.width};
    width: 100%;
  }

  &.vertical {
    flex-direction: column;
    border-right-width: ${(props: IStyledDividerProps): string => props.$theme.width};
    height: 100%;
  }
`;

interface IDividerProps extends IComponentProps<IDividerTheme> {
  orientation?: string;
}

export const Divider = (inputProps: IDividerProps): React.ReactElement => {
  const props = setDefaults(inputProps, {
    ...defaultComponentProps,
    orientation: 'horizontal',
  });
  const theme = useBuiltTheme('dividers', props.variant, props.theme);

  return (
    <StyledDivider
      id={props.id}
      $theme={theme}
      className={getClassName(Divider.displayName, props.className, props.orientation)}
    />
  );
};

Divider.displayName = 'Divider';
