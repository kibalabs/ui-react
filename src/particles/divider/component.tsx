import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';

import {IDividerTheme} from './theme';

interface IStyledDividerProps {
  theme: IDividerTheme;
};

const StyledDivider = styled.hr<IStyledDividerProps>`
  ${(props: IStyledDividerProps): string => themeToCss(props.theme)};
`;

interface IDividerProps extends IComponentProps<IDividerTheme> {
}

export const Divider = (props: IDividerProps): React.ReactElement => {  
  const theme = useBuiltTheme('dividers', props.variant, props.theme);

  return <StyledDivider 
    id={props.id}
    theme={theme}
    className={getClassName(Divider.displayName, props.className)}
  />
}

Divider.displayName = 'Divider';
Divider.defaultProps = {
  ...defaultComponentProps
}