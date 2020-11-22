import { ThemeMap, ThemeType } from '../util';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { IFont } from '../particles/fonts';
import { ITextTheme } from '../particles/text';
import { IBoxTheme } from '../particles/box';
import { IIconTheme } from '../particles/icon';
import { IImageTheme } from '../particles/image';
import { IVideoTheme } from '../particles/video';
import { ILoadingSpinnerTheme } from '../particles/loadingSpinner';
import { IPortalTheme } from '../particles/portal';
import { IBulletListTheme } from '../atoms/bulletList';
import { IBulletTextTheme } from '../atoms/bulletText';
import { IButtonTheme } from '../atoms/button';
import { ILinkBaseTheme } from '../atoms/linkBase';
import { IIconButtonTheme } from '../atoms/iconButton';
import { IInputWrapperTheme } from '../atoms/inputWrapper';
import { ILinkTheme } from '../atoms/link';
import { IPillTheme } from '../atoms/pill';
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
}
