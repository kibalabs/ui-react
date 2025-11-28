import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';

export { ProgressCounterItemThemedStyle } from '../../util/legacyThemeCompat';

export interface IProgressCounterItemProps extends IComponentProps {
  text: string;
  isEnabled?: boolean;
  isSelected?: boolean;
  onClicked?(): void;
}

export function ProgressCounterItem({
  variant = 'default',
  isEnabled = true,
  isSelected = false,
  ...props
}: IProgressCounterItemProps): React.ReactElement {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };
  return (
    <button
      type='button'
      id={props.id}
      className={getClassName(ProgressCounterItem.displayName, props.className, !isEnabled && 'disabled', isSelected && 'selected', ...(variant?.split('-') || []))}
      style={props.style}
      onClick={onClicked}
      disabled={!isEnabled}
    >
      { props.text }
    </button>
  );
}
ProgressCounterItem.displayName = 'KibaProgressCounterItem';
