import { CssTheme, ThemeType } from '../../util';

export interface IDividerTheme extends CssTheme, ThemeType {
  'background': string;
  'border-radius': string;
  'border-color': string;
  'padding': string;
  'width': string;
  'height': string;
  'margin': string;
};
