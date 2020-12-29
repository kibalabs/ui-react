import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IButtonThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IButtonThemeState extends ThemeType {
  default: IButtonThemeBase;
  hover: RecursivePartial<IButtonThemeBase>;
  press: RecursivePartial<IButtonThemeBase>;
  focus: RecursivePartial<IButtonThemeBase>;
}

export interface IButtonTheme extends ThemeType {
  normal: IButtonThemeState;
  disabled: RecursivePartial<IButtonThemeState>;
}
