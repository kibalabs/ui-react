import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { getIsRunningOnBrowser, ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';

import { IDialogTheme } from './theme';
import { IComponentProps } from '../../model';
import { Box, BoxThemedStyle } from '../../particles/box';
import { propertyToCss } from '../../util';

import './styles.scss';

// NOTE(krishan711): kept for legacy cssBuilder compatibility
export const DialogThemedStyle = (theme: RecursivePartial<IDialogTheme>): string => `
  ${propertyToCss('background', theme?.backdropColor)};
  & > .KibaDialogInner {
    ${theme?.background ? BoxThemedStyle(theme?.background) : ''};
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
  shouldSkipRenderingWhenClosed?: boolean;
  onCloseClicked: () => void;
}

export function Dialog({
  className = '',
  variant = 'default',
  isScrollableHorizontally = true,
  isScrollableVertically = true,
  isClosableByBackdrop = true,
  isClosableByEscape = true,
  ...props
}: IDialogProps): React.ReactElement | null {
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const maxWidth = props.maxWidth || '400px';
  const maxHeight = props.maxHeight || '400px';
  const isRunningOnBrowser = getIsRunningOnBrowser();
  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (isClosableByBackdrop && event.target === dialogRef.current) {
      props.onCloseClicked();
    }
  };
  // NOTE(krishan711): useEventListener doesn't pass the dependencies in as it should
  // NOTE(krishan711): useEventListener should allow the event object to be provided as a generic
  // @ts-ignore
  useEventListener(isRunningOnBrowser ? document : null, 'keydown', (event: React.KeyboardEvent): void => {
    if (isClosableByEscape && props.isOpen && event.key === 'Escape') {
      props.onCloseClicked();
    }
  });
  const dialogStyles = buildDialogStyles(props.theme);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={getClassName(Dialog.displayName, className, !props.isOpen && 'closed', ...(variant?.split('-') || []))}
      style={dialogStyles}
      ref={dialogRef}
      onClick={onBackdropClicked}
    >
      <Box
        className='KibaDialogInner'
        variant={props.theme?.background ? undefined : 'dialog-inner'}
        theme={props.theme?.background}
        width='90%'
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        shouldClipContent={true}
        shouldCaptureTouches={true}
        isScrollableVertically={isScrollableVertically}
        isScrollableHorizontally={isScrollableHorizontally}
      >
        {(props.isOpen || !props.shouldSkipRenderingWhenClosed) && (
          <React.Fragment>
            {props.children}
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
Dialog.displayName = 'KibaDialog';

const buildDialogStyles = (theme?: RecursivePartial<IDialogTheme>): React.CSSProperties => {
  const styles: Record<string, string> = {};
  if (theme?.backdropColor) {
    styles['--kiba-dialog-backdrop-color'] = theme.backdropColor;
  }
  return styles as React.CSSProperties;
};
