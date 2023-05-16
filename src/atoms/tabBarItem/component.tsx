import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { ITabBarItemTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const TabBarItemThemedStyle = (theme: RecursivePartial<ITabBarItemTheme>): string => `
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

interface IStyledTabBarItemProps {
  $theme?: RecursivePartial<ITabBarItemTheme>;
}

const StyledTabBarItem = styled.button<IStyledTabBarItemProps>`
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  text-align: center;
  transition-duration: 0.3s;
  &.collapsible {
    flex-shrink: 1;
  }
  &.expandable {
    flex-grow: 1;
  }
  &.disabled {
    cursor: auto;
  }

  &&&& {
    ${(props: IStyledTabBarItemProps): string => (props.$theme ? TabBarItemThemedStyle(props.$theme) : '')};
  }
`;

export interface ITabBarItemProps extends IComponentProps<ITabBarItemTheme> {
  tabKey: string;
  text: string;
  isEnabled?: boolean;
  isSelected?: boolean;
  isCollapsible?: boolean;
  isExpandable?: boolean;
  onClicked?(tabKey: string): void;
}

export const TabBarItem = (props: ITabBarItemProps): React.ReactElement => {
  const isEnabled = props.isEnabled == null ? true : props.isEnabled;
  const isExpandable = props.isExpandable == null ? true : props.isExpandable;

  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.tabKey);
    }
  };

  return (
    <StyledTabBarItem
      id={props.id}
      className={getClassName(TabBarItem.displayName, props.className, !isEnabled && 'disabled', props.isSelected && 'selected', props.isCollapsible && 'collapsible', isExpandable && 'expandable', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
      disabled={!isEnabled}
    >
      { props.text }
    </StyledTabBarItem>
  );
};

TabBarItem.displayName = 'KibaTabBarItem';
TabBarItem.defaultProps = {
  ...defaultComponentProps,
};
