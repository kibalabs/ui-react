import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { ISwitchTheme } from './theme';

export const buildSwitchThemes = (colors: IColorGuide, dimensions: IDimensionGuide, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ISwitchTheme>>): ThemeMap<ISwitchTheme> => {
  const defaultSwitchTheme = mergeTheme<ISwitchTheme>({
    normal: {
      default: {
        background: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': '$colors.backgroundDark10',
          'border-radius': '15px',
        }),
        switch: mergeTheme(boxThemes.default, {
          'background-color': 'white',
          'border-radius': '50%',
        }),
        switchWidth: '30px',
        switchHeight: '30px',
        backgroundWidth: '60px',
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
