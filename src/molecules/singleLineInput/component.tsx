import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { InputType } from '../../model';
import { IInputFrameTheme, InputFrame } from '../inputFrame';
import { IMoleculeProps } from '../moleculeProps';

export interface ISingleLineInputTheme {
  inputFrameTheme: IInputFrameTheme;
}

const StyledSingleLineInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: text;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: none;

  &:hover {
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }

  &.disabled {
    pointer-events: none;
  }

  &.hideSpinButtons {
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const getAutocompleteType = (inputType: InputType): string | undefined => {
  if (inputType === InputType.Email) {
    return 'email';
  } if (inputType === InputType.Url) {
    return 'url';
  }
  return undefined;
};

export interface ISingleLineInputProps extends IMoleculeProps<ISingleLineInputTheme> {
  value: string | null;
  isEnabled: boolean;
  placeholderText?: string;
  messageText?: string;
  inputType: InputType;
  name?: string;
  label?: string;
  inputWrapperVariant?: string;
  shouldAutofocus?: boolean;
  shouldHideNumberSpinButtons?: boolean;
  shouldStopNumberScrolling?: boolean;
  onKeyUp?: (key: string) => void;
  onKeyDown?: (key: string) => void;
  // TODO(krishan711): update this to onClicked for the next breaking change
  onClick?: () => void;
  onValueChanged: (value: string) => void;
}

export function SingleLineInput({
  className = '',
  isEnabled = true,
  inputType = InputType.Text,
  ...props
}: ISingleLineInputProps): React.ReactElement {
  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.onValueChanged) {
      props.onValueChanged(event.target.value);
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (props.onKeyUp) {
      props.onKeyUp(event.key);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (props.onKeyDown) {
      props.onKeyDown(event.key);
    }
  };

  const onClicked = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const onWheelCapture = (event: React.WheelEvent<HTMLInputElement>): void => {
    if (props.shouldStopNumberScrolling) {
      event.currentTarget.blur();
    }
  };

  return (
    <InputFrame
      id={props.id}
      className={getClassName(SingleLineInput.displayName, className)}
      theme={props.theme?.inputFrameTheme}
      inputWrapperVariant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={isEnabled}
    >
      <StyledSingleLineInput
        id={props.id && `${props.id}-textarea`}
        className={getClassName(StyledSingleLineInput.displayName, !isEnabled && 'disabled', props.shouldHideNumberSpinButtons && 'hideSpinButtons')}
        type={inputType}
        name={props.name}
        autoComplete={getAutocompleteType(inputType)}
        value={props.value || ''}
        onClick={onClicked}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={onValueChanged}
        aria-label={props.label || props.name || props.placeholderText}
        placeholder={props.placeholderText}
        autoFocus={props.shouldAutofocus}
        onWheelCapture={onWheelCapture}
      />
    </InputFrame>
  );
}
SingleLineInput.displayName = 'KibaSingleLineInput';
