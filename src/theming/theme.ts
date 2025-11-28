import { IColorGuide } from '../particles/colors';
import { IDimensionGuide } from '../particles/dimensions';
import { IFont } from '../particles/fonts';

export interface ITheme {
  colors: IColorGuide;
  alternateColors: Record<string, IColorGuide>;
  dimensions: IDimensionGuide;
  fonts: Record<string, IFont>;
}
