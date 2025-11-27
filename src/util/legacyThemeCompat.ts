import React from 'react';

import { RecursivePartial } from '@kibalabs/core';

import { themeToCss, valueToCss } from './themeUtil';
import { IButtonTheme } from '../atoms/button/theme';
import { ICollapsibleBoxTheme } from '../atoms/collapsibleBox/theme';
import { IDialogTheme } from '../atoms/dialog/theme';
import { IIconButtonTheme } from '../atoms/iconButton/theme';
import { IInputWrapperTheme } from '../atoms/inputWrapper/theme';
import { IPrettyTextTheme } from '../atoms/prettyText/theme';
import { ISelectableViewTheme } from '../atoms/selectableView/theme';
import { IBoxTheme } from '../particles/box/theme';
import { ITextTheme } from '../particles/text/theme';

// NOTE: This file contains backward compatibility functions for the legacy styled-components theming system.
// These will be removed once all consumers migrate to CSS variants.

export const themeToInlineStyles = (theme?: RecursivePartial<IBoxTheme>): React.CSSProperties => {
  if (!theme) return {};
  const styles: Record<string, string> = {};
  Object.keys(theme).forEach((key) => {
    const value = theme[key as keyof IBoxTheme];
    if (value) {
      const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      styles[camelKey] = valueToCss(value);
    }
  });
  return styles as React.CSSProperties;
};

export const BoxThemedStyle = (theme: RecursivePartial<IBoxTheme>): string => themeToCss(theme);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ButtonThemedStyle = (_theme: RecursivePartial<IButtonTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CollapsibleBoxThemedStyle = (_theme: RecursivePartial<ICollapsibleBoxTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogThemedStyle = (_theme: RecursivePartial<IDialogTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconButtonThemedStyle = (_theme: RecursivePartial<IIconButtonTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InputWrapperThemedStyle = (_theme: RecursivePartial<IInputWrapperTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrettyTextThemedStyle = (_theme: RecursivePartial<IPrettyTextTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SelectableViewThemedStyle = (_theme: RecursivePartial<ISelectableViewTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TextThemedStyle = (_theme: RecursivePartial<ITextTheme>): string => '';
