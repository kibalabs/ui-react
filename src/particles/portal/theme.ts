import { ThemeType } from '../../util';
import { IBoxTheme } from '../box';

export interface IPortalTheme extends ThemeType {
  background: IBoxTheme;
}
