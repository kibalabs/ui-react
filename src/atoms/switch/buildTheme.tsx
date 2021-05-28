import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, IColorGuide, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, ThemeMap } from '../../util';
import { ISwitchTheme } from './theme';

export const buildSwitchThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: RecursivePartial<Record<string, ISwitchTheme>>): ThemeMap<ISwitchTheme> => {
  const defaultSwitchTheme = mergeTheme<ISwitchTheme>({
    unchecked: {
      default: {
        switchBackground: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': '#ccc',
        }),
        switch: mergeTheme(boxThemes.default, {
          'background-color': 'white',
        }),
      },
      hover: {
        switchBackground: {
          'background-color': 'rgba(33, 150, 243, 0.5)',
        },
      },
      press: {
        switchBackground: {
          'background-color': '#2196F3',
        },
      },
      focus: {
        switchBackground: boxThemes.focussed,
      },
    },
    checked: {
      default: {
        switchBackground: mergeTheme(boxThemes.default, boxThemes.focusable, {
          'background-color': 'rgb(33, 150, 243)',
        }),
        switch: mergeTheme(boxThemes.default, {
          'background-color': 'white',
        }),
      },
      hover: {
        switchBackground: {
          'background-color': 'rgba(33, 150, 243,  0.8)',
        },
      },
      press: {
        switchBackground: {
          'background-color': '#ddd',
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
