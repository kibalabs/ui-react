import { ITheme } from './theme';
import { ButtonThemedStyle } from '../atoms/button';
import { BoxThemedStyle } from '../particles/box';
import { ThemeCssFunction, ThemeMap, ThemeType } from '../util/themeUtil';


const buildComponentThemeCssString = <Theme extends ThemeType>(name: string, themeMap: ThemeMap<Theme>, themeCssFunction: ThemeCssFunction<Theme>): string => {
  const defaultCss = themeCssFunction(themeMap.default);
  const variantCss = Object.keys(themeMap).filter((themeKey: string): boolean => themeKey !== 'default').reduce((accumulator: string, themeKey: string): string => {
    const variantTheme = themeMap[themeKey];
    accumulator = `
      ${accumulator};
      &.${themeKey} {
        ${themeCssFunction(variantTheme)}
      }
    `;
    return accumulator;
  }, '');
  return `
    .${name} {
      ${defaultCss}
      ${variantCss}
    }
  `;
};

// NOTE(krishan711): this css needs to be processed before rendering so put it in a styled component or similar
export const buildThemeCssString = (theme: ITheme): string => {
  const boxThemesCss = buildComponentThemeCssString('Box', theme.boxes, BoxThemedStyle);
  const buttonThemesCss = buildComponentThemeCssString('Button', theme.buttons, ButtonThemedStyle);
  return `
    ${boxThemesCss}
    ${buttonThemesCss}
  `;
};
