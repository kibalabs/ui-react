import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IInputWrapperTheme } from './theme';
import { IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { HidingView } from '../../wrappers';

export const InputWrapperThemedStyle = (theme: RecursivePartial<IInputWrapperTheme>): string => `
  & > .KibaInputWrapperInner {
    ${themeToCss(theme?.normal?.default?.text)};
    ${themeToCss(theme?.normal?.default?.background)};
  }
  & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
    ${themeToCss(theme?.normal?.default?.placeholderText)};
  }
  & > .KibaInputWrapperInner .KibaInputWrapperMessage {
    ${themeToCss(theme?.normal?.default?.messageText)};
  }
  &:hover {
    & > .KibaInputWrapperInner {
      ${themeToCss(theme?.normal?.hover?.text)};
      ${themeToCss(theme?.normal?.hover?.background)};
    }
    & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
      ${themeToCss(theme?.normal?.hover?.placeholderText)};
    }
    & > .KibaInputWrapperInner .KibaInputWrapperMessage {
      ${themeToCss(theme?.normal?.hover?.messageText)};
    }
  }
  &.focus, &:focus {
    & > .KibaInputWrapperInner {
      ${themeToCss(theme?.normal?.focus?.text)};
      ${themeToCss(theme?.normal?.focus?.background)};
    }
    & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
      ${themeToCss(theme?.normal?.focus?.placeholderText)};
    }
    & > .KibaInputWrapperInner .KibaInputWrapperMessage {
      ${themeToCss(theme?.normal?.focus?.messageText)};
    }
  }
  &.disabled {
    & > .KibaInputWrapperInner {
      ${themeToCss(theme?.disabled?.default?.text)};
      ${themeToCss(theme?.disabled?.default?.background)};
    }
    & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
      ${themeToCss(theme?.disabled?.default?.placeholderText)};
    }
    & > .KibaInputWrapperInner .KibaInputWrapperMessage {
      ${themeToCss(theme?.disabled?.default?.messageText)};
    }
    &:hover {
      ${themeToCss(theme?.disabled?.hover?.text)};
      ${themeToCss(theme?.disabled?.hover?.background)};
      & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
        ${themeToCss(theme?.disabled?.hover?.placeholderText)};
      }
      & > .KibaInputWrapperInner .KibaInputWrapperMessage {
        ${themeToCss(theme?.disabled?.hover?.messageText)};
      }
    }
    &.focus, &:focus {
      ${themeToCss(theme?.disabled?.focus?.text)};
      ${themeToCss(theme?.disabled?.focus?.background)};
      & > .KibaInputWrapperInner ::placeholder, & > .KibaInputWrapperInner input ::placeholder, & > .KibaInputWrapperInner textarea ::placeholder, & > .KibaInputWrapperInner .wrapped-input:empty::before {
        ${themeToCss(theme?.disabled?.focus?.placeholderText)};
      }
      & > .KibaInputWrapperInner .KibaInputWrapperMessage {
        ${themeToCss(theme?.disabled?.focus?.messageText)};
      }
    }
  }

`;

export interface IInputWrapperProps extends IComponentProps<IInputWrapperTheme>, ISingleAnyChildProps {
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
  return (
    <div
      id={props.id}
      className={getClassName(InputWrapper.displayName, className, props.messageText && 'message-showing', isFocussed && 'focus', !props.isEnabled && 'disabled', ...(variant?.split('-') || []))}
    >
      <div
        id={props.id && `${props.id}-inner`}
        className='KibaInputWrapperInner'
        onClick={onClicked}
        onFocus={(): void => setIsFocussed(true)}
        onBlur={(): void => setIsFocussed(false)}
      >
        {props.children}
      </div>
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
