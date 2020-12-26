import { RecursivePartial } from '@kibalabs/core';

import { IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { IBulletListTheme } from './theme';

export const buildBulletListThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, IBulletListTheme>>): ThemeMap<IBulletListTheme> => {
  const defaultBulletListTheme = mergeTheme<IBulletListTheme>({
    normal: {
      default: {
        bulletList: {
          'list-style-type': 'none',
          margin: `0 0 0 ${dimensions.paddingWide}`,
        },
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultBulletListTheme,
  };
};
