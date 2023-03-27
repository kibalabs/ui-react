import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';


export interface ILinkThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface ILinkThemeState extends ThemeType {
  default: ILinkThemeBase;
  hover: RecursivePartial<ILinkThemeBase>;
}

export interface ILinkTheme extends ThemeType {
  normal: ILinkThemeState;
  disabled: RecursivePartial<ILinkThemeState>;
  visited: RecursivePartial<ILinkThemeState>;
}
