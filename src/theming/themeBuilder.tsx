import { merge, RecursivePartial } from '@kibalabs/core';

import { ITheme } from '.';
import { buildColors, buildAlternateColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildFonts } from '../particles/fonts';
import { buildTextThemes } from '../particles/text';
import { buildBoxThemes } from '../particles/box';
import { buildIconThemes } from '../particles/icon';
import { buildImageThemes } from '../particles/image';
import { buildLoadingSpinnerThemes } from '../particles/loadingSpinner';
import { buildPortalThemes } from '../particles/portal';
import { buildVideoThemes } from '../particles/video';
import { buildBulletListThemes } from '../atoms/bulletList';
import { buildBulletTextThemes } from '../atoms/bulletText';
import { buildButtonThemes } from '../atoms/button';
import { buildIconButtonThemes } from '../atoms/iconButton';
import { buildInputWrapperThemes } from '../atoms/inputWrapper';
import { buildLinkThemes } from '../atoms/link';
import { buildLinkBaseThemes } from '../atoms/linkBase';
import { buildPillThemes } from '../atoms/pill';
import { buildPrettyTextThemes } from '../atoms/prettyText';
import { buildWebViewThemes } from '../atoms/webView';
import { buildLinePagerThemes } from '../atoms/linePager';
import { buildProgressCounterItemThemes } from '../atoms/progressCounterItem';
import { buildTabBarItemThemes } from '../atoms/tabBarItem';

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
  const portalThemes = buildPortalThemes(colors, dimensions, boxThemes, inputTheme?.portals);
  const videoThemes = buildVideoThemes(colors, dimensions, inputTheme?.videos);

  const buttonThemes = buildButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.buttons);
  const bulletListThemes = buildBulletListThemes(colors, dimensions, inputTheme?.bulletLists);
  const bulletTextThemes = buildBulletTextThemes(colors, dimensions, textThemes, inputTheme?.bulletTexts);
  const iconButtonThemes = buildIconButtonThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.iconButtons);
  const inputWrapperThemes = buildInputWrapperThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.inputWrappers);
  const linkBaseThemes = buildLinkBaseThemes(colors, dimensions, boxThemes, inputTheme?.linkBases);
  const linkThemes = buildLinkThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.links);
  const pillThemes = buildPillThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.pills);
  const prettyTextThemes = buildPrettyTextThemes(colors, dimensions, textThemes, inputTheme?.prettyTexts);
  const webViewThemes = buildWebViewThemes(colors, dimensions, boxThemes, inputTheme?.webViews);
  const linePagerThemes = buildLinePagerThemes(colors, dimensions, boxThemes, inputTheme?.linePagers);
  const progressCounterItemThemes = buildProgressCounterItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.progressCounterItems);
  const tabBarItemThemes = buildTabBarItemThemes(colors, dimensions, textThemes, boxThemes, inputTheme?.tabBarItems);

  return merge<ITheme>({
    // Base
    colors: colors,
    alternateColors: alternateColors,
    dimensions: dimensions,
    fonts: fonts,

    // Particles
    boxes: boxThemes,
    texts: textThemes,
    icons: iconThemes,
    images: imageThemes,
    loadingSpinners: loadingSpinnerThemes,
    pills: pillThemes,
    portals: portalThemes,
    videos: videoThemes,

    // Atoms
    bulletLists: bulletListThemes,
    bulletTexts: bulletTextThemes,
    buttons: buttonThemes,
    iconButtons: iconButtonThemes,
    inputWrappers: inputWrapperThemes,
    linkBases: linkBaseThemes,
    links: linkThemes,
    prettyTexts: prettyTextThemes,
    webViews: webViewThemes,
    linePagers: linePagerThemes,
    progressCounterItems: progressCounterItemThemes,
    tabBarItems: tabBarItemThemes,
  }, inputTheme, {
    // NOTE(krish): this is here so the font replacement doesn't get overridden
    fonts: fonts,
  });
};
