import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IListItemTheme } from './theme';
import {IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const ListItemThemedStyle = (theme: RecursivePartial<IListItemTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};
  &.clickable {
    &:hover {
        ${themeToCss(theme?.normal?.hover?.background)};
    }
    &:active {
        ${themeToCss(theme?.normal?.press?.background)};
    }
    &:focus {
        ${themeToCss(theme?.normal?.focus?.background)};
    }
    &.disabled {
      ${themeToCss(theme?.disabled?.default?.background)};
      &:hover {
        ${themeToCss(theme?.disabled?.hover?.background)};
      }
      &:active {
        ${themeToCss(theme?.disabled?.press?.background)};
      }
      &:focus {
        ${themeToCss(theme?.disabled?.focus?.background)};
      }
    }
  }
  &.selected {
    ${themeToCss(theme?.selected?.default?.background)};
    &:hover {
      ${themeToCss(theme?.selected?.hover?.background)};
    }
    &:active {
      ${themeToCss(theme?.selected?.press?.background)};
    }
    &:focus {
      ${themeToCss(theme?.selected?.focus?.background)};
    }
  }
`;

interface IStyledListItemProps {
  $theme?: RecursivePartial<IListItemTheme>;
}

const StyledListItem = styled.div<IStyledListItemProps>`
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background-clip: border-box;
  transition-duration: 0.3s;
  cursor: default;
  &.clickable {
    cursor: pointer;
  }
  &.disabled {
    cursor: auto;
  }

  &&&& {
    ${(props: IStyledListItemProps): string => (props.$theme ? ListItemThemedStyle(props.$theme) : '')};
  }
`;

export interface IListItemProps extends IComponentProps<IListItemTheme>, ISingleAnyChildProps {
  itemKey: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClicked?(itemKey: string): void;
}

export function ListItem({
  className = '',
  variant = 'default',
  isDisabled = false,
  isSelected = false,
  ...props
}: IListItemProps): React.ReactElement {
  const isClickable = props.onClicked != null && !isDisabled;
  const onClicked = (): void => {
    // @ts-ignore
    props.onClicked(props.itemKey);
  };

  return (
    <StyledListItem
      id={props.id}
      key={props.itemKey}
      className={getClassName(ListItem.displayName, className, isDisabled && 'disabled', isSelected && 'selected', isClickable && 'clickable', ...(variant?.split('-') || []))}
      $theme={props.theme}
      onClick={isClickable ? onClicked : undefined}
    >
      { props.children }
    </StyledListItem>
  );
}
ListItem.displayName = 'KibaListItem';
