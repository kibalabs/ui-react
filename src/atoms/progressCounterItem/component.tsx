import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { IProgressCounterItemTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const ProgressCounterItemThemedStyle = (theme: RecursivePartial<IProgressCounterItemTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  ${themeToCss(theme?.normal?.default?.background)};
  &:hover {
    ${themeToCss(theme?.normal?.hover?.text)};
    ${themeToCss(theme?.normal?.hover?.background)};
  }
  &:active {
    ${themeToCss(theme?.normal?.press?.text)};
    ${themeToCss(theme?.normal?.press?.background)};
  }
  &:focus {
    ${themeToCss(theme?.normal?.focus?.text)};
    ${themeToCss(theme?.normal?.focus?.background)};
  }
  &.disabled {
    ${themeToCss(theme?.disabled?.default?.text)};
    ${themeToCss(theme?.disabled?.default?.background)};
    &:hover {
      ${themeToCss(theme?.disabled?.hover?.text)};
      ${themeToCss(theme?.disabled?.hover?.background)};
    }
    &:active {
      ${themeToCss(theme?.disabled?.press?.text)};
      ${themeToCss(theme?.disabled?.press?.background)};
    }
    &:focus {
      ${themeToCss(theme?.disabled?.focus?.text)};
      ${themeToCss(theme?.disabled?.focus?.background)};
    }
  }
  &.selected {
    ${themeToCss(theme?.selected?.default?.text)};
    ${themeToCss(theme?.selected?.default?.background)};
    &:hover {
      ${themeToCss(theme?.selected?.hover?.text)};
      ${themeToCss(theme?.selected?.hover?.background)};
    }
    &:active {
      ${themeToCss(theme?.selected?.press?.text)};
      ${themeToCss(theme?.selected?.press?.background)};
    }
    &:focus {
      ${themeToCss(theme?.selected?.focus?.text)};
      ${themeToCss(theme?.selected?.focus?.background)};
    }
  }
`;

interface IStyledProgressCounterItemProps {
  $theme?: RecursivePartial<IProgressCounterItemTheme>;
}

const StyledProgressCounterItem = styled.button<IStyledProgressCounterItemProps>`
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition-duration: 0.3s;
  &.disabled {
    cursor: auto;
  }

  && {
    ${(props: IStyledProgressCounterItemProps): string => (props.$theme ? ProgressCounterItemThemedStyle(props.$theme) : '')};
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

  return (
    <StyledProgressCounterItem
      id={props.id}
      className={getClassName(ProgressCounterItem.displayName, props.className, !props.isEnabled && 'disabled', props.isSelected && 'selected', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
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
