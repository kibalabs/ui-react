import { camelCaseToKebabCase, merge, mergePartial, RecursivePartial } from '@kibalabs/core';

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
      return `var(--kiba-color-${camelCaseToKebabCase(referenceValue)})`;
    }
    if (referenceType === 'dimensions') {
      return `var(--kiba-dimension-${camelCaseToKebabCase(referenceValue)})`;
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`);
  }
  return value;
};

export const propertyToCss = (name: string, value?: string | number): string => {
  if (!value) {
    return '';
  }
  return `${name}: ${valueToCss(String(value))};`;
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
    return propertyToCss(key, theme[key] as string);
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

export type PartialThemeMap<Theme extends ThemeType> = Record<string, RecursivePartial<Theme> | Theme>;

export interface ThemeMap<Theme extends ThemeType> extends PartialThemeMap<Theme> {
  default: Theme;
}

export type ThemeCssFunction<Theme extends ThemeType> = (theme: Theme | RecursivePartial<Theme>) => string;

export function mergeTheme<Theme extends ThemeType>(baseTheme: Theme, ...partialThemes: (RecursivePartial<Theme> | undefined)[]): Theme {
  return merge(baseTheme, ...partialThemes);
}

export function mergeThemePartial<Theme extends ThemeType>(...partialThemes: (RecursivePartial<Theme> | undefined)[]): RecursivePartial<Theme> {
  return mergePartial(...partialThemes);
}

export function mergeThemeMap<Theme extends ThemeType>(themeMap: ThemeMap<Theme>, ...partialThemeMaps: PartialThemeMap<Theme>[]): ThemeMap<Theme> {
  const output: ThemeMap<Theme> = {
    default: mergeTheme(themeMap.default, ...(partialThemeMaps.map((partialThemeMap: PartialThemeMap<Theme>): RecursivePartial<Theme> | undefined => partialThemeMap.default as RecursivePartial<Theme> | undefined))),
  };
  let partialKeys: Set<string> = new Set(Object.keys(themeMap));
  partialThemeMaps.forEach((partialThemeMap: PartialThemeMap<Theme>): void => {
    partialKeys = new Set([...partialKeys, ...(Object.keys(partialThemeMap))]);
  });
  partialKeys.forEach((partialKey: string): void => {
    // @ts-expect-error
    output[partialKey] = mergeThemePartial(themeMap[partialKey], ...(partialThemeMaps.map((partialThemeMap: PartialThemeMap<Theme>): RecursivePartial<Theme> | undefined => partialThemeMap[partialKey] as RecursivePartial<Theme> | undefined)));
  });
  return output;
}
