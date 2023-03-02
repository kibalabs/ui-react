import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IIconButtonTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { IIconProps } from '../../particles/icon';
import { themeToCss } from '../../util';

export const IconButtonThemedStyle = (theme: RecursivePartial<IIconButtonTheme>): string => `
  & > .iconbutton-focus-fixer {
    ${themeToCss(theme?.normal?.default?.text)};
    ${themeToCss(theme?.normal?.default?.background)};
  }
  &:hover > .iconbutton-focus-fixer  {
    ${themeToCss(theme?.normal?.hover?.text)};
    ${themeToCss(theme?.normal?.hover?.background)};
  }
  &:active > .iconbutton-focus-fixer  {
    ${themeToCss(theme?.normal?.press?.text)};
    ${themeToCss(theme?.normal?.press?.background)};
  }
  &:focus > .iconbutton-focus-fixer  {
    ${themeToCss(theme?.normal?.focus?.text)};
    ${themeToCss(theme?.normal?.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .iconbutton-focus-fixer {
      ${themeToCss(theme?.disabled?.default?.text)};
      ${themeToCss(theme?.disabled?.default?.background)};
    }
    &:hover > .iconbutton-focus-fixer  {
      ${themeToCss(theme?.disabled?.hover?.text)};
      ${themeToCss(theme?.disabled?.hover?.background)};
    }
    &:active > .iconbutton-focus-fixer  {
      ${themeToCss(theme?.disabled?.press?.text)};
      ${themeToCss(theme?.disabled?.press?.background)};
    }
    &:focus > .iconbutton-focus-fixer  {
      ${themeToCss(theme?.disabled?.focus?.text)};
      ${themeToCss(theme?.disabled?.focus?.background)};
    }
  }
`;

interface IStyledIconButtonProps {
  $theme?: RecursivePartial<IIconButtonTheme>;
}

const StyledIconButtonFocusFixer = styled.span`
  transition-duration: 0.3s;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;

const StyledIconButton = styled.button<IStyledIconButtonProps>`
  transition-duration: 0.3s;
  &.disabled {
    cursor: not-allowed;
  }

  && {
    ${(props: IStyledIconButtonProps): string => (props.$theme ? IconButtonThemedStyle(props.$theme) : '')};
  }
`;

export interface IIconButtonProps extends IComponentProps<IIconButtonTheme> {
  isEnabled: boolean;
  icon: React.ReactElement<IIconProps>;
  buttonType?: 'button' | 'reset' | 'submit';
  label?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export const IconButton = (props: IIconButtonProps): React.ReactElement => {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  const onClicked = (event: React.SyntheticEvent): void => {
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  if (props.onClicked && props.buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledIconButton
      id={props.id}
      className={getClassName(IconButton.displayName, !props.isEnabled && 'disabled', props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
      disabled={!props.isEnabled}
      aria-label={props.label}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
      type={props.buttonType || 'button'}
    >
      <StyledIconButtonFocusFixer className='iconbutton-focus-fixer' tabIndex={-1}>
        {props.icon}
      </StyledIconButtonFocusFixer>
    </StyledIconButton>
  );
};

IconButton.displayName = 'KibaIconButton';
IconButton.defaultProps = {
  ...defaultComponentProps,
  label: 'Icon Button',
  isEnabled: true,
};
