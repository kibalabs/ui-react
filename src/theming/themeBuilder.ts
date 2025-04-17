import { RecursivePartial } from '@kibalabs/core';


import { ITheme } from '.';
import { buildBulletListThemes, IBulletListTheme } from '../atoms/bulletList';
import { buildBulletTextThemes, IBulletTextTheme } from '../atoms/bulletText';
import { buildButtonThemes, IButtonTheme } from '../atoms/buttonStyled';
import { buildCheckboxThemes, ICheckboxTheme } from '../atoms/checkbox';
import { buildCollapsibleBoxThemes, ICollapsibleBoxTheme } from '../atoms/collapsibleBox';
import { buildDialogThemes, IDialogTheme } from '../atoms/dialog';
import { buildIconButtonThemes, IIconButtonTheme } from '../atoms/iconButton';
import { buildInputWrapperThemes, IInputWrapperTheme } from '../atoms/inputWrapper';
import { buildLinePagerThemes, ILinePagerTheme } from '../atoms/linePager';
import { buildLinkThemes, ILinkTheme } from '../atoms/link';
import { buildLinkBaseThemes, ILinkBaseTheme } from '../atoms/linkBase';
import { buildListItemThemes, IListItemTheme } from '../atoms/listItem';
import { buildPrettyTextThemes, IPrettyTextTheme } from '../atoms/prettyText';
import { buildProgressCounterItemThemes, IProgressCounterItemTheme } from '../atoms/progressCounterItem';
import { buildSelectableViewThemes, ISelectableViewTheme } from '../atoms/selectableView';
import { buildSwitchThemes, ISwitchTheme } from '../atoms/switch';
import { buildTabBarItemThemes, ITabBarItemTheme } from '../atoms/tabBarItem';
import { buildTitledCollapsibleBoxThemes, ITitledCollapsibleBoxTheme } from '../atoms/titledCollapsibleBox';
import { buildWebViewThemes, IWebViewTheme } from '../atoms/webView';
import { buildBoxThemes, IBoxTheme } from '../particles/box';
import { buildAlternateColors, buildColors } from '../particles/colors';
import { buildDimensions } from '../particles/dimensions';
import { buildDividerThemes, IDividerTheme } from '../particles/divider';
import { buildFonts } from '../particles/fonts';
import { buildIconThemes, IIconTheme } from '../particles/icon';
import { buildImageThemes, IImageTheme } from '../particles/image';
import { buildLoadingSpinnerThemes, ILoadingSpinnerTheme } from '../particles/loadingSpinner';
import { buildPillThemes, IPillTheme } from '../particles/pill';
import { buildPortalThemes, IPortalTheme } from '../particles/portal';
import { buildTextThemes, ITextTheme } from '../particles/text';
import { buildVideoThemes, IVideoTheme } from '../particles/video';
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
  const iconThemes = buildIconThemes(dimensions, boxThemes, inputTheme?.icons as PartialThemeMap<IIconTheme>);
  const imageThemes = buildImageThemes(dimensions, boxThemes, inputTheme?.images as PartialThemeMap<IImageTheme>);
  const dividerThemes = buildDividerThemes(dimensions, inputTheme?.dividers as PartialThemeMap<IDividerTheme>);
  const loadingSpinnerThemes = buildLoadingSpinnerThemes(dimensions, inputTheme?.loadingSpinners as PartialThemeMap<ILoadingSpinnerTheme>);
  const pillThemes = buildPillThemes(dimensions, textThemes, boxThemes, inputTheme?.pills as PartialThemeMap<IPillTheme>);
  const portalThemes = buildPortalThemes(dimensions, boxThemes, inputTheme?.portals as PartialThemeMap<IPortalTheme>);
  const videoThemes = buildVideoThemes(dimensions, inputTheme?.videos as PartialThemeMap<IVideoTheme>);

  // NOTE(krishan711): this seems weird, think of a better approach (it's for buildSelectableViewThemes)
  const linkBaseThemes = buildLinkBaseThemes(dimensions, boxThemes, inputTheme?.linkBases as PartialThemeMap<ILinkBaseTheme>);

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
    buttons: buildButtonThemes(dimensions, textThemes, boxThemes, inputTheme?.buttons as PartialThemeMap<IButtonTheme>),
    checkboxes: buildCheckboxThemes(dimensions, textThemes, boxThemes, inputTheme?.checkboxes as PartialThemeMap<ICheckboxTheme>),
    bulletLists: buildBulletListThemes(dimensions, inputTheme?.bulletLists as PartialThemeMap<IBulletListTheme>),
    bulletTexts: buildBulletTextThemes(dimensions, textThemes, inputTheme?.bulletTexts as PartialThemeMap<IBulletTextTheme>),
    collapsibleBoxes: buildCollapsibleBoxThemes(dimensions, textThemes, boxThemes, inputTheme?.collapsibleBoxes as PartialThemeMap<ICollapsibleBoxTheme>),
    dialogs: buildDialogThemes(dimensions, boxThemes, inputTheme?.dialogs as PartialThemeMap<IDialogTheme>),
    iconButtons: buildIconButtonThemes(dimensions, textThemes, boxThemes, inputTheme?.iconButtons as PartialThemeMap<IIconButtonTheme>),
    inputWrappers: buildInputWrapperThemes(dimensions, textThemes, boxThemes, inputTheme?.inputWrappers as PartialThemeMap<IInputWrapperTheme>),
    linkBases: linkBaseThemes,
    links: buildLinkThemes(dimensions, textThemes, boxThemes, inputTheme?.links as PartialThemeMap<ILinkTheme>),
    listItems: buildListItemThemes(dimensions, textThemes, boxThemes, inputTheme?.listItems as PartialThemeMap<IListItemTheme>),
    prettyTexts: buildPrettyTextThemes(dimensions, textThemes, inputTheme?.prettyTexts as PartialThemeMap<IPrettyTextTheme>),
    switches: buildSwitchThemes(dimensions, boxThemes, inputTheme?.switches as PartialThemeMap<ISwitchTheme>),
    webViews: buildWebViewThemes(dimensions, boxThemes, inputTheme?.webViews as PartialThemeMap<IWebViewTheme>),
    linePagers: buildLinePagerThemes(dimensions, boxThemes, inputTheme?.linePagers as PartialThemeMap<ILinePagerTheme>),
    progressCounterItems: buildProgressCounterItemThemes(dimensions, textThemes, boxThemes, inputTheme?.progressCounterItems as PartialThemeMap<IProgressCounterItemTheme>),
    tabBarItems: buildTabBarItemThemes(dimensions, textThemes, boxThemes, inputTheme?.tabBarItems as PartialThemeMap<ITabBarItemTheme>),
    titledCollapsibleBoxes: buildTitledCollapsibleBoxThemes(dimensions, textThemes, boxThemes, inputTheme?.titledCollapsibleBoxes as PartialThemeMap<ITitledCollapsibleBoxTheme>),
    selectableViews: buildSelectableViewThemes(dimensions, boxThemes, linkBaseThemes, inputTheme?.selectableViews as PartialThemeMap<ISelectableViewTheme>),
  };
};
