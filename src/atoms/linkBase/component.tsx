import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { ILinkBaseTheme } from './theme';

interface IStyledLinkBaseProps {
  $theme: ILinkBaseTheme;
}

const StyledLinkBaseInner = styled.span`
  transition-duration: 0.3s;
  cursor: pointer;
  color: currentColor;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: padding-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;

// TODO(krishan711): this hurts to be a button or a as both have unintended consequences:
// button -> you cant have another button inside
// a -> inners get styled accordingly as if they are links themselves
const StyledLinkBase = styled.button<IStyledLinkBaseProps>`
  cursor: pointer;
  width: fit-content;
  transition-duration: 0.3s;

  &.fullWidth {
    width: 100%;
  }

  &.fullHeight {
    height: 100%;
  }

  & > .focus-fixer {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.default.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.default.linkBase)};
  }
  &:hover > .focus-fixer {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.hover?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.hover?.linkBase)};
  }
  &:active > .focus-fixer {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.press?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.press?.linkBase)};
  }
  &:focus > .focus-fixer {
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.focus?.background)};
    ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.normal.focus?.linkBase)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .focus-fixer {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.default?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.default?.linkBase)};
    }
    &:hover > .focus-fixer {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.hover?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.hover?.linkBase)};
    }
    &:active > .focus-fixer {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.press?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.press?.linkBase)};
    }
    &:focus > .focus-fixer {
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.focus?.background)};
      ${(props: IStyledLinkBaseProps): string => themeToCss(props.$theme.disabled.focus?.linkBase)};
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

  const onClicked = (event: React.SyntheticEvent): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  const theme = useBuiltTheme('linkBases', props.variant, props.theme);
  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledLinkBase
      id={props.id}
      className={getClassName(LinkBase.displayName, props.className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', !props.isEnabled && 'disabled')}
      $theme={theme}
      onClick={onClicked}
      aria-label={props.label}
      href={props.target}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      <StyledLinkBaseInner className='focus-fixer' tabIndex={-1}>
        {props.children}
      </StyledLinkBaseInner>
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
