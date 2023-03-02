import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IInputWrapperTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { HidingView } from '../../wrappers';

export const InputWrapperThemedStyle = (theme: RecursivePartial<IInputWrapperTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  ${themeToCss(theme?.normal?.default?.background)};

  & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
    ${themeToCss(theme?.normal?.default?.placeholderText)};
  }
  &.inputwrapper-message {
    ${themeToCss(theme?.normal?.default?.messageText)};
  }
  &:hover {
    ${themeToCss(theme?.normal?.hover?.text)};
    ${themeToCss(theme?.normal?.hover?.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${themeToCss(theme?.normal?.hover?.placeholderText)};
    }
    &.inputwrapper-message {
      ${themeToCss(theme?.normal?.hover?.messageText)};
    }
  }
  &.focus, &:focus {
    ${themeToCss(theme?.normal?.focus?.text)};
    ${themeToCss(theme?.normal?.focus?.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${themeToCss(theme?.normal?.focus?.placeholderText)};
    }
    &.inputwrapper-message {
      ${themeToCss(theme?.normal?.focus?.messageText)};
    }
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    ${themeToCss(theme?.disabled?.default?.text)};
    ${themeToCss(theme?.disabled?.default?.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${themeToCss(theme?.disabled?.default?.placeholderText)};
    }
    &.inputwrapper-message {
      ${themeToCss(theme?.disabled?.default?.messageText)};
    }
    &:hover {
      ${themeToCss(theme?.disabled?.hover?.text)};
      ${themeToCss(theme?.disabled?.hover?.background)};
      & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
        ${themeToCss(theme?.disabled?.hover?.placeholderText)};
      }
      &.inputwrapper-message {
        ${themeToCss(theme?.disabled?.hover?.messageText)};
      }
    }
    &.focus, &:focus {
      ${themeToCss(theme?.disabled?.focus?.text)};
      ${themeToCss(theme?.disabled?.focus?.background)};
      & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
        ${themeToCss(theme?.disabled?.focus?.placeholderText)};
      }
      &.inputwrapper-message {
        ${themeToCss(theme?.disabled?.focus?.messageText)};
      }
    }
  }

`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IInputWrapperInnerProps {
  $theme?: RecursivePartial<IInputWrapperTheme>;
}

const InputWrapperInner = styled.div<IInputWrapperInnerProps>`
  & input, & textarea, & .wrapped-input {
    /* NOTE(krishan711): these are all the fields of the ITextTheme, can it be done in one line? */
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    line-height: inherit;
  }
  width: 100%;
  overflow: hidden;
  transition-duration: 0.3s;
  & * {
    transition-duration: 0.3s;
  }
  &:hover {
    box-shadow: none;
  }
  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  && {
    ${(props: IInputWrapperInnerProps): string => (props.$theme ? InputWrapperThemedStyle(props.$theme) : '')};
  }
`;

const StyledMessage = styled.p`
  /* TODO(krishan711): move this to the theme or as a gutter prop (see checkbox) */
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  overflow: auto;
  width: 100%;
  text-align: right;
`;

export interface IInputWrapperProps extends IComponentProps<IInputWrapperTheme>, ISingleAnyChildProps {
  messageText?: string;
  isEnabled?: boolean;
  onClicked?: () => void;
  // isFocussed?: boolean;
}

export const InputWrapper = (props: IInputWrapperProps): React.ReactElement => {
  // :focus-within is not supported on all browsers so we manually maintain if this particle has a isFocussed child
  const [isFocussed, setIsFocussed] = React.useState(false);

  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  // TODO(krishan711): check that the first child is an input, textarea or .wrapped-input
  return (
    <StyledInputWrapper
      id={props.id}
      className={getClassName(InputWrapper.displayName, props.className)}
    >
      <InputWrapperInner
        id={props.id && `${props.id}-inner`}
        className={getClassName(InputWrapperInner.displayName, props.messageText && 'message-showing', isFocussed && 'focus', !props.isEnabled && 'disabled', ...(props.variant?.split('-') || []))}
        $theme={props.theme}
        onClick={onClicked}
        onFocus={(): void => setIsFocussed(true)}
        onBlur={(): void => setIsFocussed(false)}
      >
        {props.children}
      </InputWrapperInner>
      <HidingView isHidden={!props.messageText}>
        <StyledMessage
          id={props.id && `${props.id}-message`}
          className={'inputwrapper-message'}
        >
          {props.messageText}
        </StyledMessage>
      </HidingView>
    </StyledInputWrapper>
  );
};

InputWrapper.displayName = 'KibaInputWrapper';
InputWrapper.defaultProps = {
  ...defaultComponentProps,
};
