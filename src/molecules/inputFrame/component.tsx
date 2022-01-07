import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { IInputWrapperTheme, InputWrapper } from '../../atoms';
import { setDefaults } from '../../util/SetDefaultProps';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

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
export const InputFrame = (inputProps: IInputFrameProps): React.ReactElement => {
  const props = setDefaults(inputProps, {
    ...defaultMoleculeProps,
    isEnabled: true,
  });

  return (
    <InputWrapper
      id={props.id}
      className={getClassName(InputFrame.displayName, props.className)}
      theme={props.theme?.inputWrapperTheme}
      variant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={props.isEnabled}
      onClicked={props.onClicked}
    >
      {props.children}
    </InputWrapper>
  );
};

InputFrame.displayName = 'InputFrame';
