import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';

import { IMoleculeProps, defaultMoleculeProps } from '../moleculeProps';
import {IListItemProps , IListItemTheme, ListItem} from '../../atoms/listItem';
// import { Direction } from '../../model';

export interface IListTheme {
  ListItemTheme: IListItemTheme;
}

interface IStyledListProps {
  theme: IListTheme;
}

const StyledList = styled.ul<IStyledListProps>`
  max-width: 100%;
  overflow: auto;
  list-style: none;
  &.fullWidth {
    width: 100%;
  }
`;

// TODO(krishan711): move this somewhere else if it is used again
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IListItemInnerProps extends Omit<IListItemProps, 'isClickable' | 'onClicked'> {
}

class ListItemInner extends React.Component<IListItemInnerProps> {
  static displayName = 'List.Item';
}

interface IListProps extends IMoleculeProps<IListTheme>, IMultiChildProps<IListItemInnerProps> {
  isFullWidth?: boolean;
  onListItemKeySelected(listItemKey: string): void;
}

export const List = (props: IListProps): React.ReactElement => {
  if (React.Children.count(props.children) === 0) {
    throw new Error('List must have at least one child');
  }

  const onListItemClicked = (listItemKey: string): void => {
    props.onListItemKeySelected(listItemKey);
  };

  return (
    <StyledList
      id={props.id}
      className={getClassName(List.displayName, props.className, props.isFullWidth && 'fullWidth')}
    >
      { React.Children.map(props.children, (child: React.ReactElement<IListItemInnerProps>, index: number): React.ReactElement => (
        <ListItem
          key={child.props.itemKey}
          id={child.props.id}
          className={child.props.className}
          theme={props.theme?.ListItemTheme}
          variant={child.props.variant}
          itemKey={child.props.itemKey}
          isEnabled={child.props.isEnabled}
        //   isCollapsible={child.props.isCollapsible !== undefined ? child.props.isCollapsible : props.isFullWidth}
        //   isExpandable={child.props.isExpandable !== undefined ? child.props.isExpandable : props.isFullWidth}
          onClicked={onListItemClicked}
        >
            {child.props.children}
        </ListItem>
      ))}
    </StyledList>
  );
};
List.displayName = 'List';
List.defaultProps = {
  ...defaultMoleculeProps,
  isFullWidth: false,
};
List.Item = ListItemInner;

interface IManagedListProps extends Omit<IListProps, 'selectedListItemKey' | 'onListItemKeySelected'> {
  onListItemKeyChanged(listItemKey: string): void;
}

// export const ManagedList = (props: IManagedListProps): React.ReactElement => {
//   const [selectedTabKey, setSelectedTabKey] = React.useState<string>();

//   const onTabKeySelected = (tabKey: string): void => {
//     setSelectedTabKey(tabKey);
//   }

//   return (
//     <List
//       {...props}
//       selectedTabKey={selectedTabKey}
//       onTabKeySelected={onTabKeySelected}
//     >
//       { props.children }
//     </List>
//   )
// }