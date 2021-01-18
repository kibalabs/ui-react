import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IInputFrameTheme, InputFrame } from '../inputFrame';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';


export interface IMultiLineInputTheme {
  inputFrameTheme: IInputFrameTheme;
}

const StyledMultiLineTextArea = styled.textarea`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: text;
  overflow: hidden;
  resize: none;
  padding: 1px 0;
  margin: 1px;
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
interface IMultiLineInputProps extends IMoleculeProps<IMultiLineInputTheme> {
  value: string| null;
  isEnabled: boolean;
  minRowCount: number;
  maxRowCount: number;
  placeholderText?: string;
  inputWrapperVariant?: string;
  messageText?: string;
  shouldDisableCopy: boolean;
  shouldDisableCut: boolean;
  shouldDisablePaste: boolean;
  shouldDisableDrop: boolean;
  shouldDisableDrag: boolean;
  onKeyUp?(key: string): void;
  onKeyDown?(key: string): void;
  onValueChanged(value: string): void;
}
export const MultiLineInput = (props: IMultiLineInputProps): React.ReactElement => {
  const [rowCount, setRowCount] = React.useState(props.minRowCount);
  const handleCopy = (event: React.ClipboardEvent<HTMLElement>): void => {
    if (props.shouldDisableCopy) {
      event.preventDefault();
    }
  };
  const handleCut = (event: React.ClipboardEvent<HTMLElement>): void => {
    if (props.shouldDisableCut) {
      event.preventDefault();
    }
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLElement>): void => {
    if (props.shouldDisablePaste) {
      event.preventDefault();
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLElement>): void => {
    if (props.shouldDisableDrop) {
      event.preventDefault();
    }
  };
  const handleDrag = (event: React.DragEvent<HTMLElement>): void => {
    if (props.shouldDisableDrag) {
      event.preventDefault();
    }
  };
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (props.onKeyUp) {
      const { key } = event;
      props.onKeyUp(key);
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (props.onKeyDown) {
      const { key } = event;
      props.onKeyDown(key);
    }
  };
  const onValueChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const fontSize = 16; // TODO(krish): remove hardcoded value
    // Make the textarea smaller when lines are removed
    const previousRows: number = event.target.rows;
    const currentRows = Math.floor(event.target.scrollHeight / fontSize);
    // eslint-disable-next-line no-param-reassign
    event.target.rows = props.minRowCount;
    if (currentRows === previousRows) {
      // eslint-disable-next-line no-param-reassign
      event.target.rows = currentRows;
    }
    if (currentRows >= props.maxRowCount) {
      // eslint-disable-next-line no-param-reassign
      event.target.rows = props.maxRowCount;
      // eslint-disable-next-line no-param-reassign
      event.target.scrollTop = event.target.scrollHeight;
    }
    setRowCount(currentRows < props.maxRowCount ? currentRows : props.maxRowCount);
    if (props.onValueChanged) {
      props.onValueChanged(event.target.value);
    }
  };
  return (
    <InputFrame
      id={props.id}
      className={getClassName(MultiLineInput.displayName, props.className)}
      theme={props.theme?.inputFrameTheme}
      inputWrapperVariant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={props.isEnabled}
    >
      <StyledMultiLineTextArea
        id={props.id && `${props.id}-multiline-textarea`}
        className={getClassName(StyledMultiLineTextArea.displayName, !props.isEnabled && 'disabled')}
        rows={rowCount}
        value={props.value || ''}
        onKeyUp={handleOnKeyUp}
        onKeyDown={handleOnKeyDown}
        onChange={onValueChanged}
        onCut={handleCopy}
        onCopy={handleCut}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragStart={handleDrag}
        placeholder={props.placeholderText}
      />
    </InputFrame>
  );
};
MultiLineInput.displayName = 'MultiLineInput';
MultiLineInput.defaultProps = {
  ...defaultMoleculeProps,
  isEnabled: true,
  minRowCount: 5,
  maxRowCount: 6,
  shouldDisableCopy: false,
  shouldDisableCut: false,
  shouldDisablePaste: false,
  shouldDisableDrop: false,
  shouldDisableDrag: false,
};
