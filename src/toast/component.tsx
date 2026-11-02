import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core/react';

export interface IToastProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  variant?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export function Toast({
  className = '',
  variant = 'default',
  ...props
}: IToastProps): React.ReactElement {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  const onClicked = (event: React.SyntheticEvent): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  const isClickable = props.target != null || props.onClicked != null;

  const toastClassName = getClassName(Toast.displayName, className, isClickable && 'clickable', ...(variant?.split('-') || []));

  if (props.target) {
    if (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp) {
      return (
        <CoreLink
          id={props.id}
          className={toastClassName}
          href={props.target}
          onClick={onClicked}
          tabIndex={props.tabIndex || 0}
        >
          {props.children}
        </CoreLink>
      );
    }
    return (
      <a
        id={props.id}
        className={toastClassName}
        href={props.target}
        rel='noopener noreferrer'
        target={targetShouldOpenSameTab ? '_self' : '_blank'}
        onClick={onClicked}
        tabIndex={props.tabIndex || 0}
      >
        {props.children}
      </a>
    );
  }

  if (props.onClicked) {
    return (
      <button
        id={props.id}
        className={toastClassName}
        onClick={onClicked}
        tabIndex={props.tabIndex || 0}
        type='button'
      >
        {props.children}
      </button>
    );
  }

  return (
    <div
      id={props.id}
      className={toastClassName}
      tabIndex={props.tabIndex || 0}
    >
      {props.children}
    </div>
  );
}
Toast.displayName = 'KibaToast';
