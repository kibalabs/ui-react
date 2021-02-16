import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { IDialogTheme } from './theme';

export const buildDialogThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, IDialogTheme>>): ThemeMap<IDialogTheme> => {

  const defaultDialogTheme = mergeTheme<IDialogTheme>({
    backdropColor: 'rgba(0, 0, 0, 0.8)',
    background: mergeTheme(boxThemes.default),
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultDialogTheme,
  };
};
