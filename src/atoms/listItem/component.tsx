import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Stack } from '../../layouts';
import { defaultComponentProps, Direction, IComponentProps } from '../../model';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { IListItemTheme } from './theme';

interface IStyledListItemProps {
  theme: IListItemTheme;
  isClickable: boolean;
}

interface IStyledHRProps {
  dividerColor: string;
}

const StyledHR = styled.hr`
  border-top: 1px solid ${(props: IStyledHRProps) => props.dividerColor};
  border-bottom: 1px solid ${(props: IStyledHRProps) => props.dividerColor};
  width: 80%;
  margin: 0.5rem auto 0.5rem auto;
  
`;

const StyledListItem = styled.div<IStyledListItemProps>`
  ${(props: IStyledListItemProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: ${(props: IStyledListItemProps): string => (props.isClickable ? 'pointer' : 'default')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background-clip: border-box;
  transition-duration: 0.3s;

  &:hover {
    ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.normal.hover?.background) : '')};
  }
  &:active {
    ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.normal.press?.background) : '')};
  }
  &:focus {
    ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.normal.focus?.background) : '')};
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.disabled?.default?.background) : '')};
    &:hover {
      ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.disabled?.hover?.background) : '')};
    }
    &:active {
      ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.disabled?.press?.background) : '')};
    }
    &:focus {
      ${(props: IStyledListItemProps): string => (props.isClickable ? themeToCss(props.theme.disabled?.focus?.background) : '')};
    }
  }
  &.selected {
    ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.default?.background)};
    &:hover {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.hover?.background)};
    }
    &:active {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.press?.background)};
    }
    &:focus {
      ${(props: IStyledListItemProps): string => themeToCss(props.theme.selected?.focus?.background)};
    }
  }
`;

export interface IListItemProps extends IComponentProps<IListItemTheme>, ISingleAnyChildProps {
  itemKey: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  dividerColor?: string;
  onClicked?(itemKey: string): void;
}

export const ListItem = (props: IListItemProps): React.ReactElement => {
  const onClicked = !props.onClicked ? undefined : (): void => {
    // @ts-ignore
    props.onClicked(props.itemKey);
  };

  const dividerColor = props.dividerColor || '#aaa';
  const theme = useBuiltTheme('listItems', props.variant, props.theme);
  return (
    <Stack direction={Direction.Vertical}>
      <StyledListItem
        id={props.id}
        key={props.itemKey}
        className={getClassName(ListItem.displayName, props.className, props.isDisabled && 'disabled', props.isSelected && 'selected')}
        theme={theme}
        onClick={onClicked}
        isClickable={onClicked != null}
      >
        { props.children }
      </StyledListItem>
      <StyledHR dividerColor={dividerColor} />
    </Stack>
  );
};

ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  isDisabled: false,
  ...defaultComponentProps,
};
