import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { IIconButtonTheme } from './theme';
import { IComponentProps } from '../../model';
import { IIconProps } from '../../particles/icon';
import { themeToCss } from '../../util';

export const IconButtonThemedStyle = (theme: RecursivePartial<IIconButtonTheme>): string => `
  & > .KibaIconButtonFocusFixer {
    ${themeToCss(theme?.normal?.default?.text)};
    ${themeToCss(theme?.normal?.default?.background)};
  }
  &:hover > .KibaIconButtonFocusFixer {
    ${themeToCss(theme?.normal?.hover?.text)};
    ${themeToCss(theme?.normal?.hover?.background)};
  }
  &:active > .KibaIconButtonFocusFixer {
    ${themeToCss(theme?.normal?.press?.text)};
    ${themeToCss(theme?.normal?.press?.background)};
  }
  &:focus > .KibaIconButtonFocusFixer {
    ${themeToCss(theme?.normal?.focus?.text)};
    ${themeToCss(theme?.normal?.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .KibaIconButtonFocusFixer {
      ${themeToCss(theme?.disabled?.default?.text)};
      ${themeToCss(theme?.disabled?.default?.background)};
    }
    &:hover > .KibaIconButtonFocusFixer {
      ${themeToCss(theme?.disabled?.hover?.text)};
      ${themeToCss(theme?.disabled?.hover?.background)};
    }
    &:active > .KibaIconButtonFocusFixer {
      ${themeToCss(theme?.disabled?.press?.text)};
      ${themeToCss(theme?.disabled?.press?.background)};
    }
    &:focus > .KibaIconButtonFocusFixer {
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
    ${(props: IStyledIconButtonProps): string => (props.$theme ? IconButtonThemedStyle(props.$theme) : '')};
  }
`;

export interface IIconButtonProps extends IComponentProps<IIconButtonTheme> {
  isEnabled?: boolean;
  icon: React.ReactElement<IIconProps>;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  buttonType?: 'button' | 'reset' | 'submit';
  label?: string;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  onClicked?(): void;
}

export function IconButton({
  className = '',
  variant = 'default',
  label = 'Icon Button',
  isEnabled = true,
  ...props
}: IIconButtonProps): React.ReactElement {
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
      className={getClassName(IconButton.displayName, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', !isEnabled && 'disabled', className, ...(variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
      disabled={!isEnabled}
      aria-label={label}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
      type={props.buttonType || 'button'}
    >
      <StyledIconButtonFocusFixer className='KibaIconButtonFocusFixer' tabIndex={-1}>
        {props.icon}
      </StyledIconButtonFocusFixer>
    </StyledIconButton>
  );
}
IconButton.displayName = 'KibaIconButton';
