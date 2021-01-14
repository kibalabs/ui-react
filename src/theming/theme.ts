import { IBulletListTheme } from '../atoms/bulletList';
import { IBulletTextTheme } from '../atoms/bulletText';
import { IButtonTheme } from '../atoms/button';
import { IIconButtonTheme } from '../atoms/iconButton';
import { IInputWrapperTheme } from '../atoms/inputWrapper';
import { ILinePagerTheme } from '../atoms/linePager';
import { ILinkTheme } from '../atoms/link';
import { ILinkBaseTheme } from '../atoms/linkBase';
import { IPillTheme } from '../atoms/pill';
import { IPrettyTextTheme } from '../atoms/prettyText';
import { IProgressCounterItemTheme } from '../atoms/progressCounterItem';
import { ITabBarItemTheme } from '../atoms/tabBarItem';
import { ITitledCollapsibleBoxTheme } from '../atoms/titledCollapsibleBox';
import { IWebViewTheme } from '../atoms/webView';
import { IBoxTheme } from '../particles/box';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { IFont } from '../particles/fonts';
import { IIconTheme } from '../particles/icon';
import { IImageTheme } from '../particles/image';
import { ILoadingSpinnerTheme } from '../particles/loadingSpinner';
import { IPortalTheme } from '../particles/portal';
import { ITextTheme } from '../particles/text';
import { IVideoTheme } from '../particles/video';
import { ThemeMap, ThemeType } from '../util';

export interface ITheme extends ThemeType {
  // Base
  colors: IColorGuide,
  alternateColors: Record<string, IColorGuide>,
  dimensions: IDimensionGuide,
  fonts: Record<string, IFont>,

  // Particles
  boxes: ThemeMap<IBoxTheme>,
  texts: ThemeMap<ITextTheme>,
  icons: ThemeMap<IIconTheme>,
  images: ThemeMap<IImageTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,
  pills: ThemeMap<IPillTheme>,
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
  titledCollapsibleBoxes: ThemeMap<ITitledCollapsibleBoxTheme>,
}
