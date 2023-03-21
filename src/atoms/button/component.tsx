import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IButtonTheme } from './theme';
import { Alignment, defaultComponentProps, getFlexContentAlignment, IComponentProps } from '../../model';
import { IIconProps, LoadingSpinner, PaddingSize, Spacing } from '../../particles';
import { CssConverter, themeToCss } from '../../util';

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

const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
};

interface IStyledButtonFocusFixerProps {
  $contentAlignment: Alignment;
}

const StyledButtonFocusFixer = styled.span<IStyledButtonFocusFixerProps>`
  transition-duration: 0.3s;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props: IStyledButtonFocusFixerProps): string => getContentAlignmentCss(props.$contentAlignment)};
  background-clip: border-box;
  width: 100%;
  height: 100%;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;


const StyledButton = styled.button<IStyledButtonProps>`
  transition-duration: 0.3s;
  &.fullWidth {
    width: 100%;
  }
  &.disabled {
    cursor: not-allowed;
  }
  cursor: ${(props: IStyledButtonProps): string => (props.$isLoading ? 'default' : 'pointer')};

  &&&& {
    ${(props: IStyledButtonProps): string => (props.$theme ? ButtonThemedStyle(props.$theme) : '')};
  }
`;

export interface IButtonProps extends IComponentProps<IButtonTheme> {
  text: string;
  isEnabled: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  buttonType?: 'button' | 'reset' | 'submit';
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
  target?: string;
  targetShouldOpenSameTab?: boolean;
  tabIndex?: number;
  contentAlignment: Alignment;
  isTextFullWidth: boolean;
  onClicked?(): void;
}

export const Button = (props: IButtonProps): React.ReactElement => {
  const isUsingCoreRouting = useIsCoreRoutingEnabled();

  const onClicked = (event: React.SyntheticEvent): void => {
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

  if (props.onClicked && props.buttonType === 'submit') {
    throw new Error('if the buttonType is set to submit, you should not use onClicked. use the form.onSubmitted instead');
  }

  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, props.className, props.isFullWidth && 'fullWidth', !props.isEnabled && 'disabled', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      $isLoading={props.isLoading || false}
      onClick={onClicked}
      disabled={!props.isEnabled}
      href={props.target}
      rel={props.target && 'noopener'}
      tabIndex={props.tabIndex || 0}
      target={props.target ? (targetShouldOpenSameTab ? '_self' : '_blank') : undefined}
      as={props.target ? (isUsingCoreRouting && targetShouldOpenSameTab && isTargetWithinApp ? CoreLink : 'a') : undefined}
      type={props.buttonType || 'button'}
    >
      <StyledButtonFocusFixer className='KibaButtonFocusFixer' tabIndex={-1} $contentAlignment={props.contentAlignment}>
        { !props.isLoading && props.iconLeft && (
          <React.Fragment>
            {props.iconLeft}
            <Spacing variant={props.iconGutter} />
          </React.Fragment>
        )}
        { !props.isLoading && (
          <StyledButtonText $isTextFullWidth={props.isTextFullWidth}>{props.text }</StyledButtonText>
        )}
        { !props.isLoading && props.iconRight && (
          <React.Fragment>
            <Spacing variant={props.iconGutter} />
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
};

Button.displayName = 'KibaButton';
Button.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isTextFullWidth: true,
  iconGutter: PaddingSize.Default,
  contentAlignment: Alignment.Fill,
};
