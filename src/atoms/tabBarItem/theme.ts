import { RecursivePartial } from '@kibalabs/core';

import { ThemeType } from '../../util';
import { IBoxTheme, ITextTheme } from '../../elements';

export interface ITabBarItemThemeBase extends ThemeType {
  text: ITextTheme;
  background: IBoxTheme;
}

export interface ITabBarItemThemeState extends ThemeType {
  default: ITabBarItemThemeBase;
  hover: RecursivePartial<ITabBarItemThemeBase>;
  press: RecursivePartial<ITabBarItemThemeBase>;
  focus: RecursivePartial<ITabBarItemThemeBase>;
}

export interface ITabBarItemTheme extends ThemeType {
  normal: ITabBarItemThemeState;
  selected: RecursivePartial<ITabBarItemThemeState>;
  disabled: RecursivePartial<ITabBarItemThemeState>;
}
