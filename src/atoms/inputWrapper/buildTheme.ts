
import { RecursivePartial } from '@kibalabs/core';

import { IInputWrapperTheme } from './theme';
import { IBoxTheme, IDimensionGuide, ITextTheme } from '../../particles';
import { mergeTheme, mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';

export const buildInputWrapperThemes = (dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, boxThemes: ThemeMap<IBoxTheme>, base?: PartialThemeMap<IInputWrapperTheme>): ThemeMap<IInputWrapperTheme> => {
  const defaultInputWrapperTheme: IInputWrapperTheme = {
    normal: {
      default: {
        text: textThemes.default,
        messageText: mergeTheme(textThemes.default, {
          color: '$colors.textLight25',
          'font-size': '0.9em',
        }),
        placeholderText: mergeTheme(textThemes.default, {
          color: '$colors.textLight50',
        }),
        background: mergeTheme(boxThemes.default, {
          'background-color': '$colors.backgroundLight50',
          padding: `${dimensions.padding} ${dimensions.paddingWide}`,
          'border-radius': dimensions.borderRadius,
          'border-width': dimensions.borderWidthNarrow,
          'border-color': '$colors.backgroundDark05',
          'border-style': 'solid',
        }),
      },
      hover: {
        background: {
          'border-color': '$colors.brandPrimaryLight10',
        },
      },
      focus: {
        background: {
          'border-color': '$colors.brandPrimary',
        },
      },
    },
    disabled: {
      default: {
        background: {
          'background-color': '$colors.disabledLight90',
          'border-color': '$colors.disabledLight20',
        },
      },
      hover: {
        background: {
          'border-color': '$colors.disabledLight10',
        },
      },
      focus: {
        background: {
          'border-color': '$colors.disabled',
        },
      },
    },
  };

  const errorInputWrapperTheme: RecursivePartial<IInputWrapperTheme> = {
    normal: {
      default: {
        messageText: {
          color: '$colors.error',
        },
        background: {
          'background-color': '$colors.errorLight90',
          'border-color': '$colors.errorLight20',
        },
      },
      hover: {
        background: {
          'border-color': '$colors.errorLight10',
        },
      },
      focus: {
        background: {
          'border-color': '$colors.error',
        },
      },
    },
  };

  const successInputWrapperTheme: RecursivePartial<IInputWrapperTheme> = {
    normal: {
      default: {
        messageText: {
          color: '$colors.success',
        },
        background: {
          'background-color': '$colors.successLight90',
          'border-color': '$colors.successLight20',
        },
      },
      hover: {
        background: {
          'border-color': '$colors.successLight10',
        },
      },
      focus: {
        background: {
          'border-color': '$colors.success',
        },
      },
    },
  };

  return mergeThemeMap<IInputWrapperTheme>({
    default: defaultInputWrapperTheme,
    error: errorInputWrapperTheme,
    success: successInputWrapperTheme,
  }, (base || {}));
};
