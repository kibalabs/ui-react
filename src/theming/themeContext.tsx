import React from 'react';

import { RecursivePartial } from '@kibalabs/core';
import { IMultiAnyChildProps, useInitialization } from '@kibalabs/core-react';

import { ITheme } from '..';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { mergeTheme, ThemeType, ThemeValue } from '../util';

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
};

export const useTheme = (): ITheme => {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
};

export const useDimensions = (override?: Partial<IDimensionGuide>): IDimensionGuide => {
  const theme = useTheme();
  return { ...theme.dimensions, ...(override || {}) };
};

export const useBaseColors = (): IColorGuide => {
  const theme = useTheme();
  return theme.colors;
};

export const useAlternateColors = (name?: string, override?: Partial<IColorGuide>): Partial<IColorGuide> => {
  const colors = useColors();
  const theme = useTheme();
  if (name === undefined) {
    return { ...colors, ...(override || {}) };
  }
  if (name === 'default') {
    return { ...theme.colors, ...(override || {}) };
  }
  if (!(name in theme.alternateColors)) {
    console.error(`Unrecognized color variant requested: ${name}`);
    return { ...theme.colors, ...(override || {}) };
  }
  return { ...theme.alternateColors[name], ...(override || {}) };
};

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
};

export function useColors(): IColorGuide {
  const colors = React.useContext(ColorContext);
  const baseColors = useBaseColors();
  return colors || baseColors;
}

export const useBuiltTheme = <Theme extends ThemeType>(component: string, variant: string, override?: RecursivePartial<Theme>): Theme => {
  const theme = useTheme();
  const colors = useColors();
  const baseColors = useBaseColors();
  const dimensions = useDimensions();
  // NOTE(krishan711): for SSR ie styles will change on hydration so allow this to have an effect
  const isRendered = useInitialization((): void => undefined);
  const needsRerunningForIe = isIe() && isRendered;
  return React.useMemo((): Theme => {
    const componentThemes = theme[component];
    if (!componentThemes) {
      throw Error(`Could not find component ${component} in current theme. Valid keys are: ${Object.keys(theme)}`);
    }
    const variants = variant.split('-').filter((variantPart: string): boolean => variantPart.length > 0);
    const themeParts = variants.splice(variants.lastIndexOf('default') + 1).reduce((value: RecursivePartial<Theme>[], currentVariant: string): RecursivePartial<Theme>[] => {
      const variantTheme = componentThemes[currentVariant];
      if (variantTheme) {
        value.push(variantTheme);
      } else {
        console.error(`Failed to find variant ${currentVariant} in ${component} themes`);
      }
      return value;
    }, []);
    if (override) {
      themeParts.push(override);
    }
    let builtTheme = mergeTheme(componentThemes.default, ...themeParts);
    // NOTE(krishan711): Resolving reference values is only here because ie 11 doesn't support css vars
    if (needsRerunningForIe) {
      // NOTE(krishan711): Need to merge with base otherwise colors are missing because alternates don't need to have all
      builtTheme = resolveThemeValues(builtTheme, { ...baseColors, ...colors }, dimensions);
    }
    return builtTheme;
  }, [theme, colors, baseColors, dimensions, variant, override, component, needsRerunningForIe]);
};

const isIe = (): boolean => {
  return typeof document !== 'undefined' && !!document.documentMode;
};

const resolveThemeValues = (theme: ThemeType, colors: IColorGuide, dimensions: IDimensionGuide): ThemeType => {
  const derivedTheme = Object.keys(theme).reduce((currentMap: ThemeType, themeKey: string): ThemeType => {
    const value = theme[themeKey];
    let themeValue = value;
    if (typeof value === 'string') {
      themeValue = resolveThemeValue(value, colors, dimensions);
    } else if (typeof value === 'object') {
      themeValue = resolveThemeValues(value, colors, dimensions);
    }
    // eslint-disable-next-line no-param-reassign
    currentMap[themeKey] = themeValue;
    return currentMap;
  }, {});
  return derivedTheme;
};

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
};
