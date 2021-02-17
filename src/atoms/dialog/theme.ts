import { IBoxTheme } from '../../particles';
import { ThemeType } from '../../util';

export interface IDialogTheme extends ThemeType {
  backdropColor: string;
  background: IBoxTheme;
}
