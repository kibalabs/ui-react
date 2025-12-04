import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { HidingView } from '../../wrappers';


export interface IInputWrapperProps extends IComponentProps, ISingleAnyChildProps {
  messageText?: string;
  isEnabled?: boolean;
  onClicked?: () => void;
}

export function InputWrapper({
  className = '',
  variant = 'default',
  ...props
}: IInputWrapperProps): React.ReactElement {
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };
  const onKeyDown = (event: React.KeyboardEvent): void => {
    if (props.onClicked && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      props.onClicked();
    }
  };
  return (
    <div
      id={props.id}
      className={getClassName(InputWrapper.displayName, className, props.messageText && 'message-showing', isFocussed && 'focus', !props.isEnabled && 'disabled', ...(variant?.split('-') || []))}
      style={props.style}
    >
      {/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <div
        role={props.onClicked ? 'button' : undefined}
        tabIndex={props.onClicked ? 0 : undefined}
        id={props.id && `${props.id}-inner`}
        className='KibaInputWrapperInner'
        onClick={onClicked}
        onKeyDown={props.onClicked ? onKeyDown : undefined}
        onFocus={(): void => setIsFocussed(true)}
        onBlur={(): void => setIsFocussed(false)}
      >
        {props.children}
      </div>
      {/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <HidingView isHidden={!props.messageText}>
        <p
          id={props.id && `${props.id}-message`}
          className='KibaInputWrapperMessage'
        >
          {props.messageText}
        </p>
      </HidingView>
    </div>
  );
}
InputWrapper.displayName = 'KibaInputWrapper';
