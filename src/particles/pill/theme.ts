import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IPillTheme extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}
