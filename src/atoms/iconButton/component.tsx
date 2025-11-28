import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { IIconProps } from '../../particles/icon';


export interface IIconButtonProps extends IComponentProps {
  isEnabled?: boolean;
  icon: React.ReactElement<IIconProps>;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  buttonType?: 'button' | 'reset' | 'submit';
  label?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export function IconButton({
  className = '',
  variant = 'default',
  label = 'Icon Button',
  isEnabled = true,
  ...props
}: IIconButtonProps): React.ReactElement {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();
  const onClicked = (event: React.SyntheticEvent): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };
  if (props.onClicked && props.buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }
  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  const ButtonComponent = props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : 'button';
  return (
    <ButtonComponent
      id={props.id}
      className={getClassName(IconButton.displayName, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', !isEnabled && 'disabled', className, ...(variant?.split('-') || []))}
      onClick={onClicked}
      disabled={!isEnabled}
      aria-label={label}
      href={props.target}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      type={props.target ? undefined : (props.buttonType || 'button')}
    >
      <span className='KibaIconButtonFocusFixer' tabIndex={-1}>
        {props.icon}
      </span>
    </ButtonComponent>
  );
}
IconButton.displayName = 'KibaIconButton';
