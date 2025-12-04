import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';


export interface ILinkBaseProps extends IComponentProps, ISingleAnyChildProps {
  isEnabled?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  label?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export function LinkBase({
  variant = 'default',
  isEnabled = true,
  isFullWidth = false,
  isFullHeight = false,
  ...props
}: ILinkBaseProps): React.ReactElement {
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
  const LinkComponent = props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : 'button';
  const href = props.target || '';
  return (
    <LinkComponent
      id={props.id}
      className={getClassName(LinkBase.displayName, props.className, isFullWidth && 'fullWidth', isFullHeight && 'fullHeight', !isEnabled && 'disabled', ...(variant?.split('-') || []))}
      onClick={onClicked}
      aria-label={props.label}
      // @ts-expect-error - href is only undefined when LinkComponent is 'button', which doesn't need href
      href={props.target ? href : undefined}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      style={props.style}
    >
      {props.children}
    </LinkComponent>
  );
}
LinkBase.displayName = 'KibaLinkBase';
