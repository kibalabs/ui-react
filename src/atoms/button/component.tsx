import React from 'react';

import { getClassName } from '@kibalabs/core';
import { Link as CoreLink, OptionalProppedElement, useIsCoreRoutingEnabled } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, LoadingSpinner, themeToCss, useBuiltTheme } from '../..';
import { Alignment, getFlexContentAlignment } from '../../model';
import { IIconProps, PaddingSize, Spacing } from '../../particles';
import { CssConverter } from '../../util';
import { IButtonTheme } from './theme';


// NOTE(krishan711): focus problem fixed with https://www.kizu.ru/keyboard-only-focus/#proper-solution

interface IStyledButtonTextProps {
  $isTextFullWidth: boolean;
}

const StyledButtonText = styled.span<IStyledButtonTextProps>`
  width: ${(props: IStyledButtonTextProps): string => (props.$isTextFullWidth ? '100%' : 'auto')};
`;

interface IStyledButtonProps {
  $theme: IButtonTheme;
  $isLoading: boolean;
}

const getContentAlignmentCss: CssConverter<Alignment> = (field: Alignment): string => {
  return `justify-content: ${getFlexContentAlignment(field)};`;
};

interface IStyledButtonInnerProps {
  $contentAlignment: Alignment;
}

const StyledButtonInner = styled.span<IStyledButtonInnerProps>`
  transition-duration: 0.3s;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props: IStyledButtonInnerProps): string => getContentAlignmentCss(props.$contentAlignment)};
  background-clip: border-box;
  width: 100%;
  height: 100%;
  /* Fixing the Safari bug for <button>s overflow */
  position: relative;
`;


const StyledButton = styled.button<IStyledButtonProps>`
  cursor: ${(props: IStyledButtonProps): string => (props.$isLoading ? 'default' : 'pointer')};
  transition-duration: 0.3s;

  &.fullWidth {
    width: 100%;
  }

  & > .focus-fixer {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.background)};
  }
  /* Since it can be rendered as an <a>, unset everything for visited */
  &:visited > .focus-fixer {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.default.background)};
  }
  &:hover > .focus-fixer {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.hover?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.hover?.background)};
  }
  &:active > .focus-fixer {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.press?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.press?.background)};
  }
  &:focus > .focus-fixer {
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.focus?.text)};
    ${(props: IStyledButtonProps): string => themeToCss(props.$theme.normal.focus?.background)};
  }
  &.disabled {
    cursor: not-allowed;
    & > .focus-fixer {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.default?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.default?.background)};
    }
    &:hover > .focus-fixer {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.hover?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.hover?.background)};
    }
    &:active > .focus-fixer {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.press?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.press?.background)};
    }
    &:focus > .focus-fixer {
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.focus?.text)};
      ${(props: IStyledButtonProps): string => themeToCss(props.$theme.disabled.focus?.background)};
    }
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

  const theme = useBuiltTheme('buttons', props.variant, props.theme);
  const isTargetWithinApp = props.target && props.target.startsWith('/');
  const targetShouldOpenSameTab = props.targetShouldOpenSameTab || props.target?.startsWith('#') || (props.targetShouldOpenSameTab == null && isTargetWithinApp);
  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledButton
      id={props.id}
      className={getClassName(Button.displayName, props.className, props.isFullWidth && 'fullWidth', !props.isEnabled && 'disabled')}
      $theme={theme}
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
      <StyledButtonInner className='focus-fixer' tabIndex={-1} $contentAlignment={props.contentAlignment}>
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
      </StyledButtonInner>
    </StyledButton>
  );
};

Button.displayName = 'Button';
Button.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
  isTextFullWidth: true,
  iconGutter: PaddingSize.Default,
  contentAlignment: Alignment.Fill,
};
