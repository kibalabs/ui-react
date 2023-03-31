import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ILinkTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { themeToCss } from '../../util';

export const LinkThemedStyle = (theme: RecursivePartial<ILinkTheme>): string => `
  line-height: 0;
  & > .KibaLinkFocusFixer {
    ${themeToCss(theme?.normal?.default?.background)};
    ${themeToCss(theme?.normal?.default?.text)};
  }
  &:hover > .KibaLinkFocusFixer {
    ${themeToCss(theme?.normal?.hover?.background)};
    ${themeToCss(theme?.normal?.hover?.text)};
  }
  &.disabled {
    & > .KibaLinkFocusFixer {
      ${themeToCss(theme?.disabled?.default?.background)};
      ${themeToCss(theme?.disabled?.default?.text)};
    }
    &:hover > .KibaLinkFocusFixer {
      ${themeToCss(theme?.disabled?.hover?.background)};
      ${themeToCss(theme?.disabled?.hover?.text)};
    }
  }
  &:visited {
    & > .KibaLinkFocusFixer {
      ${themeToCss(theme?.visited?.default?.background)};
      ${themeToCss(theme?.visited?.default?.text)};
    }
    &:hover > .KibaLinkFocusFixer {
      ${themeToCss(theme?.visited?.hover?.background)};
      ${themeToCss(theme?.visited?.hover?.text)};
    }
  }
`;

interface IStyledLinkProps {
  $theme?: RecursivePartial<ILinkTheme>;
}

const StyledLink = styled.a<IStyledLinkProps>`
  transition-duration: 0.3s;
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
  }
  & > .KibaLinkFocusFixer {
    transition-duration: 0.3s;
    cursor: pointer;
    /* Fixing the Safari bug for <button>s overflow */
    position: relative;
  }
  &.disabled {
    & > .KibaLinkFocusFixer {
      cursor: not-allowed;
    }
  }

  &&&& {
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
      <span className='KibaLinkFocusFixer' tabIndex={-1}>
        {props.text}
      </span>
    </StyledLink>
  );
};

Link.displayName = 'KibaLink';
Link.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
