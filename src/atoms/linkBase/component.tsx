import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, ISingleAnyChildProps, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ILinkBaseTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const LinkBaseThemedStyle = (theme: RecursivePartial<ILinkBaseTheme>): string => `
  & > .linkbase-focus-fixer {
    ${themeToCss(theme?.normal?.default?.background)};
    ${themeToCss(theme?.normal?.default?.linkBase)};
  }
  &:hover > .linkbase-focus-fixer {
    ${themeToCss(theme?.normal?.hover?.background)};
    ${themeToCss(theme?.normal?.hover?.linkBase)};
  }
  &:active > .linkbase-focus-fixer {
    ${themeToCss(theme?.normal?.press?.background)};
    ${themeToCss(theme?.normal?.press?.linkBase)};
  }
  &:focus > .linkbase-focus-fixer {
    ${themeToCss(theme?.normal?.focus?.background)};
    ${themeToCss(theme?.normal?.focus?.linkBase)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .linkbase-focus-fixer {
      ${themeToCss(theme?.disabled?.default?.background)};
      ${themeToCss(theme?.disabled?.default?.linkBase)};
    }
    &:hover > .linkbase-focus-fixer {
      ${themeToCss(theme?.disabled?.hover?.background)};
      ${themeToCss(theme?.disabled?.hover?.linkBase)};
    }
    &:active > .linkbase-focus-fixer {
      ${themeToCss(theme?.disabled?.press?.background)};
      ${themeToCss(theme?.disabled?.press?.linkBase)};
    }
    &:focus > .linkbase-focus-fixer {
      ${themeToCss(theme?.disabled?.focus?.background)};
      ${themeToCss(theme?.disabled?.focus?.linkBase)};
    }
  }
`;

interface IStyledLinkBaseProps {
  $theme?: RecursivePartial<ILinkBaseTheme>;
}

const StyledLinkBaseFocusFixer = styled.span`
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

  &.disabled {
    cursor: not-allowed;
  }

  &&&& {
    ${(props: IStyledLinkBaseProps): string => (props.$theme ? LinkBaseThemedStyle(props.$theme) : '')};
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

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledLinkBase
      id={props.id}
      className={getClassName(LinkBase.displayName, props.className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', !props.isEnabled && 'disabled', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
      aria-label={props.label}
      href={props.target}
      rel={props.target ? 'noopener' : undefined}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      <StyledLinkBaseFocusFixer className='linkbase-focus-fixer' tabIndex={-1}>
        {props.children}
      </StyledLinkBaseFocusFixer>
    </StyledLinkBase>
  );
};

LinkBase.displayName = 'KibaLinkBase';
LinkBase.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isFullWidth: false,
  isFullHeight: false,
};
