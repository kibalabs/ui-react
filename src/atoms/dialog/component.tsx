import React from 'react';

import { getClassName } from '@kibalabs/core';
import { getIsRunningOnBrowser, ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps } from '../../model';
import { Box } from '../../particles/box';
import { useBuiltTheme } from '../../theming';
import { valueToCss } from '../../util';
import { IDialogTheme } from './theme';

interface IStyledBackdropProps {
  $backdropColor: string;
}

const StyledBackdrop = styled.div<IStyledBackdropProps>`
  width: 100%;
  height: 100%;
  background: ${(props: IStyledBackdropProps): string => valueToCss(props.$backdropColor)};
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
  const theme = useBuiltTheme('dialogs', props.variant, props.theme);
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
    <StyledBackdrop
      className={getClassName(Dialog.displayName, !props.isOpen && 'closed')}
      $backdropColor={theme.backdropColor}
      ref={dialogRef}
      onClick={onBackdropClicked}
    >
      <Box
        width='90%'
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        theme={theme.background}
        isScrollableVertically={props.isScrollableVertically}
        isScrollableHorizontally={props.isScrollableHorizontally}
      >
        {props.children}
      </Box>
    </StyledBackdrop>
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

Dialog.displayName = 'Dialog';
