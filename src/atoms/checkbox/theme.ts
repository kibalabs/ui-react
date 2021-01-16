
import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme, ITextTheme } from '../../particles';

export interface ICheckboxThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface ICheckboxThemeState extends ThemeType {
  default: ICheckboxThemeBase;
  hover: RecursivePartial<ICheckboxThemeBase>;
  press: RecursivePartial<ICheckboxThemeBase>;
  focus: RecursivePartial<ICheckboxThemeBase>;
}

export interface ICheckboxTheme extends ThemeType {
  normal: ICheckboxThemeState;
  checked: RecursivePartial<ICheckboxThemeState>;
  disabled: RecursivePartial<ICheckboxThemeState>;
}