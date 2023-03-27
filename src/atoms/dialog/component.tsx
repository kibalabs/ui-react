import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { getIsRunningOnBrowser, ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IDialogTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { Box, BoxThemedStyle } from '../../particles/box';
import { propertyToCss } from '../../util';

export const DialogThemedStyle = (theme: RecursivePartial<IDialogTheme>): string => `
  ${propertyToCss('background', theme?.backdropColor)};
  & > .KibaDialogInner {
    ${theme?.background ? BoxThemedStyle(theme?.background) : ''};
  }
`;

interface IStyledDialogProps {
  $theme?: RecursivePartial<IDialogTheme>;
}

const StyledDialog = styled.div<IStyledDialogProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 999;

  &.closed {
    display: none;
  }

  &&&& {
    ${(props: IStyledDialogProps): string => (props.$theme ? DialogThemedStyle(props.$theme) : '')};
  }
`;

interface IDialogProps extends IComponentProps<IDialogTheme>, ISingleAnyChildProps {
  isOpen: boolean;
  maxHeight?: string;
  maxWidth?: string;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  isClosableByBackdrop?: boolean;
  isClosableByEscape?: boolean;
  onCloseClicked: () => void;
}

export const Dialog = (props: IDialogProps): React.ReactElement | null => {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const maxWidth = props.maxWidth || '400px';
  const maxHeight = props.maxHeight || '400px';
  const isRunningOnBrowser = getIsRunningOnBrowser();

  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (props.isClosableByBackdrop && event.target === dialogRef.current) {
      props.onCloseClicked();
    }
  };

  // NOTE(krishan711): useEventListener doesn't pass the dependencies in as it should
  // NOTE(krishan711): useEventListener should allow the event object to be provided as a generic
  // @ts-ignore
  useEventListener(isRunningOnBrowser ? document : null, 'keydown', (event: React.KeyboardEvent): void => {
    if (props.isClosableByEscape && props.isOpen && event.key === 'Escape') {
      props.onCloseClicked();
    }
  });

  return (
    <StyledDialog
      className={getClassName(Dialog.displayName, props.className, !props.isOpen && 'closed', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      ref={dialogRef}
      onClick={onBackdropClicked}
    >
      <Box
        className='KibaDialogInner'
        width='90%'
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        shouldClipContent={true}
        shouldCaptureTouches={true}
        isScrollableVertically={props.isScrollableVertically}
        isScrollableHorizontally={props.isScrollableHorizontally}
      >
        {props.children}
      </Box>
    </StyledDialog>
  );
};
Dialog.defaultProps = {
  ...defaultComponentProps,
  isOpen: false,
  isScrollableHorizontally: true,
  isScrollableVertically: true,
  isClosableByBackdrop: true,
  isClosableByEscape: true,
};

Dialog.displayName = 'KibaDialog';
