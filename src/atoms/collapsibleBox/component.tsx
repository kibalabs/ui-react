import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, KibaIcon, themeToCss, useBuiltTheme } from '../..';
import { HidingView } from '../../wrappers';
import { ICollapsibleBoxTheme } from './theme';

interface IStyledCollapsibleBoxProps {
  theme: ICollapsibleBoxTheme;
}

const StyledCollapsibleBox = styled.div<IStyledCollapsibleBoxProps>`
  width: 100%;
  ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.background)};
  ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.text)};

  &.collapsed {
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.background)};
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.text)};
  }
`;

const StyledHeader = styled.div<IStyledCollapsibleBoxProps>`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.headerBackground)};

  &:hover {
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.hover?.headerBackground)};
  }

  &:active {
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.press?.headerBackground)};
  }

  &.collapsed {
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.headerBackground)};

    &:hover {
      ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.hover?.headerBackground)};
    }

    &:active {
      ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.press?.headerBackground)};
    }
  }
`;

const StyledContent = styled.div<IStyledCollapsibleBoxProps>`
  width: 100%;
  ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.normal.default.contentBackground)};

  &.collapsed {
    ${(props: IStyledCollapsibleBoxProps): string => themeToCss(props.theme.collapsed?.default?.contentBackground)};
  }
`;

interface ICollapsibleBoxProps extends IComponentProps<ICollapsibleBoxTheme>, ISingleAnyChildProps {
  title: string;
  isCollapsed: boolean;
  onCollapseToggled(): void;
}

export const CollapsibleBox = (props: ICollapsibleBoxProps): React.ReactElement => {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };

  const theme = useBuiltTheme('collapsibleBoxes', props.variant, props.theme);
  return (
    <StyledCollapsibleBox
      id={props.id}
      className={getClassName(CollapsibleBox.displayName, props.className, props.isCollapsed && 'collapsed')}
      theme={theme}
      onClick={onCollapseToggled}
    >
      <StyledHeader theme={theme} className={getClassName(props.isCollapsed && 'collapsed')}>
        <b>{props.title}</b>
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

CollapsibleBox.displayName = 'CollapsibleBox';
CollapsibleBox.defaultProps = {
  ...defaultComponentProps,
};
