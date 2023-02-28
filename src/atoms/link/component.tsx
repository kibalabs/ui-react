import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ILinkTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const LinkThemedStyle = (theme: RecursivePartial<ILinkTheme>): string => `
  & > .link-focus-fixer {
    ${themeToCss(theme?.normal?.default?.background)};
    ${themeToCss(theme?.normal?.default?.text)};
  }
  &:hover > .link-focus-fixer {
    ${themeToCss(theme?.normal?.hover?.background)};
    ${themeToCss(theme?.normal?.hover?.text)};
  }
  &.disabled {
    & > .link-focus-fixer {
      ${themeToCss(theme?.disabled?.default?.background)};
      ${themeToCss(theme?.disabled?.default?.text)};
    }
    &:hover > .link-focus-fixer {
      ${themeToCss(theme?.disabled?.hover?.background)};
      ${themeToCss(theme?.disabled?.hover?.text)};
    }
  }
  &:visited {
    & > .link-focus-fixer {
      ${themeToCss(theme?.visited?.default?.background)};
      ${themeToCss(theme?.visited?.default?.text)};
    }
    &:hover > .link-focus-fixer {
      ${themeToCss(theme?.visited?.hover?.background)};
      ${themeToCss(theme?.visited?.hover?.text)};
    }
  }
`;

interface IStyledLinkProps {
  $theme?: RecursivePartial<ILinkTheme>;
}

const StyledLinkFocusFixer = styled.span`
  transition-duration: 0.3s;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;

const StyledLink = styled.a<IStyledLinkProps>`
  transition-duration: 0.3s;
  &.disabled {
    cursor: not-allowed;
  }

  && {
    ${(props: IStyledLinkProps): string => (props.$theme ? LinkThemedStyle(props.$theme) : '')};
  }
`;

export interface ILinkProps extends IComponentProps<ILinkTheme> {
  isEnabled: boolean;
  target?: string;
  text: string;
  tabIndex?: number;
  shouldOpenSameTab?: boolean;
  onClicked?: () => void;
}

export const Link = (props: ILinkProps): React.ReactElement => {
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
  const targetShouldOpenSameTab = props.shouldOpenSameTab || props.target?.startsWith('#') || (props.shouldOpenSameTab == null && isTargetWithinApp);
  return (
  // @ts-ignore: as prop doesn't match type required
    <StyledLink
      id={props.id}
      className={getClassName(Link.displayName, props.className, !props.isEnabled && 'disabled', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
      href={props.isEnabled ? props.target : undefined}
      rel={'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={ props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      <StyledLinkFocusFixer className='link-focus-fixer' tabIndex={-1}>
        {props.text}
      </StyledLinkFocusFixer>
    </StyledLink>
  );
};

Link.displayName = 'Link';
Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
