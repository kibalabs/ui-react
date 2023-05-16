
import { IDialogTheme } from './theme';
import { IBoxTheme, IDimensionGuide } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildDialogThemes = (dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IDialogTheme>): ThemeMap<IDialogTheme> => {
  const defaultDialogTheme: IDialogTheme = {
    backdropColor: 'rgba(0, 0, 0, 0.8)',
    background: mergeTheme(boxThemes.default, boxThemes.card, {
    }),
  };

  return mergeThemeMap<IDialogTheme>({
    default: defaultDialogTheme,
  }, (base || {}));
};
