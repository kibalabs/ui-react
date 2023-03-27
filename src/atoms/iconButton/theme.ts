import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';


export interface IIconButtonThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IIconButtonThemeState extends ThemeType {
  default: IIconButtonThemeBase;
  hover: RecursivePartial<IIconButtonThemeBase>;
  press: RecursivePartial<IIconButtonThemeBase>;
  focus: RecursivePartial<IIconButtonThemeBase>;
}

export interface IIconButtonTheme extends ThemeType {
  normal: IIconButtonThemeState;
  disabled: RecursivePartial<IIconButtonThemeState>;
}
