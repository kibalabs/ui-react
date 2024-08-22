import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { OptionalProppedElement } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IPillTheme } from './theme';
import { IComponentProps } from '../../model';
import { IIconProps, PaddingSize, Spacing } from '../../particles';
import { themeToCss } from '../../util/themeUtil';

export const PillThemedStyle = (theme: RecursivePartial<IPillTheme>): string => `
  ${themeToCss(theme.text)};
  ${themeToCss(theme.background)};
`;

interface IStyledPillProps {
  $theme?: RecursivePartial<IPillTheme>;
}

const StyledPill = styled.div<IStyledPillProps>`
  outline: none;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  &.fullWidth {
    width: 100%;
  }

  &&&& {
    ${(props: IStyledPillProps): string => (props.$theme ? PillThemedStyle(props.$theme) : '')};
  }
`;

export interface IPillProps extends IComponentProps<IPillTheme> {
  text: string;
  isFullWidth: boolean;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
}

export function Pill({
  className = '',
  variant = 'default',
  isFullWidth = false,
  iconGutter = PaddingSize.Default,
  ...props
}: IPillProps): React.ReactElement {
  return (
    <StyledPill
      id={props.id}
      className={getClassName(Pill.displayName, className, isFullWidth && 'fullWidth', ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      { props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing variant={iconGutter} />
        </React.Fragment>
      )}
      { props.text }
      { props.iconRight && (
        <React.Fragment>
          <Spacing variant={iconGutter} />
          {props.iconRight}
        </React.Fragment>
      )}
    </StyledPill>
  );
}
Pill.displayName = 'KibaPill';
