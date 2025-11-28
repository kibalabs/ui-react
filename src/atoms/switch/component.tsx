import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';

export { SwitchThemedStyle } from '../../util/legacyThemeCompat';

export interface ISwitchProps extends IComponentProps {
  isEnabled?: boolean;
  isChecked: boolean;
  label?: string;
  onToggled?(): void;
}

export function Switch({
  variant = 'default',
  ...props
}: ISwitchProps): React.ReactElement {
  const isEnabled = props.isEnabled !== undefined ? props.isEnabled : true;
  const onToggled = () => {
    if (isEnabled && props.onToggled) {
      props.onToggled();
    }
  };
  return (
    <button
      id={props.id}
      className={getClassName(Switch.displayName, props.className, !isEnabled && 'disabled', props.isChecked && 'checked', ...(variant?.split('-') || []))}
      role='switch'
      aria-checked={props.isChecked}
      aria-label={props.label}
      onClick={onToggled}
      style={props.style}
      type='button'
    >
      <div className='KibaSwitchInner' />
    </button>
  );
}
Switch.displayName = 'KibaSwitch';
