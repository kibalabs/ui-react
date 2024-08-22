import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IInputWrapperTheme, InputWrapper } from '../../atoms';
import { IMoleculeProps } from '../moleculeProps';

export interface IInputFrameTheme {
  inputWrapperTheme?: IInputWrapperTheme;
}

export interface IInputFrameProps extends IMoleculeProps<IInputFrameTheme>, ISingleAnyChildProps {
  messageText?: string;
  isEnabled?: boolean;
  inputWrapperVariant?: string;
  onClicked?: () => void;
}

// NOTE(krishan711): this component is intended to hold anything that would commonly be used alongside input wrapper (e.g. buttons)
export function InputFrame({
  className = '',
  isEnabled = true,
  ...props
}: IInputFrameProps): React.ReactElement {
  return (
    <InputWrapper
      id={props.id}
      className={getClassName(InputFrame.displayName, className)}
      theme={props.theme?.inputWrapperTheme}
      variant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={isEnabled}
      onClicked={props.onClicked}
    >
      {props.children}
    </InputWrapper>
  );
}
InputFrame.displayName = 'KibaInputFrame';
