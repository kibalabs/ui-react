import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { IButtonTheme } from './theme';
import { Alignment, getContentAlignmentCss, getItemAlignmentCss, IComponentProps } from '../../model';
import { IIconProps, LoadingSpinner, PaddingSize, Spacing } from '../../particles';
import { themeToCss } from '../../util';

export const ButtonThemedStyle = (theme: RecursivePartial<IButtonTheme>): string => `
  & > .KibaButtonFocusFixer {
    ${themeToCss(theme.normal?.default?.text)};
    ${themeToCss(theme.normal?.default?.background)};
  }
  /* Since it can be rendered as an <a>, unset everything for visited */
  &:visited > .KibaButtonFocusFixer {
    ${themeToCss(theme.normal?.default?.text)};
    ${themeToCss(theme.normal?.default?.background)};
  }
  &:hover > .KibaButtonFocusFixer {
    ${themeToCss(theme.normal?.hover?.text)};
    ${themeToCss(theme.normal?.hover?.background)};
  }
  &:active > .KibaButtonFocusFixer {
    ${themeToCss(theme.normal?.press?.text)};
    ${themeToCss(theme.normal?.press?.background)};
  }
  &:focus > .KibaButtonFocusFixer {
    ${themeToCss(theme.normal?.focus?.text)};
    ${themeToCss(theme.normal?.focus?.background)};
  }
  &.disabled {
    & > .KibaButtonFocusFixer {
      ${themeToCss(theme.disabled?.default?.text)};
      ${themeToCss(theme.disabled?.default?.background)};
    }
    &:hover > .KibaButtonFocusFixer {
      ${themeToCss(theme.disabled?.hover?.text)};
      ${themeToCss(theme.disabled?.hover?.background)};
    }
    &:active > .KibaButtonFocusFixer {
      ${themeToCss(theme.disabled?.press?.text)};
      ${themeToCss(theme.disabled?.press?.background)};
    }
    &:focus > .KibaButtonFocusFixer {
      ${themeToCss(theme.disabled?.focus?.text)};
      ${themeToCss(theme.disabled?.focus?.background)};
    }
  }
`;

// NOTE(krishan711): focus problem fixed with https://www.kizu.ru/keyboard-only-focus/#proper-solution

interface IStyledButtonTextProps {
  $isTextFullWidth: boolean;
}

const StyledButtonText = styled.span<IStyledButtonTextProps>`
  width: ${(props: IStyledButtonTextProps): string => (props.$isTextFullWidth ? '100%' : 'auto')};
`;

interface IStyledButtonProps {
  $theme?: RecursivePartial<IButtonTheme>;
  $isLoading: boolean;
}

interface IStyledButtonFocusFixerProps {
  $childAlignment: Alignment;
  $contentAlignment: Alignment;
}

const StyledButtonFocusFixer = styled.span<IStyledButtonFocusFixerProps>`
  transition-duration: 0.3s;
  outline: none;
  display: flex;
  flex-direction: row;
  ${(props: IStyledButtonFocusFixerProps): string => getItemAlignmentCss(props.$contentAlignment)};
  ${(props: IStyledButtonFocusFixerProps): string => getContentAlignmentCss(props.$contentAlignment)};
  background-clip: border-box;
  width: 100%;
  height: 100%;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;


const StyledButton = styled.button<IStyledButtonProps>`
  transition-duration: 0.3s;
  cursor: ${(props: IStyledButtonProps): string => (props.$isLoading ? 'default' : 'pointer')};
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
    ${(props: IStyledButtonProps): string => (props.$theme ? ButtonThemedStyle(props.$theme) : '')};
  }
`;

export interface IButtonProps extends IComponentProps<IButtonTheme> {
  text: string;
  isEnabled?: boolean;
  isLoading?: boolean;
  isFullHeight?: boolean;
  isFullWidth?: boolean;
  buttonType?: 'button' | 'reset' | 'submit';
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  isTextFullWidth?: boolean;
  onClicked?(): void;
}

export function Button({
  className = '',
  variant = 'default',
  isEnabled = true,
  isTextFullWidth = true,
  iconGutter = PaddingSize.Default,
  contentAlignment = Alignment.Fill,
  childAlignment = Alignment.Center,
  buttonType = 'button',
  isFullHeight = false,
  isFullWidth = false,
  ...props
}: IButtonProps): React.ReactElement {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  if (props.onClicked && buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use props.onClicked. use the form.onSubmitted instead');
  }

  const onButtonClicked = (event: React.SyntheticEvent): void => {
    if (props.isLoading) {
      return;
    }
    if (props.onClicked) {
      props.onClicked();
    }
    if (props.onClicked || props.target) {
      event.stopPropagation();
    }
  };

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const innerTargetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, className, isFullWidth && 'fullWidth', isFullHeight && 'fullHeight', !isEnabled && 'disabled', ...(variant?.split('-') || []))}
      $theme={props.theme}
      $isLoading={props.isLoading || false}
      onClick={onButtonClicked}
      disabled={!isEnabled}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (innerTargetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && innerTargetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
      type={buttonType || 'button'}
    >
      <StyledButtonFocusFixer className='KibaButtonFocusFixer' tabIndex={-1} $childAlignment={childAlignment || Alignment.Center} $contentAlignment={contentAlignment || Alignment.Center}>
        { !props.isLoading && props.iconLeft && (
          <React.Fragment>
            {props.iconLeft}
            <Spacing variant={iconGutter} />
          </React.Fragment>
        )}
        { !props.isLoading && (
          <StyledButtonText $isTextFullWidth={isTextFullWidth}>{props.text}</StyledButtonText>
        )}
        { !props.isLoading && props.iconRight && (
          <React.Fragment>
            <Spacing variant={iconGutter} />
            {props.iconRight}
          </React.Fragment>
        )}
        { props.isLoading && (
          <LoadingSpinner
            id={props.id && `${props.id}-loading-spinner`}
            variant='light-small'
          />
        )}
      </StyledButtonFocusFixer>
    </StyledButton>
  );
}
Button.displayName = 'KibaButton';
