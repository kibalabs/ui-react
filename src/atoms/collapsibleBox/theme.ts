import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ICollapsibleBoxThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
  headerBackground: IBoxTheme;
  contentBackground: IBoxTheme;
  dividerColor: string;
  dividerSize: string;
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
