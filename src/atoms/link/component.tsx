import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ILinkTheme } from './theme';
import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';

interface IStyledLinkProps {
  $theme: ILinkTheme;
}

const StyledLinkInner = styled.span`
  transition-duration: 0.3s;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;

const StyledLink = styled.a<IStyledLinkProps>`
  transition-duration: 0.3s;

  & > .focus-fixer {
    ${(props: IStyledLinkProps): string => themeToCss(props.$theme.normal?.default?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.$theme.normal?.default?.text)};
  }
  &:hover > .focus-fixer {
    ${(props: IStyledLinkProps): string => themeToCss(props.$theme.normal?.hover?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.$theme.normal?.hover?.text)};
  }
  &.disabled {
    & > .focus-fixer {
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.disabled?.default?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.disabled?.default?.text)};
    }
    cursor: not-allowed;
    &:hover > .focus-fixer {
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.disabled?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.disabled?.hover?.text)};
    }
  }
  &:visited {
    & > .focus-fixer {
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.visited?.default?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.visited?.default?.text)};
    }
    &:hover > .focus-fixer {
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.visited?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.$theme.visited?.hover?.text)};
    }
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

  const theme = useBuiltTheme('links', props.variant, props.theme);
  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.shouldOpenSameTab || props.target?.startsWith('#') || (props.shouldOpenSameTab == null && isTargetWithinApp);
  return (
  // @ts-ignore: as prop doesn't match type required
    <StyledLink
      id={props.id}
      className={getClassName(Link.displayName, props.className, !props.isEnabled && 'disabled')}
      $theme={theme}
      onClick={onClicked}
      href={props.isEnabled ? props.target : undefined}
      rel={'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={ props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      <StyledLinkInner className='focus-fixer' tabIndex={-1}>
        {props.text}
      </StyledLinkInner>
    </StyledLink>
  );
};

Link.displayName = 'Link';
Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
