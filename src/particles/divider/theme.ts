import { CssTheme, ThemeType } from '../../util';

export interface IDividerTheme extends CssTheme, ThemeType {
  'background': string;
  'border-radius': string;
  'border-color': string;
  'border-width': string;
  'border-style': string;
  'padding': string;
  'width': string;
  'margin': string;
};
