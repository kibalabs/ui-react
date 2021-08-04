import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, KibaIcon, themeToCss, useBuiltTheme } from '../..';
import { HidingView } from '../../wrappers';
import { ITitledCollapsibleBoxTheme } from './theme';

interface IStyledTitledCollapsibleBoxProps {
  theme: ITitledCollapsibleBoxTheme;
}

const StyledCollapsibleBox = styled.div<IStyledTitledCollapsibleBoxProps>`
  width: 100%;
  overflow: hidden;
  ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.background)};

  &.collapsed {
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.background)};
  }
`;

const StyledHeader = styled.div<IStyledTitledCollapsibleBoxProps>`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.headerBackground)};
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.headerText)};

  &:hover {
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.hover?.headerBackground)};
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.hover?.headerText)};
  }

  &:active {
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.press?.headerBackground)};
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.press?.headerText)};
  }

  &.collapsed {
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.headerBackground)};
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.headerText)};

    &:hover {
      ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.hover?.headerBackground)};
      ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.hover?.headerText)};
    }

    &:active {
      ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.press?.headerBackground)};
      ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.press?.headerText)};
    }
  }
`;

const StyledContent = styled.div<IStyledTitledCollapsibleBoxProps>`
  width: 100%;
  ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.contentBackground)};

  &.collapsed {
    ${(props: IStyledTitledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.contentBackground)};
  }
`;

interface ITitledCollapsibleBoxProps extends IComponentProps<ITitledCollapsibleBoxTheme>, ISingleAnyChildProps {
  title: string;
  isCollapsed: boolean;
  onCollapseToggled(): void;
}

export const TitledCollapsibleBox = (props: ITitledCollapsibleBoxProps): React.ReactElement => {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };

  const theme = useBuiltTheme('titledCollapsibleBoxes', props.variant, props.theme);
  return (
    <StyledCollapsibleBox
      id={props.id}
      className={getClassName(TitledCollapsibleBox.displayName, props.className, props.isCollapsed && 'collapsed')}
      theme={theme}
      onClick={onCollapseToggled}
    >
      <StyledHeader theme={theme} className={getClassName(props.isCollapsed && 'collapsed')}>
        <span>{props.title}</span>
        <KibaIcon iconId={props.isCollapsed ? 'ion-chevron-down' : 'ion-chevron-up'} />
      </StyledHeader>
      <HidingView isHidden={props.isCollapsed}>
        <StyledContent theme={theme} className={getClassName(props.isCollapsed && 'collapsed')}>
          {props.children}
        </StyledContent>
      </HidingView>
    </StyledCollapsibleBox>
  );
};

TitledCollapsibleBox.displayName = 'TitledCollapsibleBox';
TitledCollapsibleBox.defaultProps = {
  ...defaultComponentProps,
};
