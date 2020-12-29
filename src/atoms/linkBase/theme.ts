import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { CssTheme, ThemeType } from '../../util';

export interface ILinkBaseThemeInner extends CssTheme {
  opacity: string;
}

export interface ILinkBaseThemeBase extends ThemeType {
  background: IBoxTheme;
  linkBase: ILinkBaseThemeInner;
}

export interface ILinkBaseThemeState extends ThemeType {
  default: ILinkBaseThemeBase;
  hover: RecursivePartial<ILinkBaseThemeBase>;
  press: RecursivePartial<ILinkBaseThemeBase>;
  focus: RecursivePartial<ILinkBaseThemeBase>;
}

export interface ILinkBaseTheme extends ThemeType {
  normal: ILinkBaseThemeState;
  disabled: RecursivePartial<ILinkBaseThemeState>;
}
