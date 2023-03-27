
import { IBulletTextTheme } from './theme';
import { IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildBulletTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, base?: PartialThemeMap<IBulletTextTheme>): ThemeMap<IBulletTextTheme> => {
  const defaultBulletTextTheme: IBulletTextTheme = {
    normal: {
      default: {
        text: mergeTheme(textThemes.default, {
          margin: '0 0 0.5em 0',
        }),
        bullet: {
          color: '$colors.text',
          content: '"•"',
          margin: `0 ${dimensions.padding} 0 -${dimensions.padding}`,
          'font-weight': 'bold',
        },
      },
    },
  };

  return mergeThemeMap<IBulletTextTheme>({
    default: defaultBulletTextTheme,
  }, (base || {}));
};
