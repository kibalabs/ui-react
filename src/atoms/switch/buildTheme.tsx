
import { ISwitchTheme } from './theme';
import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, PartialThemeMap, ThemeMap } from '../../util';

export const buildSwitchThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<ISwitchTheme>): ThemeMap<ISwitchTheme> => {
  const defaultSwitchTheme = mergeTheme<ISwitchTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': '$colors.backgroundDark10',
          'border-radius': '10px',
        }),
        switch: mergeTheme(boxThemes.default, {
          'background-color': 'white',
          'border-radius': '50%',
        }),
        switchWidth: '20px',
        switchHeight: '20px',
        backgroundWidth: '40px',
      },
      hover: {
        background: {
          'background-color': '$colors.brandSecondary',
        },
      },
      press: {
        background: {
          'background-color': '$colors.brandSecondaryDark10',
        },
      },
      focus: {
        background: boxThemes.focussed,
      },
    },
    checked: {
      default: {
        background: {
          'background-color': '$colors.brandPrimary',
        },
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '$colors.disabled',
        },
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultSwitchTheme,
  };
};
