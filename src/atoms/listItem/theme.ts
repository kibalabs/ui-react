import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IListItemThemeBase extends ThemeType {
  background: IBoxTheme;
}

export interface IListItemThemeState extends ThemeType {
  default: IListItemThemeBase;
  hover: RecursivePartial<IListItemThemeBase>;
  press: RecursivePartial<IListItemThemeBase>;
  focus: RecursivePartial<IListItemThemeBase>;
}

export interface IListItemTheme extends ThemeType {
  normal: IListItemThemeState;
  disabled: RecursivePartial<IListItemThemeState>;
  selected: RecursivePartial<IListItemThemeState>;
}
