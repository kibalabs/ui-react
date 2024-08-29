import React from 'react';

import { getClassName } from '@kibalabs/core';
import { OptionalProppedElement } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Alignment, InputType } from '../../model';
import { IIconProps, PaddingSize } from '../../particles';
import { IInputFrameTheme, InputFrame } from '../inputFrame';
import { IMoleculeProps } from '../moleculeProps';


export interface ISingleLineInputTheme {
  inputFrameTheme: IInputFrameTheme;
}

const StyledSingleLineInput = styled.input`
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
  isEnabled?: boolean;
  placeholderText?: string;
  messageText?: string;
  inputType?: InputType;
  name?: string;
  label?: string;
  inputWrapperVariant?: string;
  shouldAutofocus?: boolean;
  shouldHideNumberSpinButtons?: boolean;
  shouldStopNumberScrolling?: boolean;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  onKeyUp?: (key: string) => void;
  onKeyDown?: (key: string) => void;
  onClicked?: () => void;
  onFrameClicked?: () => void;
  onValueChanged: (value: string) => void;
}

export const SingleLineInput = React.forwardRef(({
  className = '',
  isEnabled = true,
  inputType = InputType.Text,
  ...props
}: ISingleLineInputProps, ref: React.ForwardedRef<HTMLInputElement>): React.ReactElement => {
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

  const onClicked = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    event.stopPropagation();
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
      iconRight={props.iconRight}
      iconLeft={props.iconLeft}
      iconGutter={props.iconGutter}
      childAlignment={props.childAlignment}
      contentAlignment={props.contentAlignment}
      onClicked={props.onFrameClicked}
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
        ref={ref}
      />
    </InputFrame>
  );
});
SingleLineInput.displayName = 'KibaSingleLineInput';
