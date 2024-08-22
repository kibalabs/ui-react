import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ICollapsibleBoxTheme } from './theme';
import { IComponentProps } from '../../model';
import { KibaIcon } from '../../particles';
import { themeToCss } from '../../util';
import { HidingView } from '../../wrappers';

export const CollapsibleBoxThemedStyle = (theme: RecursivePartial<ICollapsibleBoxTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};

  & > .CollapsibleBoxContent {
    ${themeToCss(theme?.normal?.default?.contentBackground)};
  }
  &:hover > .CollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.hover?.contentBackground)};
  }
  &:active > .CollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.press?.contentBackground)};
  }

  & > .CollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.default?.headerBackground)};
  }
  &:hover > .CollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.hover?.headerBackground)};
  }
  &:active > .CollapsibleBoxHeader {
    ${themeToCss(theme?.normal?.press?.headerBackground)};
  }

  &.collapsed {
    ${themeToCss(theme?.collapsed?.default?.background)};
    & > .CollapsibleBoxContent {
      ${themeToCss(theme?.collapsed?.default?.contentBackground)};
    }
    &:hover > .CollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.hover?.contentBackground)};
    }
    &:active > .CollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.press?.contentBackground)};
    }
    & > .CollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.default?.headerBackground)};
    }
    &:hover > .CollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.hover?.headerBackground)};
    }

    &:active > .CollapsibleBoxHeader {
      ${themeToCss(theme?.collapsed?.press?.headerBackground)};
    }
  }

`;

interface IStyledCollapsibleBoxProps {
  $theme?: RecursivePartial<ICollapsibleBoxTheme>;
}

const StyledCollapsibleBox = styled.div<IStyledCollapsibleBoxProps>`
  width: 100%;
  overflow: hidden;

  &&&& {
    ${(props: IStyledCollapsibleBoxProps): string => (props.$theme ? CollapsibleBoxThemedStyle(props.$theme) : '')};
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

interface ICollapsibleBoxProps extends IComponentProps<ICollapsibleBoxTheme>, ISingleAnyChildProps {
  headerView: React.ReactNode;
  isCollapsed: boolean;
  onCollapseToggled(): void;
  shouldSkipRenderingWhenCollapsed?: boolean;
  shouldHideIndicator?: boolean;
}

export function CollapsibleBox({
  className = '',
  variant = 'default',
  ...props
}: ICollapsibleBoxProps): React.ReactElement {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };

  return (
    <StyledCollapsibleBox
      id={props.id}
      className={getClassName(CollapsibleBox.displayName, className, props.isCollapsed && 'collapsed', ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      <StyledHeader
        className='CollapsibleBoxHeader'
        onClick={onCollapseToggled}
      >
        {props.headerView}
        {!props.shouldHideIndicator && (
          <KibaIcon iconId={props.isCollapsed ? 'ion-chevron-down' : 'ion-chevron-up'} />
        )}
      </StyledHeader>
      {(!props.isCollapsed || !props.shouldSkipRenderingWhenCollapsed) && (
        <HidingView isHidden={props.isCollapsed}>
          <StyledContent className='CollapsibleBoxContent'>
            {props.children}
          </StyledContent>
        </HidingView>
      )}
    </StyledCollapsibleBox>
  );
}
CollapsibleBox.displayName = 'KibaCollapsibleBox';
