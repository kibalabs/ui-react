import React from 'react';

import { generateUUID, getClassName } from '@kibalabs/core';
import toast, { Toast as ReactHotToast } from 'react-hot-toast';

import { Text } from '..';
import { Toast } from './component';

export interface IToastManager {
  showToast: (component: React.ReactElement, toastVariant?: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number, onClicked?: (() => void)) => string;
  showTextToast: (text: string, toastVariant?: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number, onClicked?: (() => void)) => string;
  showCustomToast: (component: React.ReactElement, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number) => string;
  dismissToast: (toastId: string) => void;
}

// NOTE(krishan711): this is at the stage where I need to create the toast component.
export const useToastManager = (): IToastManager => {
  const innerShowToast = React.useCallback((component: React.ReactElement, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number): string => {
    const actualToastId = toastId || generateUUID();
    const shouldAutoClose = !shouldNotAutoClose;
    const autoCloseMillis = autoCloseSeconds ? (autoCloseSeconds * 1000) : 5000;
    const wrappedComponent = (renderingToast: ReactHotToast): React.ReactElement => (
      // @ts-expect-error: not sure why classNam isn't expected on the component?
      React.cloneElement(component, { ...component.props, className: getClassName(...component.className || '', renderingToast.visible ? 'animateIn' : 'animateOut') })
    );
    toast.custom(wrappedComponent, { id: actualToastId, duration: shouldAutoClose ? autoCloseMillis : Infinity, style: { padding: '0', background: 'none', boxShadow: 'none' } });
    return actualToastId;
  }, []);

  const showToast = React.useCallback((component: React.ReactElement, toastVariant?: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number, onClicked?: (() => void)): string => {
    const actualComponent = (
      <Toast variant={toastVariant} onClicked={onClicked}>{component}</Toast>
    );
    return innerShowToast(actualComponent, toastId, shouldNotAutoClose, autoCloseSeconds);
  }, [innerShowToast]);

  const showTextToast = React.useCallback((text: string, toastVariant?: string, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number, onClicked?: (() => void)): string => {
    const actualComponent = (
      <Text>{text}</Text>
    ) as React.ReactElement;
    return showToast(actualComponent, toastVariant, toastId, shouldNotAutoClose, autoCloseSeconds, onClicked);
  }, [showToast]);

  const showCustomToast = React.useCallback((component: React.ReactElement, toastId?: string, shouldNotAutoClose?: boolean, autoCloseSeconds?: number): string => {
    return innerShowToast(component, toastId, shouldNotAutoClose, autoCloseSeconds);
  }, [innerShowToast]);

  const dismissToast = React.useCallback((toastId: string): void => {
    toast.dismiss(toastId);
  }, []);

  const toastManager = React.useMemo((): IToastManager => {
    return { showToast, showTextToast, showCustomToast, dismissToast };
  }, [showToast, showTextToast, showCustomToast, dismissToast]);

  return toastManager;
};
