import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../particles/box/theme';
import { IButtonTheme } from '../atoms/button/theme';
import { ITextTheme } from '../particles/text/theme';
import { valueToCss } from './themeUtil';

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
export const BoxThemedStyle = (_theme: RecursivePartial<IBoxTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ButtonThemedStyle = (_theme: RecursivePartial<IButtonTheme>): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TextThemedStyle = (_theme: RecursivePartial<ITextTheme>): string => '';
