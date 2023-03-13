import { ThemeType } from "../../util";
import { IBoxTheme } from "../box";

export interface IScrollbarTheme extends ThemeType {
  readonly width: string;
  readonly track: IBoxTheme;
  readonly thumb: IBoxTheme;
}
