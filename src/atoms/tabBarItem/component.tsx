import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';


export interface ITabBarItemProps extends IComponentProps {
  tabKey: string;
  text: string;
  isEnabled?: boolean;
  isSelected?: boolean;
  isCollapsible?: boolean;
  isExpandable?: boolean;
  onClicked?(tabKey: string): void;
}

export function TabBarItem({
  variant = 'default',
  ...props
}: ITabBarItemProps): React.ReactElement {
  const isEnabled = props.isEnabled == null ? true : props.isEnabled;
  const isExpandable = props.isExpandable == null ? true : props.isExpandable;
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.tabKey);
    }
  };
  return (
    <button
      id={props.id}
      className={getClassName(TabBarItem.displayName, props.className, !isEnabled && 'disabled', props.isSelected && 'selected', props.isCollapsible && 'collapsible', isExpandable && 'expandable', ...(variant?.split('-') || []))}
      onClick={onClicked}
      disabled={!isEnabled}
      style={props.style}
      type='button'
    >
      { props.text }
    </button>
  );
}
TabBarItem.displayName = 'KibaTabBarItem';
