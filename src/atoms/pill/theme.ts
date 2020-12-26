import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IPillThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IPillThemeState extends ThemeType {
  default: IPillThemeBase;
  // NOTE(rikhil): we can include hover, press, focus if we allow pills to be clicked
}

export interface IPillTheme extends ThemeType {
  normal: IPillThemeState;
}
