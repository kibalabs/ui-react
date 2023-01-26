import React from 'react';

import { getClassName } from '@kibalabs/core';
import { OptionalProppedElement } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IPillTheme } from './theme';
import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IIconProps, PaddingSize, Spacing } from '../../particles';

interface IStyledPillProps {
  $theme: IPillTheme;
}

const StyledPill = styled.div<IStyledPillProps>`
  ${(props: IStyledPillProps): string => themeToCss(props.$theme.normal.default.text)};
  ${(props: IStyledPillProps): string => themeToCss(props.$theme.normal.default.background)};
  outline: none;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  &.fullWidth {
    width: 100%;
  }
`;

export interface IPillProps extends IComponentProps<IPillTheme> {
  text: string;
  isFullWidth: boolean;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
}

export const Pill = (props: IPillProps): React.ReactElement => {
  const theme = useBuiltTheme('pills', props.variant, props.theme);
  return (
    <StyledPill
      id={props.id}
      className={getClassName(Pill.displayName, props.className, props.isFullWidth && 'fullWidth')}
      $theme={theme}
    >
      { props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing variant={props.iconGutter} />
        </React.Fragment>
      )}
      { props.text }
      { props.iconRight && (
        <React.Fragment>
          <Spacing variant={props.iconGutter} />
          {props.iconRight}
        </React.Fragment>
      )}
    </StyledPill>
  );
};

Pill.displayName = 'Pill';
Pill.defaultProps = {
  ...defaultComponentProps,
  isFullWidth: false,
  iconGutter: PaddingSize.Default,
};
