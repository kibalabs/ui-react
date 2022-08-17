import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IIconProps } from '../../particles/icon';
import { IIconButtonTheme } from './theme';

interface IStyledIconButtonProps {
  $theme: IIconButtonTheme;
}

const StyledIconButtonInner = styled.span`
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

  & > .focus-fixer {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.default.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.default.background)};
  }
  &:hover > .focus-fixer  {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.hover?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.hover?.background)};
  }
  &:active > .focus-fixer  {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.press?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.press?.background)};
  }
  &:focus > .focus-fixer  {
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.focus?.text)};
    ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .focus-fixer {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.default?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.default?.background)};
    }
    &:hover > .focus-fixer  {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.hover?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.hover?.background)};
    }
    &:active > .focus-fixer  {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.press?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.press?.background)};
    }
    &:focus > .focus-fixer  {
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.focus?.text)};
      ${(props: IStyledIconButtonProps): string => themeToCss(props.$theme.disabled.focus?.background)};
    }
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
      event.stopPropagation();
      props.onClicked();
    }
  };

  if (props.onClicked && props.buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const theme = useBuiltTheme('iconButtons', props.variant, props.theme);
  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledIconButton
      id={props.id}
      className={getClassName(IconButton.displayName, !props.isEnabled && 'disabled', props.className)}
      $theme={theme}
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
      <StyledIconButtonInner className='focus-fixer' tabIndex='-1'>
        {props.icon}
      </StyledIconButtonInner>
    </StyledIconButton>
  );
};

IconButton.displayName = 'IconButton';
IconButton.defaultProps = {
  ...defaultComponentProps,
  label: 'Icon Button',
  isEnabled: true,
};
