import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from './theme';
import { mergeThemeMap, PartialThemeMap, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';

export const buildBoxThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base?: PartialThemeMap<IBoxTheme>): ThemeMap<IBoxTheme> => {
  const defaultBoxTheme: IBoxTheme = {
    'background-color': 'transparent',
    'border-radius': dimensions.borderRadius,
    'border-color': 'transparent',
    'border-style': 'solid',
    'border-width': '0',
    'box-shadow': 'none',
    padding: '0',
    margin: '0',
    'outline-style': 'solid',
    'outline-color': 'transparent',
    'outline-width': '0',
    'outline-offset': '0',
    opacity: '1',
  };

  const transparentBoxTheme: RecursivePartial<IBoxTheme> = {
    'background-color': 'transparent',
    padding: dimensions.padding,
  };

  const paddedBoxTheme: RecursivePartial<IBoxTheme> = {
    padding: dimensions.padding,
  };

  const cardBoxTheme: RecursivePartial<IBoxTheme> = {
    'background-color': '$colors.backgroundLight10',
    'border-color': '$colors.backgroundDark05',
    'border-width': dimensions.borderWidth,
    'box-shadow': '0px 8px 8px -6px rgba(0,0,0,0.15)',
    margin: '0px 4px 12px 4px',
    padding: `${dimensions.paddingWide2} ${dimensions.paddingWide2}`,
  };

  const borderedBoxTheme: RecursivePartial<IBoxTheme> = {
    'background-color': '$colors.backgroundLight10',
    'border-color': '$colors.backgroundDark05',
    'border-width': dimensions.borderWidth,
    padding: `${dimensions.paddingWide2} ${dimensions.paddingWide2}`,
  };

  const focusableBoxTheme: RecursivePartial<IBoxTheme> = {
    'border-color': 'transparent',
    'border-width': '2px',
    'border-style': 'solid',
  };

  const focussedBoxTheme: RecursivePartial<IBoxTheme> = {
    'border-color': '$colors.backgroundDark50',
  };

  const roundBoxTheme: RecursivePartial<IBoxTheme> = {
    'border-radius': '50%',
  };

  const unpaddedBoxTheme: RecursivePartial<IBoxTheme> = {
    padding: '0',
  };

  const unmarginedBoxTheme: RecursivePartial<IBoxTheme> = {
    margin: '0',
  };

  const overlayBoxTheme: RecursivePartial<IBoxTheme> = {
    'background-color': '$colors.backgroundClear75',
  };

  return mergeThemeMap<IBoxTheme>({
    default: defaultBoxTheme,
    transparent: transparentBoxTheme,
    padded: paddedBoxTheme,
    card: cardBoxTheme,
    bordered: borderedBoxTheme,
    focusable: focusableBoxTheme,
    focussed: focussedBoxTheme,
    rounded: roundBoxTheme,
    unpadded: unpaddedBoxTheme,
    unmargined: unmarginedBoxTheme,
    overlay: overlayBoxTheme,
  }, (base || {}));
};
