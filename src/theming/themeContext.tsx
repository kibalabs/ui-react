import React from 'react';

import { IMultiAnyChildProps } from '@kibalabs/core-react';

import { buildThemeCssString, ComponentDefinition } from './cssBuilder';
import { ITheme } from './theme';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { ThemeType } from '../util';


export const ThemeContext = React.createContext<ITheme | null>(null);


interface IThemeCssProps {
  theme: ITheme;
  extraComponentDefinitions?: ComponentDefinition<ThemeType>[];
}

function ThemeCss(props: IThemeCssProps): React.ReactElement {
  const cssString = React.useMemo((): string => {
    return `@layer kiba-theme { :root { ${buildThemeCssString(props.theme, props.extraComponentDefinitions)} } }`;
  }, [props.theme, props.extraComponentDefinitions]);
  return (
    <style dangerouslySetInnerHTML={{ __html: cssString }} />
  );
}

interface IThemeProviderProps extends IMultiAnyChildProps, IThemeCssProps {
}

export function ThemeProvider({
  ...props
}: IThemeProviderProps): React.ReactElement {
  return (
    <ThemeContext.Provider value={props.theme}>
      <ThemeCss theme={props.theme} extraComponentDefinitions={props.extraComponentDefinitions} />
      <ColorProvider colors={props.theme.colors}>
        {props.children}
      </ColorProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ITheme => {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return theme;
};

export const useDimensions = (override?: Partial<IDimensionGuide>): IDimensionGuide => {
  const theme = useTheme();
  return { ...theme.dimensions, ...(override || {}) } as IDimensionGuide;
};

export const useBaseColors = (): IColorGuide => {
  const theme = useTheme();
  return theme.colors;
};

export const useAlternateColors = (name?: string, override?: Partial<IColorGuide>): Partial<IColorGuide> => {
  const colors = useColors();
  const theme = useTheme();
  let colorsToUse = theme.colors;
  if (name == null) {
    colorsToUse = colors;
  } else if (name in theme.alternateColors) {
    colorsToUse = theme.alternateColors[name];
  } else {
    console.error(`Unrecognized color variant requested: ${name}`);
  }
  return { ...colorsToUse, ...(override || {}) };
};

export const ColorContext = React.createContext<Partial<IColorGuide> | null>(null);

interface IColorProviderProps extends IMultiAnyChildProps {
  colors: Partial<IColorGuide>;
}

export function ColorProvider({
  ...props
}: IColorProviderProps): React.ReactElement {
  return (
    <ColorContext.Provider value={props.colors}>
      {props.children}
    </ColorContext.Provider>
  );
}

export function useColors(): IColorGuide {
  const baseColors = useBaseColors();
  const colors = React.useContext(ColorContext);
  return { ...baseColors, ...(colors || {}) } as IColorGuide;
}
