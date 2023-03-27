import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme, ITextTheme } from '../../particles';
import { ThemeType } from '../../util';


export interface ITitledCollapsibleBoxThemeBase extends ThemeType {
  background: IBoxTheme;
  headerText: ITextTheme;
  headerBackground: IBoxTheme;
  contentBackground: IBoxTheme;
}

export interface ITitledCollapsibleBoxThemeState extends ThemeType {
  default: ITitledCollapsibleBoxThemeBase;
  hover: RecursivePartial<ITitledCollapsibleBoxThemeBase>;
  press: RecursivePartial<ITitledCollapsibleBoxThemeBase>;
  focus: RecursivePartial<ITitledCollapsibleBoxThemeBase>;
}

export interface ITitledCollapsibleBoxTheme extends ThemeType {
  normal: ITitledCollapsibleBoxThemeState;
  collapsed: RecursivePartial<ITitledCollapsibleBoxThemeState>;
}
