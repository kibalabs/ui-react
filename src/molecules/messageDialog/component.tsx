import React from 'react';

import { Button, Dialog, IconButton } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { KibaIcon, PaddingSize, Spacing, Text, TextAlignment } from '../../particles';
import { IMoleculeProps } from '../moleculeProps';

export interface IMessageDialogTheme {
}

interface IMessageDialogProps extends IMoleculeProps<IMessageDialogTheme> {
  isOpen: boolean;
  maxHeight?: string;
  maxWidth?: string;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
}

export function MessageDialog({
  className = '',
  ...props
}: IMessageDialogProps): React.ReactElement | null {
  const cancelButtonText = props.cancelButtonText || 'Cancel';
  const confirmButtonText = props.confirmButtonText || 'Confirm';

  return (
    <Dialog className={className} isOpen={props.isOpen} onCloseClicked={props.onCloseClicked} maxHeight={props.maxHeight} maxWidth={props.maxWidth}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Fill} childAlignment={Alignment.Center} shouldAddGutters={true}>
          <Spacing />
          <Text variant='header3' alignment={TextAlignment.Center}>{props.title}</Text>
          {props.onCloseClicked && (
            <IconButton icon={<KibaIcon iconId='ion-close' />} onClicked={props.onCloseClicked} />
          )}
        </Stack>
        <Text alignment={TextAlignment.Center}>{props.message}</Text>
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Button variant='secondary' onClicked={props.onCloseClicked} text={cancelButtonText} />
            <Button variant='primary' onClicked={props.onConfirmClicked} text={confirmButtonText} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
          </Stack>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
}
