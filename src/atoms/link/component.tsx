import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';


export interface ILinkProps extends IComponentProps {
  text: string;
  isEnabled?: boolean;
  target?: string;
  tabIndex?: number;
  shouldOpenSameTab?: boolean;
  onClicked?: () => void;
}

export function Link({
  variant = 'default',
  isEnabled = true,
  ...props
}: ILinkProps): React.ReactElement {
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
  const targetShouldOpenSameTab = props.shouldOpenSameTab || props.target?.startsWith('#') || (props.shouldOpenSameTab == null && isTargetWithinApp);
  const LinkComponent = props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : 'a';
  const href = (isEnabled && props.target) ? props.target : '';
  return (
    <LinkComponent
      id={props.id}
      className={getClassName(Link.displayName, props.className, !isEnabled && 'disabled', ...(variant?.split('-') || []))}
      onClick={onClicked}
      // @ts-expect-error - href is only undefined when disabled or no target, in which case it's not CoreLink
      href={isEnabled && props.target ? href : undefined}
      rel='noopener'
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      style={props.style}
    >
      {props.text}
    </LinkComponent>
  );
}
Link.displayName = 'KibaLink';
