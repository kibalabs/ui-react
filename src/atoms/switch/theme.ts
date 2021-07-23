
import { RecursivePartial } from '@kibalabs/core';

import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface ISwitchThemeBase extends ThemeType {
  switch: IBoxTheme;
  background: IBoxTheme;
  switchWidth: string;
  switchHeight: string;
  backgroundWidth: string;
}

export interface ISwitchThemeState extends ThemeType {
  default: ISwitchThemeBase;
  hover: RecursivePartial<ISwitchThemeBase>;
  press: RecursivePartial<ISwitchThemeBase>;
  focus: RecursivePartial<ISwitchThemeBase>;
}

export interface ISwitchTheme extends ThemeType {
  normal: ISwitchThemeState;
  checked: RecursivePartial<ISwitchThemeState>;
  disabled: RecursivePartial<ISwitchThemeState>;
}
