import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IDividerTheme } from './theme';

export const buildDividerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: RecursivePartial<Record<string, IDividerTheme>>): ThemeMap<IDividerTheme> => {
  const defaultDividerTheme = mergeTheme<IDividerTheme>({
    'border-color': '#bbb',
    padding: '0',
  }, base?.default);

  return {
    ...(base || {}),
    default: defaultDividerTheme,
  };
};
