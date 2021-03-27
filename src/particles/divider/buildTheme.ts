import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { IDividerTheme } from './theme';

export const buildDividerThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: RecursivePartial<Record<string, IDividerTheme>>): ThemeMap<IDividerTheme> => {
  const defaultDividerTheme = mergeTheme<IDividerTheme>({
    background: '#bbb',
    'border-radius': '0.2rem',
    padding: '0',
    width: '100%',
    height: '0.2rem',
    margin: '0.2rem auto',
  }, base?.default);

  const halfDividerTheme = mergeThemePartial<IDividerTheme>({
    width: '60%',
  }, base?.half);

  const thickDividerTheme = mergeThemePartial<IDividerTheme>({
    height: '0.4rem',
    'border-radius': '0.4rem',
  }, base?.thick);


  return {
    ...(base || {}),
    default: defaultDividerTheme,
    half: halfDividerTheme,
    thick: thickDividerTheme,
  };
};
