import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

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

interface IStyledInputWrapperProps {
  $theme?: RecursivePartial<IInputWrapperTheme>;
}

const StyledInputWrapper = styled.div<IStyledInputWrapperProps>`
  display: flex;
  flex-direction: column;
  transition-duration: 0.3s;
  & * {
    transition-duration: 0.3s;
  }
  &:hover > .KibaInputWrapperInner {
    box-shadow: none;
  }
  &.disabled > .KibaInputWrapperInner {
    cursor: not-allowed;
    pointer-events: none;
  }

  &&&& {
    ${(props: IStyledInputWrapperProps): string => (props.$theme ? InputWrapperThemedStyle(props.$theme) : '')};
  }
`;

const InputWrapperInner = styled.div`
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
  cursor: pointer;
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

export function InputWrapper({
  className = '',
  variant = 'default',
  ...props
}: IInputWrapperProps): React.ReactElement {
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
      className={getClassName(InputWrapper.displayName, className, props.messageText && 'message-showing', isFocussed && 'focus', !props.isEnabled && 'disabled', ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      <InputWrapperInner
        id={props.id && `${props.id}-inner`}
        className='KibaInputWrapperInner'
        onClick={onClicked}
        onFocus={(): void => setIsFocussed(true)}
        onBlur={(): void => setIsFocussed(false)}
        tabIndex={0}
      >
        {props.children}
      </InputWrapperInner>
      <HidingView isHidden={!props.messageText}>
        <StyledMessage
          id={props.id && `${props.id}-message`}
          className='KibaInputWrapperMessage'
        >
          {props.messageText}
        </StyledMessage>
      </HidingView>
    </StyledInputWrapper>
  );
}
InputWrapper.displayName = 'KibaInputWrapper';
