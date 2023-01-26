import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IInputWrapperTheme } from './theme';
import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { HidingView } from '../../wrappers';

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IInputWrapperInnerProps {
  $theme: IInputWrapperTheme;
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
  ${(props) => themeToCss(props.$theme.normal.default.text)};
  ${(props) => themeToCss(props.$theme.normal.default.background)};
  width: 100%;
  overflow: hidden;
  transition-duration: 0.3s;
  & * {
    transition-duration: 0.3s;
  }

  & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
    ${(props) => themeToCss(props.$theme.normal.default.placeholderText)};
  }

  &:hover {
    box-shadow: none;
    ${(props) => themeToCss(props.$theme.normal.hover.text)};
    ${(props) => themeToCss(props.$theme.normal.hover.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.$theme.normal.hover.placeholderText)};
    }
  }

  &.focus, &:focus {
    ${(props) => themeToCss(props.$theme.normal.focus.text)};
    ${(props) => themeToCss(props.$theme.normal.focus.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.$theme.normal.focus.placeholderText)};
    }
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    ${(props) => themeToCss(props.$theme.disabled.default?.text)};
    ${(props) => themeToCss(props.$theme.disabled.default?.background)};
    & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
      ${(props) => themeToCss(props.$theme.disabled.default?.placeholderText)};
    }

    &:hover {
      ${(props) => themeToCss(props.$theme.disabled.hover?.text)};
      ${(props) => themeToCss(props.$theme.disabled.hover?.background)};
      & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
        ${(props) => themeToCss(props.$theme.disabled.hover?.placeholderText)};
      }
    }

    &.focus, &:focus {
      ${(props) => themeToCss(props.$theme.disabled.focus?.text)};
      ${(props) => themeToCss(props.$theme.disabled.focus?.background)};
      & ::placeholder, & input ::placeholder, & textarea ::placeholder, .wrapped-input:empty::before {
        ${(props) => themeToCss(props.$theme.disabled.focus?.placeholderText)};
      }
    }
  }
`;

const StyledMessage = styled.p`
  ${(props) => themeToCss(props.theme.normal.default.messageText)};
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
  const theme = useBuiltTheme('inputWrappers', props.variant, props.theme);

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
        className={getClassName(InputWrapperInner.displayName, props.messageText && 'message-showing', isFocussed && 'focus', !props.isEnabled && 'disabled')}
        $theme={theme}
        onClick={onClicked}
        onFocus={(): void => setIsFocussed(true)}
        onBlur={(): void => setIsFocussed(false)}
      >
        {props.children}
      </InputWrapperInner>
      <HidingView isHidden={!props.messageText}>
        <StyledMessage
          id={props.id && `${props.id}-message`}
          className={getClassName(StyledMessage.displayName)}
          theme={theme}
        >
          {props.messageText}
        </StyledMessage>
      </HidingView>
    </StyledInputWrapper>
  );
};

InputWrapper.displayName = 'InputWrapper';
InputWrapper.defaultProps = {
  ...defaultComponentProps,
};
