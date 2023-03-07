import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ISelectableViewThemeBase extends ThemeType {
  background: IBoxTheme;
  overlay: IBoxTheme;
}

export interface ISelectableViewThemeState extends ThemeType {
  default: ISelectableViewThemeBase;
  hover: RecursivePartial<ISelectableViewThemeBase>;
  press: RecursivePartial<ISelectableViewThemeBase>;
  focus: RecursivePartial<ISelectableViewThemeBase>;
}

export interface ISelectableViewTheme extends ThemeType {
  normal: ISelectableViewThemeState;
  selected: RecursivePartial<ISelectableViewThemeState>;
}
