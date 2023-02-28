import { ITheme } from './theme';
import { BulletListThemedStyle } from '../atoms/bulletList';
import { BulletTextThemedStyle } from '../atoms/bulletText';
import { ButtonThemedStyle } from '../atoms/button';
import { CheckboxThemedStyle } from '../atoms/checkbox';
import { DialogThemedStyle } from '../atoms/dialog';
import { IconButtonThemedStyle } from '../atoms/iconButton';
import { InputWrapperThemedStyle } from '../atoms/inputWrapper';
import { LinePagerThemedStyle } from '../atoms/linePager';
import { LinkThemedStyle } from '../atoms/link';
import { LinkBaseThemedStyle } from '../atoms/linkBase';
import { ListItemThemedStyle } from '../atoms/listItem';
import { PrettyTextThemedStyle } from '../atoms/prettyText';
import { ProgressCounterItemThemedStyle } from '../atoms/progressCounterItem';
import { SwitchThemedStyle } from '../atoms/switch';
import { TabBarItemThemedStyle } from '../atoms/tabBarItem';
import { TitledCollapsibleBoxThemedStyle } from '../atoms/titledCollapsibleBox';
import { WebViewThemedStyle } from '../atoms/webView';
import { BoxThemedStyle } from '../particles/box';
import { DividerThemedStyle } from '../particles/divider';
import { IconThemedStyle } from '../particles/icon';
import { ImageThemedStyle } from '../particles/image';
import { LoadingSpinnerThemedStyle } from '../particles/loadingSpinner';
import { PillThemedStyle } from '../particles/pill';
import { PortalThemedStyle } from '../particles/portal';
import { TextThemedStyle } from '../particles/text';
import { VideoThemedStyle } from '../particles/video';
import { ThemeCssFunction, ThemeMap, ThemeType } from '../util/themeUtil';

export interface ComponentDefinition<Theme extends ThemeType> {
  className: string,
  themeMap: ThemeMap<Theme>;
  themeCssFunction: ThemeCssFunction<Theme>;
}

const buildComponentThemeCssString = <Theme extends ThemeType>(name: string, themeMap: ThemeMap<Theme>, themeCssFunction: ThemeCssFunction<Theme>): string => {
  const defaultCss = themeCssFunction(themeMap.default);
  const variantCss = Object.keys(themeMap).filter((themeKey: string): boolean => themeKey !== 'default').reduce((accumulator: string, themeKey: string): string => {
    return `
      ${accumulator};
      &.${themeKey} {
        ${themeCssFunction(themeMap[themeKey])}
      }
    `;
  }, '');
  return `
    .${name} {
      ${defaultCss}
      ${variantCss}
    }
  `;
};

// NOTE(krishan711): this css needs to be processed before rendering so put it in a styled component or similar
export const buildThemeCssString = (theme: ITheme, extraComponentDefinitions?: ComponentDefinition[]): string => {
  const componentDefinitions: ComponentDefinition[] = [
    // particles
    { className: 'Box', themeMap: theme.boxes, themeCssFunction: BoxThemedStyle },
    { className: 'Text', themeMap: theme.texts, themeCssFunction: TextThemedStyle },
    { className: 'Icon', themeMap: theme.icons, themeCssFunction: IconThemedStyle },
    { className: 'Image', themeMap: theme.images, themeCssFunction: ImageThemedStyle },
    { className: 'Divider', themeMap: theme.dividers, themeCssFunction: DividerThemedStyle },
    { className: 'LoadingSpinner', themeMap: theme.loadingSpinners, themeCssFunction: LoadingSpinnerThemedStyle },
    { className: 'Pill', themeMap: theme.pills, themeCssFunction: PillThemedStyle },
    { className: 'Portal', themeMap: theme.portals, themeCssFunction: PortalThemedStyle },
    { className: 'Video', themeMap: theme.videos, themeCssFunction: VideoThemedStyle },
    // atoms
    { className: 'Button', themeMap: theme.buttons, themeCssFunction: ButtonThemedStyle },
    { className: 'Checkbox', themeMap: theme.checkboxes, themeCssFunction: CheckboxThemedStyle },
    { className: 'BulletList', themeMap: theme.bulletLists, themeCssFunction: BulletListThemedStyle },
    { className: 'BulletText', themeMap: theme.bulletTexts, themeCssFunction: BulletTextThemedStyle },
    { className: 'Dialog', themeMap: theme.dialogs, themeCssFunction: DialogThemedStyle },
    { className: 'IconButton', themeMap: theme.iconButtons, themeCssFunction: IconButtonThemedStyle },
    { className: 'InputWrapper', themeMap: theme.inputWrappers, themeCssFunction: InputWrapperThemedStyle },
    { className: 'LinkBase', themeMap: theme.linkBases, themeCssFunction: LinkBaseThemedStyle },
    { className: 'Link', themeMap: theme.links, themeCssFunction: LinkThemedStyle },
    { className: 'ListItem', themeMap: theme.listItems, themeCssFunction: ListItemThemedStyle },
    { className: 'PrettyText', themeMap: theme.prettyTexts, themeCssFunction: PrettyTextThemedStyle },
    { className: 'Switch', themeMap: theme.switches, themeCssFunction: SwitchThemedStyle },
    { className: 'WebView', themeMap: theme.webViews, themeCssFunction: WebViewThemedStyle },
    { className: 'LinePager', themeMap: theme.linePagers, themeCssFunction: LinePagerThemedStyle },
    { className: 'ProgressCounterItem', themeMap: theme.progressCounterItems, themeCssFunction: ProgressCounterItemThemedStyle },
    { className: 'TabBarItem', themeMap: theme.tabBarItems, themeCssFunction: TabBarItemThemedStyle },
    { className: 'TitledCollapsibleBox', themeMap: theme.titledCollapsibleBoxes, themeCssFunction: TitledCollapsibleBoxThemedStyle },
    ...(extraComponentDefinitions || []),
  ];
  const cssString = componentDefinitions.reduce((accumulator: string, current: ComponentDefinition): string => {
    return `
      ${accumulator}
      ${buildComponentThemeCssString(current.className, current.themeMap, current.themeCssFunction)}
    `;
  }, '');
  return cssString;
};
