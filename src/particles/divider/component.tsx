import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { IDividerTheme } from './theme';
import { IComponentProps } from '../../model';
import { propertyToCss } from '../../util';

export const DividerThemedStyle = (theme: RecursivePartial<IDividerTheme>): string => `
  ${propertyToCss('color', theme.color)};
  &.horizontal {
    ${propertyToCss('border-bottom-width', theme.width)};
  }

  &.vertical {
    ${propertyToCss('border-right-width', theme.width)};
  }
`;

interface IStyledDividerProps {
  $theme?: RecursivePartial<IDividerTheme>;
}

const StyledDivider = styled.hr<IStyledDividerProps>`
  flex-shrink: 0;
  margin: 0;
  border-style: solid;
  border-width: 0;

  &.horizontal {
    width: 100%;
  }

  &.vertical {
    flex-direction: column;
    height: 100%;
  }

  &&&& {
    ${(props: IStyledDividerProps): string => (props.$theme ? DividerThemedStyle(props.$theme) : '')};
  }
`;

interface IDividerProps extends IComponentProps<IDividerTheme> {
  orientation?: string;
}

export function Divider({
  className = '',
  variant = 'default',
  orientation = 'horizontal',
  ...props
}: IDividerProps): React.ReactElement {
  return (
    <StyledDivider
      id={props.id}
      className={getClassName(Divider.displayName, className, orientation, ...(variant?.split('-') || []))}
      $theme={props.theme}
    />
  );
}
Divider.displayName = 'Divider';
