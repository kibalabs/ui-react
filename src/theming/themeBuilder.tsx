import { merge, RecursivePartial } from '@kibalabs/core';

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
  const colors = buildColors(inputTheme?.colors);
  const alternateColors = buildAlternateColors(colors, inputTheme?.alternateColors);
  const dimensions = buildDimensions(inputTheme?.dimensions);
  const fonts = buildFonts(inputTheme?.fonts);

  const textThemes = buildTextThemes(colors, dimensions, inputTheme?.texts);
  const boxThemes = buildBoxThemes(colors, dimensions, inputTheme?.boxes);
  const iconThemes = buildIconThemes(colors, dimensions, boxThemes, inputTheme?.icons);
  const imageThemes = buildImageThemes(colors, dimensions, boxThemes, inputTheme?.images);
  const loadingSpinnerThemes = buildLoadingSpinnerThemes(colors, dimensions, inputTheme?.loadingSpinners);
  const dividerThemes = buildDividerThemes(colors, dimensions, inputTheme?.dividers);
  const portalThemes = buildPortalThemes(colors, dimensions, boxThemes, inputTheme?.portals);
  const videoThemes = buildVideoThemes(colors, dimensions, inputTheme?.videos);

  const buttonThemes = buildButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.buttons);
  const checkboxThemes = buildCheckboxThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.checkboxes);
  const bulletListThemes = buildBulletListThemes(colors, dimensions, inputTheme?.bulletLists);
  const bulletTextThemes = buildBulletTextThemes(colors, dimensions, textThemes, inputTheme?.bulletTexts);
  const dialogThemes = buildDialogThemes(colors, dimensions, boxThemes, inputTheme?.dialogs);
  const iconButtonThemes = buildIconButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.iconButtons);
  const inputWrapperThemes = buildInputWrapperThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.inputWrappers);
  const linkBaseThemes = buildLinkBaseThemes(colors, dimensions, boxThemes, inputTheme?.linkBases);
  const linkThemes = buildLinkThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.links);
  const listItemTheme = buildListItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.listItems);
  const pillThemes = buildPillThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.pills);
  const prettyTextThemes = buildPrettyTextThemes(colors, dimensions, textThemes, inputTheme?.prettyTexts);
  const switchThemes = buildSwitchThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.switches);
  const webViewThemes = buildWebViewThemes(colors, dimensions, boxThemes, inputTheme?.webViews);
  const linePagerThemes = buildLinePagerThemes(colors, dimensions, boxThemes, inputTheme?.linePagers);
  const progressCounterItemThemes = buildProgressCounterItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.progressCounterItems);
  const tabBarItemThemes = buildTabBarItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.tabBarItems);
  const titledCollapsibleBoxThemes = buildTitledCollapsibleBoxThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.titledCollapsibleBoxes);

  return merge<ITheme>({
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
    bulletLists: bulletListThemes,
    bulletTexts: bulletTextThemes,
    buttons: buttonThemes,
    checkboxes: checkboxThemes,
    dialogs: dialogThemes,
    iconButtons: iconButtonThemes,
    inputWrappers: inputWrapperThemes,
    linkBases: linkBaseThemes,
    links: linkThemes,
    listItems: listItemTheme,
    prettyTexts: prettyTextThemes,
    switches: switchThemes,
    webViews: webViewThemes,
    linePagers: linePagerThemes,
    progressCounterItems: progressCounterItemThemes,
    tabBarItems: tabBarItemThemes,
    titledCollapsibleBoxes: titledCollapsibleBoxThemes,
  }, inputTheme, {
    // NOTE(krishan711): this is here so the font replacement doesn't get overridden
    fonts,
  });
};
