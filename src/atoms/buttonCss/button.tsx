// ui-react/components/button.tsx
import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';

import * as defaultStyles from './button.module.scss';
import { Alignment } from '../../model';
import { IIconProps, LoadingSpinner, PaddingSize, Spacing } from '../../particles';


export interface IButtonCssProps {
  id?: string;
  className?: string;
  variant?: string;
  text: string;
  isDisabled?: boolean;
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
  styles?: Record<string, string>; // CSS Module styles
}

export function ButtonCss({
  className = '',
  isTextFullWidth = true,
  iconGutter = PaddingSize.Default,
  contentAlignment = Alignment.Fill,
  childAlignment = Alignment.Center,
  buttonType = 'button',
  isFullHeight = false,
  isFullWidth = false,
  styles = defaultStyles,
  ...props
}: IButtonCssProps): React.ReactElement {
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

  // Inline alignment (for simplicity, can move to SCSS if needed)
  const alignmentStyles = {
    justifyContent: contentAlignment === Alignment.Start ? 'flex-start' : contentAlignment === Alignment.End ? 'flex-end' : 'center',
    alignItems: childAlignment === Alignment.Start ? 'flex-start' : childAlignment === Alignment.End ? 'flex-end' : 'center',
  };

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const innerTargetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);

  const children = (
    <span
      className={getClassName(
        'KibaButtonFocusFixed',
        styles.focusFixer,
      )}
      style={alignmentStyles}
    >
      {!props.isLoading && props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing variant={iconGutter} />
        </React.Fragment>
      )}
      {!props.isLoading && (
        <span
          className={getClassName(
            'KibaButtonText',
            styles.text,
            isTextFullWidth && styles.textFullWidth,
          )}
        >
          {props.text}
        </span>
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
  );

  const fullClassName = getClassName(
    ButtonCss.displayName,
    className,
    styles.button,
    isFullWidth && styles.fullWidth,
    isFullHeight && styles.fullHeight,
    props.isDisabled && styles.disabled,
    props.isLoading && styles.loading,
    ...(props.variant?.split('-').map((innerVariant: string): string => styles[innerVariant])) || [],
  );

  if (props.target) {
    if (isUsingCoreRouting && innerTargetShouldOpenSameTab && isTargetWithinApp) {
      return (
        <CoreLink
          id={props.id}
          className={fullClassName}
          onClick={onButtonClicked}
          href={props.target}
          rel='noopener'
          tabIndex={props.tabIndex || 0}
          target={innerTargetShouldOpenSameTab ? '_self' : '_blank'}
          type={buttonType || 'button'}
        >
          {children}
        </CoreLink>
      );
    }
    return (
      <a
        id={props.id}
        className={fullClassName}
        onClick={onButtonClicked}
        href={props.target}
        rel='noopener noreferrer'
        tabIndex={props.tabIndex || 0}
        target={innerTargetShouldOpenSameTab ? '_self' : '_blank'}
        type={buttonType || 'button'}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      id={props.id}
      className={fullClassName}
      onClick={onButtonClicked}
      disabled={props.isDisabled}
      tabIndex={props.tabIndex || 0}
      // eslint-disable-next-line react/button-has-type
      type={buttonType || 'button'}
    >
      {children}
    </button>
  );
}
ButtonCss.displayName = 'KibaButton';
