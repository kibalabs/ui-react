import { IDividerTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildDividerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: PartialThemeMap<IDividerTheme>): ThemeMap<IDividerTheme> => {
  const defaultDividerTheme: IDividerTheme = {
    color: '$colors.backgroundDark05',
    width: '1px',
    padding: '0',
  };

  return mergeThemeMap<IDividerTheme>({
    default: defaultDividerTheme,
  }, (base || {}));
};
