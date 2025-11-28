import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { IComponentProps } from '../../model';
import { Icon, PaddingSize, Spacing } from '../../particles';

export { CheckboxThemedStyle } from '../../util/legacyThemeCompat';

interface ICheckBoxProps extends IComponentProps {
  text: string;
  isChecked: boolean;
  isDisabled?: boolean;
  gutter?: PaddingSize;
  onToggled?(): void;
}

export function Checkbox({
  variant = 'default',
  ...props
}: ICheckBoxProps): React.ReactElement {
  const isDisabled = props.isDisabled;
  const propsOnToggled = props.onToggled;
  const onToggled = React.useCallback((): void => {
    if (!isDisabled && propsOnToggled) {
      propsOnToggled();
    }
  }, [isDisabled, propsOnToggled]);
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      id={props.id}
      className={getClassName(Checkbox.displayName, props.className, props.isDisabled && 'disabled', props.isChecked && 'checked', ...(variant?.split('-') || []))}
      style={props.style}
    >
      <input
        className='checkbox-hidden'
        type='checkbox'
        checked={props.isChecked}
        disabled={isDisabled}
        onChange={onToggled}
      />
      <div className='checkbox-inner'>
        {props.isChecked && (
          <Icon variant='fill' svgContent='<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.365 4.5379c0.8075 0.75366 0.8512 2.0192 0.0975 2.8267l-11.2 12c-0.36243 0.3884-0.86448 0.6166-1.3954 0.6343s-1.047-0.1765-1.4346-0.5398l-4.8-4.5c-0.80582-0.7555-0.84665-2.0212-0.09119-2.827s2.0211-0.8466 2.827-0.0912l3.3377 3.1291 9.8323-10.535c0.7537-0.8075 2.0192-0.85114 2.8267-0.09747z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/></svg>' />
        )}
      </div>
      <Spacing variant={props.gutter || PaddingSize.Default} />
      <span className='checkbox-text'>{ props.text }</span>
    </label>
  );
}
Checkbox.displayName = 'KibaCheckbox';
