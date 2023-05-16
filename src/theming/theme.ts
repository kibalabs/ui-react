import { IBoxTheme } from '../particles/box';
import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { IDividerTheme } from '../particles/divider';
import { IFont } from '../particles/fonts';
import { IIconTheme } from '../particles/icon';
import { IImageTheme } from '../particles/image';
import { ILoadingSpinnerTheme } from '../particles/loadingSpinner';
import { IPillTheme } from '../particles/pill';
import { IPortalTheme } from '../particles/portal';
import { ITextTheme } from '../particles/text';
import { IVideoTheme } from '../particles/video';
import { ThemeMap, ThemeType } from '../util';

export interface ITheme extends Record<string, ThemeType> {
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
  dividers: ThemeMap<IDividerTheme>,
  loadingSpinners: ThemeMap<ILoadingSpinnerTheme>,
  pills: ThemeMap<IPillTheme>,
  portals: ThemeMap<IPortalTheme>,
  videos: ThemeMap<IVideoTheme>,
}
