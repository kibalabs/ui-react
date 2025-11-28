import React from 'react';

import { RecursivePartial } from '@kibalabs/core';

import { themeToCss, valueToCss } from './themeUtil';
import { IDialogTheme } from '../atoms/dialog/theme';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BoxThemedStyle = (theme: RecursivePartial<IBoxTheme>): string => themeToCss(theme);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BulletListThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BulletTextThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ButtonThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CheckboxThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CollapsibleBoxThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogThemedStyle = (_theme: RecursivePartial<IDialogTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DividerThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconButtonThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ImageThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InputWrapperThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LinkThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LinePagerThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LinkBaseThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ListItemThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LoadingSpinnerThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PillThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PortalThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrettyTextThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProgressCounterItemThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SelectableViewThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SwitchThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TabBarItemThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TextThemedStyle = (_theme: RecursivePartial<ITextTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TitledCollapsibleBoxThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const VideoThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WebViewThemedStyle = (_theme: RecursivePartial<Record<string, unknown>>): string => '';
