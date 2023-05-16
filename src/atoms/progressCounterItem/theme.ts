import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';


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
