import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { ILinkTheme } from './theme';

interface IStyledLinkProps {
  theme: ILinkTheme;
}

const StyledLink = styled.a<IStyledLinkProps>`
  ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.default?.background)};
  ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.default?.text)};
  &:hover {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.hover?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.normal?.hover?.text)};
  }
  &.disabled {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.default?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.default?.text)};
    cursor: not-allowed;
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.disabled?.hover?.text)};
    }
  }
  &:visited {
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.default?.background)};
    ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.default?.text)};
    &:hover {
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.hover?.background)};
      ${(props: IStyledLinkProps): string => themeToCss(props.theme.visited?.hover?.text)};
    }
  }
`;

export interface ILinkProps extends IComponentProps<ILinkTheme> {
  isEnabled: boolean;
  target: string;
  text: string;
  tabIndex?: number;
  shouldOpenSameTab?: boolean;
}

export const Link = (props: ILinkProps): React.ReactElement => {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();
  const theme = useBuiltTheme('links', props.variant, props.theme);
  const shouldOpenSameTab = props.shouldOpenSameTab || (props.shouldOpenSameTab === undefined && props.target && (props.target.startsWith('#') || props.target.startsWith('/')));
  return (
  // @ts-ignore: as prop doesn't match type required
    <StyledLink
      id={props.id}
      className={getClassName(Link.displayName, props.className, !props.isEnabled && 'disabled')}
      theme={theme}
      href={props.isEnabled ? props.target : undefined}
      tabIndex={props.tabIndex || 0}
      target={shouldOpenSameTab ? '_self' : '_blank'}
      as={isUsingCoreRouting ? CoreLink : undefined}
      rel={'noopener'}
    >
      {props.text}
    </StyledLink>
  );
};

Link.displayName = 'Link';
Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
