import React from 'react';
import { RecursivePartial} from '@kibalabs/core';
import { IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { ITheme } from '..';
import { mergeTheme, ThemeType, ThemeValue } from '../util';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';

export const ThemeContext = React.createContext<ITheme | null>(null);

interface IThemeProviderProps extends IMultiAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => {
  return (
    <ThemeContext.Provider value={props.theme}>
      <ColorProvider colors={props.theme.colors}>
        {props.children}
      </ColorProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ITheme {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
}

export function useDimensions(): IDimensionGuide {
  const theme = useTheme();
  return theme.dimensions;
}

export function useBaseColors(): IColorGuide {
  const theme = useTheme();
  return theme.colors;
}

export function useAlternateColors(name?: string): Partial<IColorGuide> {
  if (name === undefined) {
    return useColors();
  }
  const theme = useTheme();
  if (name === 'default') {
    return theme.colors;
  }
  if (!(name in theme.alternateColors)) {
    console.error(`Unrecognized color variant requested: ${name}`);
    return theme.colors;
  }
  return theme.alternateColors[name];
}

export const ColorContext = React.createContext<IColorGuide | null>(null);

interface IColorProviderProps extends IMultiAnyChildProps {
  colors: IColorGuide;
}

export const ColorProvider = (props: IColorProviderProps): React.ReactElement => {
  return (
    <ColorContext.Provider value={props.colors}>
      {props.children}
    </ColorContext.Provider>
  );
}

export function useColors(): IColorGuide {
  let colors = React.useContext(ColorContext);
  if (!colors) {
    colors = useBaseColors();
  }
  return colors;
}

export const useBuiltTheme = <Theme extends ThemeType>(component: string, variant?: string, override?: RecursivePartial<Theme>): Theme => {
  const theme = useTheme();
  const colors = useColors();
  const baseColors = useBaseColors();
  const dimensions = useDimensions();
  // NOTE(krishan711): for SSR ie styles will change on hydration so allow this to have an effect
  const isRendered = useInitialization((): void => {});
  return React.useMemo((): Theme => {
    const componentThemes = theme[component];
    if (!componentThemes) {
      throw Error(`Could not find component ${component} in current theme. Valid keys are: ${Object.keys(theme)}`);
    }
    let variants = (variant || 'default').split('-').filter((variantPart: string): boolean => variantPart.length > 0);
    const themeParts = variants.splice(variants.lastIndexOf('default') + 1).reduce((value: RecursivePartial<Theme>[], variant: string): RecursivePartial<Theme>[] => {
      const variantTheme = componentThemes[variant];
      if (variantTheme) {
        value.push(variantTheme);
      } else {
        console.error(`Failed to find variant ${variant} in ${component} themes`);
      }
      return value;
    }, []);
    if (override) {
      themeParts.push(override);
    }
    let builtTheme = mergeTheme(componentThemes.default, ...themeParts);
    // NOTE(krishan711): Resolving reference values is only here because ie 11 doesn't support css vars
    if (isIe() && isRendered) {
      // NOTE(krishan711): Need to merge with base otherwise colors are missing because alternates don't need to have all
      builtTheme = resolveThemeValues(builtTheme, {...baseColors, ...colors}, dimensions);
    }
    return builtTheme;
  }, [theme, colors, baseColors, dimensions, variant, override, isIe() && isRendered]);
}

const isIe = (): boolean => {
  return typeof document !== 'undefined' && !!document.documentMode;
}

const resolveThemeValues = (theme: ThemeType, colors: IColorGuide, dimensions: IDimensionGuide): ThemeType => {
  const derivedTheme = Object.keys(theme).reduce((currentMap: ThemeType, themeKey: string): ThemeType => {
    const value = theme[themeKey];
    let themeValue = value;
    if (typeof value === 'string') {
      themeValue = resolveThemeValue(value, colors, dimensions);
    } else if (typeof value === 'object') {
      themeValue = resolveThemeValues(value, colors, dimensions);
    }
    currentMap[themeKey] = themeValue;
    return currentMap;
  }, {});
  return derivedTheme;
}

const resolveThemeValue = (value: string, colors: IColorGuide, dimensions: IDimensionGuide): ThemeValue => {
  if (value.startsWith('$')) {
    const strippedValue = value.substring(1);
    const strippedValueParts = strippedValue.split('.');
    const referenceType = strippedValueParts[0];
    const referenceValue = strippedValueParts[1];
    if (referenceType === 'colors') {
      return colors[referenceValue];
    }
    if (referenceType === 'dimensions') {
      return dimensions[referenceValue];
    }
    console.error(`Unknown reference used: ${referenceType} (${value})`);
  }
  return value;
}
