import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ILinePagerThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface ILinePagerThemeState extends ThemeType {
  default: ILinePagerThemeBase;
  hover: RecursivePartial<ILinePagerThemeBase>;
  press: RecursivePartial<ILinePagerThemeBase>;
  focus: RecursivePartial<ILinePagerThemeBase>;
}

export interface ILinePagerTheme extends ThemeType {
  normal: ILinePagerThemeState;
  active: RecursivePartial<ILinePagerThemeState>;
}
