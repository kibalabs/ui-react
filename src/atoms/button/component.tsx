import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';

import './styles.scss';
import { Alignment, IComponentProps } from '../../model';
import { IIconProps, LoadingSpinner, PaddingSize, Spacing } from '../../particles';

export { ButtonThemedStyle } from '../../util/legacyThemeCompat';

export interface IButtonProps extends IComponentProps {
  text: string;
  isEnabled?: boolean;
  isLoading?: boolean;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  buttonType?: 'button' | 'reset' | 'submit';
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  isTextFullWidth?: boolean;
  onClicked?(): void;
}

export function Button({
  className = '',
  variant = 'default',
  isEnabled = true,
  isTextFullWidth = true,
  iconGutter = PaddingSize.Default,
  contentAlignment = Alignment.Fill,
  childAlignment = Alignment.Center,
  buttonType = 'button',
  isFullHeight = false,
  isFullWidth = false,
  ...props
}: IButtonProps): React.ReactElement {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  if (props.onClicked && buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use props.onClicked. use the form.onSubmitted instead');
  }

  const onButtonClicked = (event: React.SyntheticEvent): void => {
    if (props.isLoading) {
      return;
    }
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const innerTargetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);

  const Component = props.target ? (isUsingCoreRouting && innerTargetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : 'button';
  const variantClasses = (variant?.split('-') || []).join(' ');

  return (
    // @ts-ignore: dynamic component type
    <Component
      id={props.id}
      className={getClassName(
        Button.displayName,
        className,
        'KibaButton-base',
        isFullWidth && 'fullWidth',
        isFullHeight && 'fullHeight',
        !isEnabled && 'disabled',
        props.isLoading && 'isLoading',
        variantClasses,
      )}
      onClick={onButtonClicked}
      disabled={!isEnabled}
      // @ts-ignore: href can be undefined for button
      href={props.target || undefined}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (innerTargetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      type={buttonType || 'button'}
      style={props.style}
    >
      <span
        className='KibaButtonFocusFixer'
        tabIndex={-1}
        style={{
          // @ts-ignore
          alignItems: childAlignment,
          // @ts-ignore
          justifyContent: contentAlignment,
        }}
      >
        {!props.isLoading && props.iconLeft && (
          <React.Fragment>
            {props.iconLeft}
            <Spacing variant={iconGutter} />
          </React.Fragment>
        )}
        {!props.isLoading && (
          <span className={getClassName('KibaButton-text', isTextFullWidth && 'fullWidth')}>{props.text}</span>
        )}
        {!props.isLoading && props.iconRight && (
          <React.Fragment>
            <Spacing variant={iconGutter} />
            {props.iconRight}
          </React.Fragment>
        )}
        {props.isLoading && (
          <LoadingSpinner
            id={props.id && `${props.id}-loading-spinner`}
            variant='light-small'
          />
        )}
      </span>
    </Component>
  );
}
Button.displayName = 'KibaButton';
