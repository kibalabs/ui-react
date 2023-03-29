import { RecursivePartial } from '@kibalabs/core';


import { IPrettyTextTheme } from './theme';
import { ITextTheme } from '../../particles';
import { IColorGuide } from '../../particles/colors';
import { IDimensionGuide } from '../../particles/dimensions';
import { mergeTheme, mergeThemeMap, mergeThemePartial, PartialThemeMap, ThemeMap } from '../../util';

export const buildPrettyTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, base?: PartialThemeMap<IPrettyTextTheme>): ThemeMap<IPrettyTextTheme> => {
  const prettyTextTheme: IPrettyTextTheme = {
    normal: {
      default: {
        text: mergeTheme<ITextTheme>(textThemes.default, {
          margin: '1em 0',
        }),
      },
      emphasis: {
        text: textThemes.emphasis,
      },
      strong: {
        text: textThemes.strong,
      },
    },
  };

  const derivedThemes = Object.keys(textThemes).reduce((currentMap: Record<string, RecursivePartial<IPrettyTextTheme>>, textVariant: string): Record<string, RecursivePartial<IPrettyTextTheme>> => {
    // eslint-disable-next-line no-param-reassign
    currentMap[textVariant] = mergeThemePartial({
      normal: {
        default: {
          text: textThemes[textVariant],
        },
      },
    });
    return currentMap;
  }, {});

  derivedThemes.header1 = mergeThemePartial(derivedThemes.header1, {
    normal: {
      default: {
        text: {
          margin: '0.67em 0',
        },
      },
      strong: {
        text: {
          color: '$colors.brandPrimary',
        },
      },
    },
  });

  derivedThemes.header2 = mergeThemePartial(derivedThemes.header2, {
    normal: {
      default: {
        text: {
          margin: '0.83em 0',
        },
      },
    },
  });

  derivedThemes.header3 = mergeThemePartial(derivedThemes.header3, {
    normal: {
      default: {
        text: {
          margin: '1em 0 0.5em 0',
        },
      },
    },
  });

  derivedThemes.header4 = mergeThemePartial(derivedThemes.header4, {
    normal: {
      default: {
        text: {
          margin: '1em 0 0.5em 0',
        },
      },
    },
  });

  derivedThemes.header5 = mergeThemePartial(derivedThemes.header5, {
    normal: {
      default: {
        text: {
          margin: '1em 0 0.5em 0',
        },
      },
    },
  });

  derivedThemes.header6 = mergeThemePartial(derivedThemes.header6, {
    normal: {
      default: {
        text: {
          margin: '1em 0 0.5em 0',
        },
      },
    },
  });

  derivedThemes.paragraph = mergeThemePartial(derivedThemes.paragraph, {
    normal: {
      default: {
        text: {
          margin: '1em 0',
        },
      },
    },
  });

  return mergeThemeMap<IPrettyTextTheme>({
    default: prettyTextTheme,
    ...derivedThemes,
  }, (base || {}));
};
