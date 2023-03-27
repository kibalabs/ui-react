import { IPortalTheme } from './theme';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildPortalThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IPortalTheme>): ThemeMap<IPortalTheme> => {
  const defaultPortalTheme: IPortalTheme = {
    background: mergeTheme(boxThemes.default, boxThemes.transparent, {
      'background-color': '$colors.background',
      'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    }),
  };

  return mergeThemeMap<IPortalTheme>({
    default: defaultPortalTheme,
  }, (base || {}));
};
