import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { ILinkBaseTheme } from './theme';

interface IStyledLinkBaseProps {
  theme: ILinkBaseTheme;
}

const StyledLinkBase = styled.button<IStyledLinkBaseProps>`
  color: currentColor;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: padding-box;
  transition: 0.3s;
  width: fit-content;
  &.fullWidth {
    width: 100%;
  }

  &.fullHeight {
    height: 100%;
  }

  ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.default.background)};
  ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.default.linkBase)};
  &:hover {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.hover?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.hover?.linkBase)};
  }
  &:active {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.press?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.press?.linkBase)};
  }
  &:focus {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.focus?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.normal.focus?.linkBase)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.default?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.default?.linkBase)};
    &:hover {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.hover?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.hover?.linkBase)};
    }
    &:active {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.press?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.press?.linkBase)};
    }
    &:focus {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.focus?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.theme.disabled.focus?.linkBase)};
    }
  }
`;

export interface ILinkBaseProps extends IComponentProps<ILinkBaseTheme>, ISingleAnyChildProps {
  isEnabled: boolean;
  isFullWidth: boolean;
  isFullHeight: boolean;
  label?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export const LinkBase = (props: ILinkBaseProps): React.ReactElement => {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  const theme = useBuiltTheme('linkBases', props.variant, props.theme);
  const isTargetWithinApp = props.target && (props.target.startsWith('#') || props.target.startsWith('/'));
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledLinkBase
      id={props.id}
      className={getClassName(LinkBase.displayName, props.className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', !props.isEnabled && 'disabled')}
      theme={theme}
      onClick={onClicked}
      aria-label={props.label}
      href={props.target}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      {props.children}
    </StyledLinkBase>
  );
};

LinkBase.displayName = 'LinkBase';
LinkBase.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isFullWidth: false,
  isFullHeight: false,
};
