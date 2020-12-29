import { merge, mergePartial, RecursivePartial } from '@kibalabs/core';

import { camelCaseToKebabCase } from './stringUtil';

export type CssTheme = {
  [key: string]: Readonly<string>
};

export const valueToCss = (value: string): string => {
  if (value.startsWith('$')) {
    const strippedValue = value.substring(1);
    const strippedValueParts = strippedValue.split('.');
    const referenceType = strippedValueParts[0];
    const referenceValue = strippedValueParts[1];
    if (referenceType === 'colors') {
      return `var(--color-${camelCaseToKebabCase(referenceValue)})`;
    }
    if (referenceType === 'dimensions') {
      return `var(--dimension-${camelCaseToKebabCase(referenceValue)})`;
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`);
  }
  return value;
};

// NOTE(krishan711): the type param here seems silly but is necessary cos too complex to be calculated itself
export const themeToCss = (theme?: CssTheme | Partial<CssTheme> | RecursivePartial<CssTheme>): string => {
  if (!theme) {
    return '';
  }
  const output = Object.keys(theme).map((key: string): string => {
    if (!key || !(key in theme)) {
      console.error(`key: ${key} missing in theme: ${theme}`);
      return '';
    }
    return theme[key] ? `${key}: ${valueToCss(theme[key] as string)};` : '';
  });
  return output.join('\n');
};

export const colorsToCss = (colors: Record<string, string> | Partial<Record<string, string>>): string => {
  const output = Object.keys(colors).map((colorKey: string): string => {
    return colors[colorKey] ? `--color-${camelCaseToKebabCase(colorKey)}: ${colors[colorKey]};` : '';
  });
  return output.join('\n');
};

export type ThemeValue = Readonly<string | number | ThemeType | RecursivePartial<ThemeType>>;

export type ThemeType = {
  [key: string]: ThemeValue;
};

export interface ThemeMap<Theme extends ThemeType> extends Record<string, RecursivePartial<Theme> | Theme> {
  default: Theme;
}

export function mergeTheme<Theme extends ThemeType>(baseTheme: Theme, ...partialThemes: (RecursivePartial<Theme> | undefined)[]): Theme {
  return merge(baseTheme, ...partialThemes);
}

export function mergeThemePartial<Theme extends ThemeType>(...partialThemes: (RecursivePartial<Theme> | undefined)[]): RecursivePartial<Theme> {
  return mergePartial(...partialThemes);
}
