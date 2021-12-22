import React, { FC } from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, LoadingSpinner, themeToCss, useBuiltTheme } from '../..';
import { IIconProps, PaddingSize, Spacing } from '../../particles';
import setDefaults from '../../util/SetDefaultProps';
import { IButtonTheme } from './theme';

interface IStyledButtonProps {
  $theme: IButtonTheme;
  $isLoading: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.text)};
  ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.background)};
  /* Since it can be rendered as an <a>, unset everything for visited */
  &:visited {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.background)};
  }
  cursor: ${(props: IStyledButtonProps): string => (props.$isLoading ? 'default' : 'pointer')};
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: border-box;
  transition-duration: 0.3s;
  &.fullWidth {
    width: 100%;
  }

  &:hover {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.hover?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.press?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.focus?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.default?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.default?.background)};
    &:hover {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.hover?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.hover?.background)};
    }
    &:active {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.press?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.press?.background)};
    }
    &:focus {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.focus?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.focus?.background)};
    }
  }
`;

export interface IButtonProps extends IComponentProps<IButtonTheme> {
  buttonType: 'button' | 'reset' | 'submit';
  text: string;
  isEnabled: boolean;
  isLoading: boolean;
  isFullWidth: boolean;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export const Button : FC <IButtonProps> = (props: IButtonProps): React.ReactElement => {
  const buttonDefaultProp = setDefaults(props, { ...defaultComponentProps,
    buttonType: 'button',
    isLoading: false,
    isEnabled: true,
    isFullWidth: false,
    iconGutter: PaddingSize.Default });
  const isUsingCoreRouting = useIsCoreRoutingEnabled();
  const onClicked = (): void => {
    if (buttonDefaultProp.isLoading) {
      return;
    }
    if (props.onClicked) {
      props.onClicked();
    }
  };

  if (props.onClicked && buttonDefaultProp.buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const theme = useBuiltTheme('buttons', props.variant, props.theme);
  const isTargetWithinApp = props.target && (props.target.startsWith('#') || props.target.startsWith('/'));
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, props.className, buttonDefaultProp.isFullWidth && 'fullWidth', !buttonDefaultProp.isEnabled && 'disabled')}
      $theme={theme}
      $isLoading={buttonDefaultProp.isLoading}
      onClick={onClicked}
      disabled={!buttonDefaultProp.isEnabled}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
    >
      { !buttonDefaultProp.isLoading && props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing variant={buttonDefaultProp.iconGutter} />
        </React.Fragment>
      )}
      { !buttonDefaultProp.isLoading && props.text }
      { !buttonDefaultProp.isLoading && props.iconRight && (
        <React.Fragment>
          <Spacing variant={buttonDefaultProp.iconGutter} />
          {props.iconRight}
        </React.Fragment>
      )}
      { buttonDefaultProp.isLoading && (
        <LoadingSpinner
          id={props.id && `${props.id}-loading-spinner`}
          variant='light-small'
        />
      )}
    </StyledButton>
  );
};

Button.displayName = 'Button';
// Button.defaultProps = {
//   ...defaultComponentProps,
//   buttonType: 'button',
//   isLoading: false,
//   isEnabled: true,
//   isFullWidth: false,
//   iconGutter: PaddingSize.Default,
// };
