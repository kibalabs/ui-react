import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, OptionalProppedElement } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IListItemProps, IListItemTheme, ListItem } from '../../atoms/listItem';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

export interface IListTheme {
  listItemTheme: IListItemTheme;
}

interface IStyledListProps {
  theme: IListTheme;
}

const StyledList = styled.div<IStyledListProps>`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: auto;

  &.fullWidth {
    width: 100%;
  }
`;

// TODO(krishan711): move this somewhere else if it is used again
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IListItemInnerProps extends Omit<IListItemProps, 'onClicked'> {
}

class ListItemInner extends React.Component<IListItemInnerProps> {
  static displayName = 'List.Item';
}

interface IListProps extends IMoleculeProps<IListTheme>, IMultiChildProps<IListItemInnerProps> {
  isFullWidth?: boolean;
  selectedItemKey?: string;
  onItemClicked(itemKey: string): void;
}

export const List = (props: IListProps): React.ReactElement => {
  if (React.Children.count(props.children) === 0) {
    throw new Error('List must have at least one child');
  }

  const onItemClicked = !props.onItemClicked ? undefined : (itemKey: string): void => {
    props.onItemClicked(itemKey);
  };

  return (
    <StyledList
      id={props.id}
      className={getClassName(List.displayName, props.className, props.isFullWidth && 'fullWidth')}
    >
      { React.Children.map(props.children, (child: OptionalProppedElement<IListItemInnerProps>): React.ReactElement | null => {
        if (!child) {
          return null;
        }
        return (
          <ListItem
            key={child.props.itemKey}
            id={child.props.id}
            className={child.props.className}
            theme={props.theme?.listItemTheme}
            variant={child.props.variant}
            itemKey={child.props.itemKey}
            isDisabled={child.props.isDisabled}
            isSelected={props.selectedItemKey === child.props.itemKey}
            onClicked={onItemClicked}
          >
            {child.props.children}
          </ListItem>
        );
      })}
    </StyledList>
  );
};

List.displayName = 'List';
List.defaultProps = {
  ...defaultMoleculeProps,
};
List.Item = ListItemInner;
