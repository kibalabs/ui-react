import { CssTheme, ThemeType } from '../../util';

export interface IDividerTheme extends CssTheme, ThemeType {
  'color': string;
  'width': string;
  'padding': string;
}
