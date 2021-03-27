import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IDividerTheme } from './theme';

export const buildDividerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: RecursivePartial<Record<string, IDividerTheme>>): ThemeMap<IDividerTheme> => {
  const defaultDividerTheme = mergeTheme<IDividerTheme>({
    'background': "#aaa",
    'border-radius': "0",
    'border-color': "#aaa",
    'border-width': "0.05rem",
    'border-style': "solid",
    'padding': "0",
    'width': "100%",
    'margin': "0 auto"
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultDividerTheme,
  };
}