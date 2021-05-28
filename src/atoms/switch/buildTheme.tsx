import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { ISwitchTheme } from './theme';

export const buildSwitchTheme = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ISwitchTheme>>): ThemeMap<ISwitchTheme> => {
  const defaultSwitchTheme = mergeTheme<ISwitchTheme>({
    unchecked: {
      default: {
        switchBackground: mergeTheme(boxThemes.default, boxThemes.focusable, {
          "background-color": "skyblue",
          "border-radius": '36px'
        }),
        switch: mergeTheme(boxThemes.default, {
          "background-color": 'white'
        })
      },
      hover: {
        switchBackground: {
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
      press: {
        switchBackground: {
          'background-color': '$colors.brandPrimaryClear50',
        },
      },
      focus: {
        switchBackground: boxThemes.focussed,
      },
    },
    checked: {
      default: {
        switchBackground: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': '$colors.brandPrimary',
          'border-color': '$colors.brandPrimary',
        }),
        switch: mergeTheme(boxThemes.default, {
          "background-color": "white"
        })
      },
      hover: {
        switchBackground: {
          'background-color': '$colors.brandPrimaryClear80',
        },
      },
      press: {
        switchBackground: {
          'background-color': '$colors.brandPrimaryClear50',
        },
      },
      focus: {
        switchBackground: boxThemes.focussed,
      },
    },
    disabled: {
      default: {
        switchBackground: {
          'background-color': '$colors.disabled',
        },
        text: {
          color: '$colors.disabledText',
        },
      },
    },
  }, base?.default);

  return {
    ...base,
    default: defaultSwitchTheme,
  };
};
