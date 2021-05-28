
import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ISwitchThemeBase extends ThemeType {
  switch: IBoxTheme;
  switchBackground: IBoxTheme;
}

export interface ISwitchThemeState extends ThemeType {
  default: ISwitchThemeBase;
  hover: RecursivePartial<ISwitchThemeBase>;
  press: RecursivePartial<ISwitchThemeBase>;
  focus: RecursivePartial<ISwitchThemeBase>;
}

export interface ISwitchTheme extends ThemeType {
  unchecked: ISwitchThemeState;
  checked: RecursivePartial<ISwitchThemeState>;
  disabled: RecursivePartial<ISwitchThemeState>;
}
