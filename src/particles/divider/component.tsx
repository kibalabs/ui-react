import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IDividerTheme } from './theme';

interface IStyledDividerProps {
  theme: IDividerTheme;
}

const StyledDivider = styled.hr<IStyledDividerProps>`
  ${(props: IStyledDividerProps): string => themeToCss(props.theme)};

  &.horizontal {
    border-bottom-width: 'thin';
    width: 100%;
  }

  &.vertical {
    border-right-width: 'thin';
    height: 100%;
  }

`;

interface IDividerProps extends IComponentProps<IDividerTheme> {
  orientation?: string;
}

export const Divider = (props: IDividerProps): React.ReactElement => {
  const theme = useBuiltTheme('dividers', props.variant, props.theme);

  return (
    <StyledDivider
      id={props.id}
      theme={theme}
      className={getClassName(Divider.displayName, props.className, props.orientation)}
    />
  );
};

Divider.displayName = 'Divider';
Divider.defaultProps = {
  ...defaultComponentProps,
  orientation: 'horizontal'
};
