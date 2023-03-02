import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ICollapsibleBoxThemeBase extends ThemeType {
  background: IBoxTheme;
  headerBackground: IBoxTheme;
  contentBackground: IBoxTheme;
}

export interface ICollapsibleBoxThemeState extends ThemeType {
  default: ICollapsibleBoxThemeBase;
  hover: RecursivePartial<ICollapsibleBoxThemeBase>;
  press: RecursivePartial<ICollapsibleBoxThemeBase>;
  focus: RecursivePartial<ICollapsibleBoxThemeBase>;
}

export interface ICollapsibleBoxTheme extends ThemeType {
  normal: ICollapsibleBoxThemeState;
  collapsed: RecursivePartial<ICollapsibleBoxThemeState>;
}
