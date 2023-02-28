import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ITitledCollapsibleBoxTheme } from './theme';
import { defaultComponentProps, IComponentProps, KibaIcon, themeToCss } from '../..';
import { HidingView } from '../../wrappers';

export const TitledCollapsibleBoxThemedStyle = (theme: RecursivePartial<ITitledCollapsibleBoxTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};

  & > .TitledCollapsibleBoxContent {
    ${themeToCss(theme?.normal?.default?.contentBackground)};
  }
  &:hover > .TitledCollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.hover?.contentBackground)};
  }
  &:active > .TitledCollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.press?.contentBackground)};
  }

  & > .TitledCollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.default?.headerBackground)};
    ${themeToCss(theme?.normal?.default?.headerText)};
  }
  &:hover > .TitledCollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.hover?.headerBackground)};
    ${themeToCss(theme?.normal?.hover?.headerText)};
  }
  &:active > .TitledCollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.press?.headerBackground)};
    ${themeToCss(theme?.normal?.press?.headerText)};
  }

  &.collapsed {
    ${themeToCss(theme?.collapsed?.default?.background)};
    & > .TitledCollapsibleBoxContent {
      ${themeToCss(theme?.collapsed?.default?.contentBackground)};
    }
    &:hover > .TitledCollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.hover?.contentBackground)};
    }
    &:active > .TitledCollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.press?.contentBackground)};
    }
    & > .TitledCollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.default?.headerBackground)};
      ${themeToCss(theme?.collapsed?.default?.headerText)};
    }
    &:hover > .TitledCollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.hover?.headerBackground)};
      ${themeToCss(theme?.collapsed?.hover?.headerText)};
    }

    &:active > .TitledCollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.press?.headerBackground)};
      ${themeToCss(theme?.collapsed?.press?.headerText)};
    }
  }

`;

interface IStyledTitledCollapsibleBoxProps {
  $theme?: RecursivePartial<ITitledCollapsibleBoxTheme>;
}

const StyledTitledCollapsibleBox = styled.div<IStyledTitledCollapsibleBoxProps>`
  width: 100%;
  overflow: hidden;

  && {
    ${(props: IStyledTitledCollapsibleBoxProps): string => (props.$theme ? TitledCollapsibleBoxThemedStyle(props.$theme) : '')};
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
`;

const StyledContent = styled.div`
  width: 100%;
`;

interface ITitledCollapsibleBoxProps extends IComponentProps<ITitledCollapsibleBoxTheme>, ISingleAnyChildProps {
  title: string;
  isCollapsed: boolean;
  onCollapseToggled(): void;
  shouldSkipRenderingWhenCollapsed?: boolean;
}

export const TitledCollapsibleBox = (props: ITitledCollapsibleBoxProps): React.ReactElement => {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };

  return (
    <StyledTitledCollapsibleBox
      id={props.id}
      className={getClassName(TitledCollapsibleBox.displayName, props.className, props.isCollapsed && 'collapsed', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
    >
      <StyledHeader
        className='TitledCollapsibleBoxHeader'
        onClick={onCollapseToggled}
      >
        <span>{props.title}</span>
        <KibaIcon iconId={props.isCollapsed ? 'ion-chevron-down' : 'ion-chevron-up'} />
      </StyledHeader>
      {(!props.isCollapsed || !props.shouldSkipRenderingWhenCollapsed) && (
        <HidingView isHidden={props.isCollapsed}>
          <StyledContent className={'TitledCollapsibleBoxContent'}>
            {props.children}
          </StyledContent>
        </HidingView>
      )}
    </StyledTitledCollapsibleBox>
  );
};

TitledCollapsibleBox.displayName = 'TitledCollapsibleBox';
TitledCollapsibleBox.defaultProps = {
  ...defaultComponentProps,
};
