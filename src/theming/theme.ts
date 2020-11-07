import { ThemeMap, ThemeType } from '../util';
import { IColorGuide } from '../elements/colors';
import { IDimensionGuide } from '../elements/dimensions';
import { IFont } from '../elements/fonts';
import { ITextTheme } from '../elements/text';
import { IBoxTheme } from '../elements/box';
import { IIconTheme } from '../elements/icon';
import { IImageTheme } from '../elements/image';
import { IVideoTheme } from '../elements/video';
import { ILoadingSpinnerTheme } from '../elements/loadingSpinner';
import { IPortalTheme } from '../elements/portal';
import { IBulletListTheme } from '../atoms/bulletList';
import { IBulletTextTheme } from '../atoms/bulletText';
import { IButtonTheme } from '../atoms/button';
import { ILinkBaseTheme } from '../atoms/linkBase';
import { IIconButtonTheme } from '../atoms/iconButton';
import { IInputWrapperTheme } from '../atoms/inputWrapper';
import { ILinkTheme } from '../atoms/link';
import { IPrettyTextTheme } from '../atoms/prettyText';
import { IWebViewTheme } from '../atoms/webView';
import { ILinePagerTheme } from '../atoms/linePager';
import { IProgressCounterItemTheme } from '../atoms/progressCounterItem';
import { ITabBarItemTheme } from '../atoms/tabBarItem';

export interface ITheme extends ThemeType {
  // Base
  colors: IColorGuide,
  alternateColors: Record<string, IColorGuide>,
  dimensions: IDimensionGuide,
  fonts: Record<string, IFont>,

  // Elements
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  icons: ThemeMap<IIconTheme>,
  images: ThemeMap<IImageTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,
  portals: ThemeMap<IPortalTheme>,
  videos: ThemeMap<IVideoTheme>,

  // Atoms
  bulletLists: ThemeMap<IBulletListTheme>,
  bulletTexts: ThemeMap<IBulletTextTheme>,
  buttons: ThemeMap<IButtonTheme>,
  linkBases: ThemeMap<ILinkBaseTheme>,
  iconButtons: ThemeMap<IIconButtonTheme>,
  inputWrappers: ThemeMap<IInputWrapperTheme>,
  links: ThemeMap<ILinkTheme>,
  prettyTexts: ThemeMap<IPrettyTextTheme>,
  webViews: ThemeMap<IWebViewTheme>,
  linePagers: ThemeMap<ILinePagerTheme>,
  progressCounterItems: ThemeMap<IProgressCounterItemTheme>,
  tabBarItems: ThemeMap<ITabBarItemTheme>,
}
