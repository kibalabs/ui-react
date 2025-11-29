import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';


export interface IListItemProps extends IComponentProps, ISingleAnyChildProps {
  itemKey: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClicked?(itemKey: string): void;
}

export function ListItem({
  variant = 'default',
  isDisabled = false,
  isSelected = false,
  ...props
}: IListItemProps): React.ReactElement {
  const isClickable = props.onClicked != null && !isDisabled;
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.itemKey);
    }
  };
  const classNames = getClassName(ListItem.displayName, props.className, isDisabled && 'disabled', isSelected && 'selected', isClickable && 'clickable', ...(variant?.split('-') || []));
  if (isClickable) {
    return (
      <div
        id={props.id}
        key={props.itemKey}
        className={classNames}
        onClick={onClicked}
        onKeyDown={(e) => e.key === 'Enter' && onClicked()}
        role='button'
        tabIndex={0}
        style={props.style}
      >
        { props.children }
      </div>
    );
  }
  return (
    <div
      id={props.id}
      key={props.itemKey}
      className={classNames}
      style={props.style}
    >
      { props.children }
    </div>
  );
}
ListItem.displayName = 'KibaListItem';
