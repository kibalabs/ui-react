import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { InputType } from '../../model';
import { IInputFrameTheme, InputFrame } from '../inputFrame';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

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
  onKeyUp?: (key: string) => void;
  onKeyDown?: (key: string) => void;
  // TODO(krishan711): update this to onClicked for the next breaking change
  onClick?: () => void;
  onValueChanged: (value: string) => void;
}

export const SingleLineInput = (props: ISingleLineInputProps): React.ReactElement => {
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

  return (
    <InputFrame
      id={props.id}
      className={getClassName(SingleLineInput.displayName, props.className)}
      theme={props.theme?.inputFrameTheme}
      inputWrapperVariant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={props.isEnabled}
    >
      <StyledSingleLineInput
        id={props.id && `${props.id}-textarea`}
        className={getClassName(StyledSingleLineInput.displayName, !props.isEnabled && 'disabled')}
        type={props.inputType}
        name={props.name}
        autoComplete={getAutocompleteType(props.inputType)}
        value={props.value || ''}
        onClick={onClicked}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={onValueChanged}
        aria-label={props.label || props.name || props.placeholderText}
        placeholder={props.placeholderText}
        autoFocus={props.shouldAutofocus}
      />
    </InputFrame>
  );
};

SingleLineInput.displayName = 'SingleLineInput';
SingleLineInput.defaultProps = {
  ...defaultMoleculeProps,
  isEnabled: true,
  inputType: InputType.Text,
};
