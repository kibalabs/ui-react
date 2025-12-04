import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, OptionalProppedElement } from '@kibalabs/core-react';

import { InputWrapper } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { IIconProps, LoadingSpinner, PaddingSize, Spacing } from '../../particles';
import { IMoleculeProps } from '../moleculeProps';

export interface IInputFrameProps extends IMoleculeProps, ISingleAnyChildProps {
  messageText?: string;
  isEnabled?: boolean;
  isLoading?: boolean;
  inputWrapperVariant?: string;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  onClicked?: () => void;
}

// NOTE(krishan711): this component is intended to hold anything that would commonly be used alongside input wrapper (e.g. buttons)
export function InputFrame({
  className = '',
  isEnabled = true,
  isLoading = false,
  iconGutter = PaddingSize.Default,
  contentAlignment = Alignment.Fill,
  childAlignment = Alignment.Center,
  ...props
}: IInputFrameProps): React.ReactElement {
  return (
    <InputWrapper
      id={props.id}
      className={getClassName(InputFrame.displayName, className)}
      style={props.style}
      variant={props.inputWrapperVariant}
      messageText={props.messageText}
      isEnabled={isEnabled}
      onClicked={props.onClicked}
    >
      <Stack direction={Direction.Horizontal} childAlignment={childAlignment} contentAlignment={contentAlignment}>
        { !isLoading && props.iconLeft && (
          <React.Fragment>
            {props.iconLeft}
            <Spacing variant={iconGutter} />
          </React.Fragment>
        )}
        <Stack.Item growthFactor={1} shrinkFactor={1} shouldShrinkBelowContentSize={true}>
          {props.children}
        </Stack.Item>
        { !isLoading && props.iconRight && (
          <React.Fragment>
            <Spacing variant={iconGutter} />
            {props.iconRight}
          </React.Fragment>
        )}
        { isLoading && (
          <LoadingSpinner
            id={props.id && `${props.id}-loading-spinner`}
            variant='light-small'
          />
        )}
      </Stack>
    </InputWrapper>
  );
}
InputFrame.displayName = 'KibaInputFrame';
