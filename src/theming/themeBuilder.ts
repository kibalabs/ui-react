import { RecursivePartial } from '@kibalabs/core';


import { ITheme } from '.';
import { IDialogTheme } from '../atoms/dialog';
import { buildBoxThemes, IBoxTheme } from '../particles/box';
import { buildAlternateColors, buildColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildFonts } from '../particles/fonts';
import { buildLoadingSpinnerThemes, ILoadingSpinnerTheme } from '../particles/loadingSpinner';
import { buildTextThemes, ITextTheme } from '../particles/text';
import { PartialThemeMap } from '../util';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  // Base
  const colors = buildColors(inputTheme?.colors);
  const alternateColors = buildAlternateColors(colors, inputTheme?.alternateColors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);

  // Particles
  const textThemes = buildTextThemes(dimensions, inputTheme?.texts as PartialThemeMap<ITextTheme>);
  const boxThemes = buildBoxThemes(dimensions, inputTheme?.boxes as PartialThemeMap<IBoxTheme>);
  const loadingSpinnerThemes = buildLoadingSpinnerThemes(dimensions, inputTheme?.loadingSpinners as PartialThemeMap<ILoadingSpinnerTheme>);

  return {
    // Base
    colors,
    alternateColors,
    dimensions,
    fonts,

    // Particles
    boxes: boxThemes,
    texts: textThemes,
    icons: {},
    images: {},
    dividers: {},
    loadingSpinners: loadingSpinnerThemes,
    pills: {},
    portals: {},
    videos: {},

    // Atoms
    buttons: {},
    checkboxes: {},
    bulletLists: {},
    bulletTexts: {},
    collapsibleBoxes: {},
    dialogs: {} as Record<string, IDialogTheme>,
    iconButtons: {},
    inputWrappers: {},
    linkBases: {},
    links: {},
    listItems: {},
    prettyTexts: {},
    switches: {},
    webViews: {},
    linePagers: {},
    progressCounterItems: {},
    tabBarItems: {},
    titledCollapsibleBoxes: {},
    selectableViews: {},
  };
};
