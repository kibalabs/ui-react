import React from 'react';

import { ITheme } from './theme';
import { BulletList, BulletListThemedStyle } from '../atoms/bulletList';
import { BulletText, BulletTextThemedStyle } from '../atoms/bulletText';
import { ButtonStyled, ButtonThemedStyle } from '../atoms/buttonStyled';
import { Checkbox, CheckboxThemedStyle } from '../atoms/checkbox';
import { CollapsibleBox, CollapsibleBoxThemedStyle } from '../atoms/collapsibleBox';
import { Dialog, DialogThemedStyle } from '../atoms/dialog';
import { IconButton, IconButtonThemedStyle } from '../atoms/iconButton';
import { InputWrapper, InputWrapperThemedStyle } from '../atoms/inputWrapper';
import { LinePager, LinePagerThemedStyle } from '../atoms/linePager';
import { Link, LinkThemedStyle } from '../atoms/link';
import { LinkBase, LinkBaseThemedStyle } from '../atoms/linkBase';
import { ListItem, ListItemThemedStyle } from '../atoms/listItem';
import { PrettyText, PrettyTextThemedStyle } from '../atoms/prettyText';
import { ProgressCounterItem, ProgressCounterItemThemedStyle } from '../atoms/progressCounterItem';
import { SelectableView, SelectableViewThemedStyle } from '../atoms/selectableView';
import { Switch, SwitchThemedStyle } from '../atoms/switch';
import { TabBarItem, TabBarItemThemedStyle } from '../atoms/tabBarItem';
import { TitledCollapsibleBox, TitledCollapsibleBoxThemedStyle } from '../atoms/titledCollapsibleBox';
import { WebView, WebViewThemedStyle } from '../atoms/webView';
import { IComponentProps } from '../model';
import { Box, BoxThemedStyle } from '../particles/box';
import { Divider, DividerThemedStyle } from '../particles/divider';
import { Icon, IconThemedStyle } from '../particles/icon';
import { Image, ImageThemedStyle } from '../particles/image';
import { LoadingSpinner, LoadingSpinnerThemedStyle } from '../particles/loadingSpinner';
import { Pill, PillThemedStyle } from '../particles/pill';
import { Portal, PortalThemedStyle } from '../particles/portal';
import { Text, TextThemedStyle } from '../particles/text';
import { Video, VideoThemedStyle } from '../particles/video';
import { colorsToCss, ThemeCssFunction, ThemeMap, themeToCss, ThemeType } from '../util/themeUtil';

export interface ComponentDefinition<Theme extends ThemeType> {
  component: React.FunctionComponent<IComponentProps<Theme>>,
  themeMap: ThemeMap<Theme>;
  themeCssFunction: ThemeCssFunction<Theme>;
}

const buildComponentThemeCssString = <Theme extends ThemeType>(name: string, themeMap: ThemeMap<Theme>, themeCssFunction: ThemeCssFunction<Theme>): string => {
  const defaultCss = themeCssFunction(themeMap.default);
  const componentCss = Object.keys(themeMap).filter((themeKey: string): boolean => themeKey !== 'default').reduce((accumulator: string, themeKey: string): string => {
    return `
      ${accumulator};
      &.${themeKey} {
        ${themeCssFunction(themeMap[themeKey])}
      }
    `;
  }, defaultCss);
  return `.${name} { ${componentCss} }`;
};

// NOTE(krishan711): this css needs to be processed before rendering so put it in a styled component or similar
// @ts-ignore: can't figure out how to get the generics to work well here. apparently it requires existential types but feels like there should be an easy workaround.
export const buildThemeCssString = (theme: ITheme, extraComponentDefinitions?: ComponentDefinition[]): string => {
  // @ts-ignore
  const componentDefinitions: ComponentDefinition[] = [
    // particles
    { component: Box, themeMap: theme.boxes, themeCssFunction: BoxThemedStyle },
    { component: Text, themeMap: theme.texts, themeCssFunction: TextThemedStyle },
    { component: Icon, themeMap: theme.icons, themeCssFunction: IconThemedStyle },
    { component: Image, themeMap: theme.images, themeCssFunction: ImageThemedStyle },
    { component: Divider, themeMap: theme.dividers, themeCssFunction: DividerThemedStyle },
    { component: LoadingSpinner, themeMap: theme.loadingSpinners, themeCssFunction: LoadingSpinnerThemedStyle },
    { component: Pill, themeMap: theme.pills, themeCssFunction: PillThemedStyle },
    { component: Portal, themeMap: theme.portals, themeCssFunction: PortalThemedStyle },
    { component: Video, themeMap: theme.videos, themeCssFunction: VideoThemedStyle },
    // atoms
    { component: ButtonStyled, themeMap: theme.buttons, themeCssFunction: ButtonThemedStyle },
    { component: Checkbox, themeMap: theme.checkboxes, themeCssFunction: CheckboxThemedStyle },
    { component: BulletList, themeMap: theme.bulletLists, themeCssFunction: BulletListThemedStyle },
    { component: BulletText, themeMap: theme.bulletTexts, themeCssFunction: BulletTextThemedStyle },
    { component: CollapsibleBox, themeMap: theme.collapsibleBoxes, themeCssFunction: CollapsibleBoxThemedStyle },
    { component: Dialog, themeMap: theme.dialogs, themeCssFunction: DialogThemedStyle },
    { component: IconButton, themeMap: theme.iconButtons, themeCssFunction: IconButtonThemedStyle },
    { component: InputWrapper, themeMap: theme.inputWrappers, themeCssFunction: InputWrapperThemedStyle },
    { component: LinkBase, themeMap: theme.linkBases, themeCssFunction: LinkBaseThemedStyle },
    { component: Link, themeMap: theme.links, themeCssFunction: LinkThemedStyle },
    { component: ListItem, themeMap: theme.listItems, themeCssFunction: ListItemThemedStyle },
    { component: PrettyText, themeMap: theme.prettyTexts, themeCssFunction: PrettyTextThemedStyle },
    { component: Switch, themeMap: theme.switches, themeCssFunction: SwitchThemedStyle },
    { component: WebView, themeMap: theme.webViews, themeCssFunction: WebViewThemedStyle },
    { component: LinePager, themeMap: theme.linePagers, themeCssFunction: LinePagerThemedStyle },
    { component: ProgressCounterItem, themeMap: theme.progressCounterItems, themeCssFunction: ProgressCounterItemThemedStyle },
    { component: TabBarItem, themeMap: theme.tabBarItems, themeCssFunction: TabBarItemThemedStyle },
    { component: TitledCollapsibleBox, themeMap: theme.titledCollapsibleBoxes, themeCssFunction: TitledCollapsibleBoxThemedStyle },
    { component: SelectableView, themeMap: theme.selectableViews, themeCssFunction: SelectableViewThemedStyle },
    ...(extraComponentDefinitions || []),
  ];
  const rootCssString = `
    ${colorsToCss(theme.colors)};
    ${themeToCss(theme.texts.default)};
    background-color: ${theme.colors.background};
  `;
  // @ts-ignore
  const cssString = componentDefinitions.reduce((accumulator: string, current: ComponentDefinition): string => {
    return `
      ${accumulator}
      ${buildComponentThemeCssString(current.component.displayName, current.themeMap, current.themeCssFunction)}
    `;
  }, rootCssString);
  return cssString;
};
