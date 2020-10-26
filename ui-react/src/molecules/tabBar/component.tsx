import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';

import { IMoleculeProps, defaultMoleculeProps } from '../moleculeProps';
import { TabBarItem, ITabBarItemTheme, ITabBarItemProps } from '../../atoms/tabBarItem';
import { Direction } from '../../model';

export interface ITabBarTheme {
  tabBarItemTheme: ITabBarItemTheme;
}

interface IStyledTabBarProps {
  theme: ITabBarTheme;
}

const StyledTabBar = styled.div<IStyledTabBarProps>`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: auto;

  &.fullWidth {
    width: 100%;
  }
`;

// TODO(krishan711): move this somewhere else if it is used again
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ITabBarItemInnerProps extends Omit<ITabBarItemProps, 'isSelected' | 'onClicked'> {
}

class TabBarItemInner extends React.Component<ITabBarItemInnerProps> {
  static displayName = 'TabBar.Item';
}

interface ITabBarProps extends IMoleculeProps<ITabBarTheme>, IMultiChildProps<ITabBarItemInnerProps> {
  isFullWidth: boolean;
  selectedTabKey: string;
  onTabKeySelected(tabKey: string): void;
}

export const TabBar = (props: ITabBarProps): React.ReactElement => {
  if (React.Children.count(props.children) === 0) {
    throw new Error('TabBar must have at least one child');
  }

  const onTabClicked = (tabKey: string): void => {
    props.onTabKeySelected(tabKey);
  };

  return (
    <StyledTabBar
      id={props.id}
      className={getClassName(TabBar.displayName, props.className, props.isFullWidth && 'fullWidth')}
    >
      { React.Children.map(props.children, (child: React.ReactElement<TabBarItemInnerProps>, index: number): React.ReactElement => (
        <TabBarItem
          key={child.props.tabKey}
          id={child.props.id}
          className={child.props.className}
          theme={props.theme?.tabBarItemTheme}
          variant={child.props.variant}
          tabKey={child.props.tabKey}
          text={child.props.text}
          isEnabled={child.props.isEnabled}
          isCollapsible={child.props.isCollapsible !== undefined ? child.props.isCollapsible : props.isFullWidth}
          isExpandable={child.props.isExpandable !== undefined ? child.props.isExpandable : props.isFullWidth}
          isSelected={(props.selectedTabKey === undefined && index === 0) || props.selectedTabKey === child.props.tabKey}
          onClicked={onTabClicked}
        />
      ))}
    </StyledTabBar>
  );
};
TabBar.displayName = 'TabBar';
TabBar.defaultProps = {
  ...defaultMoleculeProps,
  isFullWidth: false,
};
TabBar.Item = TabBarItemInner;

interface IManagedTabBarProps extends Omit<ITabBarProps, 'selectedTabKey' | 'onTabKeySelected'> {
  onTabKeyChanged(tabKey: string): void;
}

// export const ManagedTabBar = (props: IManagedTabBarProps): React.ReactElement => {
//   const [selectedTabKey, setSelectedTabKey] = React.useState<string>();

//   const onTabKeySelected = (tabKey: string): void => {
//     setSelectedTabKey(tabKey);
//   }

//   return (
//     <TabBar
//       {...props}
//       selectedTabKey={selectedTabKey}
//       onTabKeySelected={onTabKeySelected}
//     >
//       { props.children }
//     </TabBar>
//   )
// }
