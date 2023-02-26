import { RecursivePartial } from '@kibalabs/core';

import { ITheme } from '.';
import { buildCheckboxThemes, buildSwitchThemes } from '../atoms';
import { buildBulletListThemes } from '../atoms/bulletList';
import { buildBulletTextThemes } from '../atoms/bulletText';
import { buildButtonThemes } from '../atoms/button';
import { buildDialogThemes } from '../atoms/dialog';
import { buildIconButtonThemes } from '../atoms/iconButton';
import { buildInputWrapperThemes } from '../atoms/inputWrapper';
import { buildLinePagerThemes } from '../atoms/linePager';
import { buildLinkThemes } from '../atoms/link';
import { buildLinkBaseThemes } from '../atoms/linkBase';
import { buildListItemThemes } from '../atoms/listItem';
import { buildPillThemes } from '../atoms/pill';
import { buildPrettyTextThemes } from '../atoms/prettyText';
import { buildProgressCounterItemThemes } from '../atoms/progressCounterItem';
import { buildTabBarItemThemes } from '../atoms/tabBarItem';
import { buildTitledCollapsibleBoxThemes } from '../atoms/titledCollapsibleBox';
import { buildWebViewThemes } from '../atoms/webView';
import { buildBoxThemes } from '../particles/box';
import { buildAlternateColors, buildColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildDividerThemes } from '../particles/divider';
import { buildFonts } from '../particles/fonts';
import { buildIconThemes } from '../particles/icon';
import { buildImageThemes } from '../particles/image';
import { buildLoadingSpinnerThemes } from '../particles/loadingSpinner';
import { buildPortalThemes } from '../particles/portal';
import { buildTextThemes } from '../particles/text';
import { buildVideoThemes } from '../particles/video';

export const buildTheme = (inputTheme?: RecursivePartial<ITheme>): ITheme => {
  // Base
  const colors = buildColors(inputTheme?.colors);
  const alternateColors = buildAlternateColors(colors, inputTheme?.alternateColors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);

  // Particles
  const textThemes = buildTextThemes(colors, dimensions, inputTheme?.texts);
  const boxThemes = buildBoxThemes(colors, dimensions, inputTheme?.boxes);
  const iconThemes = buildIconThemes(colors, dimensions, boxThemes, inputTheme?.icons);
  const imageThemes = buildImageThemes(colors, dimensions, boxThemes, inputTheme?.images);
  const dividerThemes = buildDividerThemes(colors, dimensions, inputTheme?.dividers);
  const loadingSpinnerThemes = buildLoadingSpinnerThemes(colors, dimensions, inputTheme?.loadingSpinners);
  const pillThemes = buildPillThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.pills);
  const portalThemes = buildPortalThemes(colors, dimensions, boxThemes, inputTheme?.portals);
  const videoThemes = buildVideoThemes(colors, dimensions, inputTheme?.videos);

  return {
    // Base
    colors,
    alternateColors,
    dimensions,
    fonts,

    // Particles
    boxes: boxThemes,
    texts: textThemes,
    icons: iconThemes,
    images: imageThemes,
    dividers: dividerThemes,
    loadingSpinners: loadingSpinnerThemes,
    pills: pillThemes,
    portals: portalThemes,
    videos: videoThemes,

    // Atoms
    buttons: buildButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.buttons),
    checkboxes: buildCheckboxThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.checkboxes),
    bulletLists: buildBulletListThemes(colors, dimensions, inputTheme?.bulletLists),
    bulletTexts: buildBulletTextThemes(colors, dimensions, textThemes, inputTheme?.bulletTexts),
    dialogs: buildDialogThemes(colors, dimensions, boxThemes, inputTheme?.dialogs),
    iconButtons: buildIconButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.iconButtons),
    inputWrappers: buildInputWrapperThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.inputWrappers),
    linkBases: buildLinkBaseThemes(colors, dimensions, boxThemes, inputTheme?.linkBases),
    links: buildLinkThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.links),
    listItems: buildListItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.listItems),
    prettyTexts: buildPrettyTextThemes(colors, dimensions, textThemes, inputTheme?.prettyTexts),
    switches: buildSwitchThemes(colors, dimensions, boxThemes, inputTheme?.switches),
    webViews: buildWebViewThemes(colors, dimensions, boxThemes, inputTheme?.webViews),
    linePagers: buildLinePagerThemes(colors, dimensions, boxThemes, inputTheme?.linePagers),
    progressCounterItems: buildProgressCounterItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.progressCounterItems),
    tabBarItems: buildTabBarItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.tabBarItems),
    titledCollapsibleBoxes: buildTitledCollapsibleBoxThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.titledCollapsibleBoxes),
  };
};
