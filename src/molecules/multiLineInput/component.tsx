import React from 'react';

import { getClassName } from '@kibalabs/core';
import { styled } from 'styled-components';

import { IInputFrameTheme, InputFrame } from '../inputFrame';
import { IMoleculeProps } from '../moleculeProps';


export interface IMultiLineInputTheme {
  inputFrameTheme: IInputFrameTheme;
}

interface IStyledMultiLineTextAreaProps {
  $resize: string;
}

const StyledMultiLineTextArea = styled.textarea<IStyledMultiLineTextAreaProps>`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  cursor: text;
  overflow-y: auto;
  resize: none;
  box-shadow: none;
  resize: ${(props: IStyledMultiLineTextAreaProps): string => props.$resize};

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

// TODO(krishan711): this only grows when the user types into it, not when the prop passed in is very long
interface IMultiLineInputProps extends IMoleculeProps<IMultiLineInputTheme> {
  value: string| null;
  isEnabled?: boolean;
  minRowCount?: number;
  maxRowCount?: number;
  placeholderText?: string;
  messageText?: string;
  name?: string;
  label?: string;
  inputWrapperVariant?: string;
  shouldAutofocus?: boolean;
  shouldSpellCheck?: boolean;
  isResizableVertically?: boolean;
  isResizableHorizontally?: boolean;
  onKeyUp?: (key: string) => void;
  onKeyDown?: (key: string) => void;
  onClick?: () => void;
  onValueChanged: (value: string) => void;
}

export function MultiLineInput({
  className = '',
  isEnabled = true,
  minRowCount = 3,
  maxRowCount = 6,
  ...props
}: IMultiLineInputProps): React.ReactElement {
  const [rowCount, setRowCount] = React.useState(minRowCount);
  const innerMaxRowCount = Math.max(maxRowCount, minRowCount);

  const onKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (props.onKeyUp) {
      const { key } = event;
      props.onKeyUp(key);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (props.onKeyDown) {
      const { key } = event;
      props.onKeyDown(key);
    }
  };

  const onValueChanged = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const calculatedLineHeight = window.getComputedStyle(event.target, null).getPropertyValue('line-height');
    const fontSize = parseInt(calculatedLineHeight, 10);
    // eslint-disable-next-line no-param-reassign
    event.target.rows = minRowCount;
    const currentRowCount = Math.floor(event.target.scrollHeight / fontSize);
    const newRowCount = Math.min(Math.max(currentRowCount, minRowCount), innerMaxRowCount);
    setRowCount(newRowCount);
    // eslint-disable-next-line no-param-reassign
    event.target.rows = newRowCount;
    if (props.onValueChanged) {
      props.onValueChanged(event.target.value);
    }
  };

  const onClick = (): void => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <InputFrame
      id={props.id}
      className={getClassName(MultiLineInput.displayName, className)}
      theme={props.theme?.inputFrameTheme}
      inputWrapperVariant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={isEnabled}
    >
      <StyledMultiLineTextArea
        id={props.id && `${props.id}-multiline-textarea`}
        className={getClassName(StyledMultiLineTextArea.displayName, !isEnabled && 'disabled')}
        $resize={props.isResizableVertically && props.isResizableHorizontally ? 'both' : props.isResizableVertically ? 'vertical' : props.isResizableHorizontally ? 'horizontal' : 'none'}
        name={props.name}
        rows={rowCount}
        value={props.value || ''}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={onValueChanged}
        onClick={onClick}
        aria-label={props.label || props.name || props.placeholderText}
        placeholder={props.placeholderText}
        autoFocus={props.shouldAutofocus}
        spellCheck={props.shouldSpellCheck}
      />
    </InputFrame>
  );
}
MultiLineInput.displayName = 'KibaMultiLineInput';
