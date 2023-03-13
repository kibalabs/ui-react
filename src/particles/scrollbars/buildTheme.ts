import { mergeTheme, ThemeMap } from '../../util';
import { IBoxTheme } from '../box';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IScrollbarTheme } from './theme';

export const buildScrollbarTheme = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: IScrollbarTheme): IScrollbarTheme => {
  return mergeTheme<IScrollbarTheme>({
    width: '8px',
    track: mergeTheme<IBoxTheme>(boxThemes.default, boxThemes?.transparent, {
      // 'background-color': 'transparent',
      'border-radius': '8px',
    }),
    thumb: mergeTheme<IBoxTheme>(boxThemes.default, boxThemes?.transparent, {
      'background-color': colors.backgroundDark20,
      'border-radius': '8px',
    }),
  }, base);
}
