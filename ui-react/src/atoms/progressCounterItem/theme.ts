import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme, ITextTheme } from '../../subatoms';

export interface IProgressCounterItemThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface IProgressCounterItemThemeState extends ThemeType {
  default: IProgressCounterItemThemeBase;
  hover: RecursivePartial<IProgressCounterItemThemeBase>;
  press: RecursivePartial<IProgressCounterItemThemeBase>;
  focus: RecursivePartial<IProgressCounterItemThemeBase>;
}

export interface IProgressCounterItemTheme extends ThemeType {
  normal: IProgressCounterItemThemeState;
  disabled: RecursivePartial<IProgressCounterItemThemeState>;
  selected: RecursivePartial<IProgressCounterItemThemeState>;
}
