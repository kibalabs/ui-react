
import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ICheckboxThemeBase extends ThemeType {
  text: ITextTheme;
  checkColor: string;
  checkBackground: IBoxTheme;
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
