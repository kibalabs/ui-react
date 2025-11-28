import { RecursivePartial } from '@kibalabs/core';


import { ITheme } from '.';
import { buildAlternateColors, buildColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildFonts } from '../particles/fonts';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  // Base
  const colors = buildColors(inputTheme?.colors);
  const alternateColors = buildAlternateColors(colors, inputTheme?.alternateColors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);

  return {
    // Base
    colors,
    alternateColors,
    dimensions,
    fonts,

    // Particles (legacy - empty objects for backwards compat)
    boxes: {},
    texts: {},
    icons: {},
    images: {},
    dividers: {},
    loadingSpinners: {},
    pills: {},
    portals: {},
    videos: {},

    // Atoms (legacy - empty objects for backwards compat)
    buttons: {},
    checkboxes: {},
    bulletLists: {},
    bulletTexts: {},
    collapsibleBoxes: {},
    dialogs: {},
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
