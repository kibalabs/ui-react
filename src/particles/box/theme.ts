import { CssTheme, ThemeType } from '../../util';

export interface IBoxTheme extends CssTheme, ThemeType {
  'background-color': string;
  'border-radius': string;
  'border-color': string;
  'border-width': string;
  'border-style': string;
  'padding': string;
  'box-shadow': string;
  'margin': string;
  'outline-style': string;
  'outline-color': string;
  'outline-width': string;
  'outline-offset': string;
  'opacity': string;
}
