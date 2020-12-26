import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IWebViewThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface IWebViewThemeState extends ThemeType {
  default: IWebViewThemeBase;
}

export interface IWebViewTheme extends ThemeType {
  normal: IWebViewThemeState;
}
