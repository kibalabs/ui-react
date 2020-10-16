import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IProgressCounterItemTheme } from './theme';

interface IStyledProgressCounterItemProps {
  theme: IProgressCounterItemTheme;
}

const StyledProgressCounterItem = styled.button<IStyledProgressCounterItemProps>`
  ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition-duration: 0.3s;

  &:hover {
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.hover?.text)};
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.press?.text)};
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.focus?.text)};
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.default?.text)};
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.default?.background)};
    &:hover {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.hover?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.hover?.background)};
    }
    &:active {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.press?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.press?.background)};
    }
    &:focus {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.focus?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.disabled.focus?.background)};
    }
  }
  &.selected {
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.default?.text)};
    ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.default?.background)};
    &:hover {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.hover?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.hover?.background)};
    }
    &:active {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.press?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.press?.background)};
    }
    &:focus {
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.focus?.text)};
      ${(props: IStyledProgressCounterItemProps): string => themeToCss(props.theme.selected.focus?.background)};
    }
  }
`;

export interface IProgressCounterItemProps extends IComponentProps<IProgressCounterItemTheme> {
  text: string;
  isEnabled: boolean;
  isSelected: boolean;
  onClicked?(): void;
}

export const ProgressCounterItem = (props: IProgressCounterItemProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  const theme = useBuiltTheme('progressCounterItems', props.variant, props.theme);
  return (
    <StyledProgressCounterItem
      id={props.id}
      className={getClassName(ProgressCounterItem.displayName, props.className, !props.isEnabled && 'disabled', props.isSelected && 'selected')}
      theme={theme}
      onClick={onClicked}
      disabled={!props.isEnabled}
    >
      { props.text }
    </StyledProgressCounterItem>
  );
};

ProgressCounterItem.displayName = 'ProgressCounterItem';
ProgressCounterItem.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isSelected: false,
};
