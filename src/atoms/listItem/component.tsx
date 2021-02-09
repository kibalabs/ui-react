import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps } from '../../model';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { IListItemTheme } from './theme';

interface IStyledListItemProps {
  theme: IListItemTheme;
  isClickable: boolean;
}

const StyledListItem = styled.li<IStyledListItemProps>`
  ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: ${(props: IStyledListItemProps): string => (props.isClickable ? 'pointer' : 'default')};
  outline: none;
  width: auto;
  transition-duration: 0.3s;

  &:hover {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.default?.background)};
    &:hover {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.hover?.background)};
    }
    &:active {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.press?.background)};
    }
    &:focus {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.disabled?.focus?.background)};
    }
  }
  // &.selected {
  //   ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.default?.background)};
  //   &:hover {
  //     ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.hover?.background)};
  //   }
  //   &:active {
  //     ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.press?.background)};
  //   }
  //   &:focus {
  //     ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.focus?.background)};
  //   }
  // }
`;

export interface IListItemProps extends IComponentProps<IListItemTheme>, ISingleAnyChildProps {
  itemKey: string;
  isEnabled: boolean;
  onClicked?(listItemKey: string): void;
}

export const ListItem = (props: IListItemProps): React.ReactElement => {
  const onClicked = !props.onClicked ? undefined : (): void => {
    props.onClicked(props.itemKey);
  };

  const theme = useBuiltTheme('listItems', props.variant, props.theme);
  return (
    <StyledListItem
      id={props.id}
      key={props.itemKey}
      className={getClassName(ListItem.displayName, props.className, !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      isClickable={onClicked !== undefined}
    >
      { props.children }
    </StyledListItem>
  );
};

ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
