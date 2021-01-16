import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Icon, PaddingSize, Spacing, Text } from '../../particles';
import { HidingView } from '../../wrappers';
import { ICheckboxTheme } from './theme';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledHiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface IStyledCheckboxProps {
  isChecked: boolean;
  theme: ICheckboxTheme;
}

const StyledCheckbox = styled.div<IStyledCheckboxProps>`
  ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: pointer;
  background-clip: border-box;
  transition-duration: 0.3s;

  &:hover {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.hover?.text)};
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.press?.text)};
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.focus?.text)};
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.checked {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.default?.text)};
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.default?.background)};
    &:hover {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.hover?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.hover?.background)};
    }
    &:active {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.press?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.press?.background)};
    }
    &:focus {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.focus?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.focus?.background)};
    }
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.default?.text)};
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.default?.background)};
    &:hover {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.hover?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.hover?.background)};
    }
    &:active {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.press?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.press?.background)};
    }
    &:focus {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.focus?.text)};
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.focus?.background)};
    }
  }
`;

const StyledLabel = styled.label`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  cursor: inherit;
`;

interface ICheckBoxProps extends IComponentProps<ICheckboxTheme> {
  isChecked: boolean;
  isEnabled: boolean;
  text: string;
  textVariant?: string;
  gutter?: PaddingSize;
  onToggled?(): void;
}

export const Checkbox = (props: ICheckBoxProps): React.ReactElement => {
  const theme = useBuiltTheme('checkboxes', props.variant, props.theme);
  return (
    <StyledContainer
      id={props.id}
      className={getClassName(Checkbox.displayName, props.className, !props.isEnabled && 'disabled')}
    >
      <StyledHiddenCheckbox
        type='checkbox'
        checked={props.isChecked}
      />
      <StyledCheckbox
        id={props.id ? `${props.id}-input` : 'my-cool-checkbox'}
        className={getClassName(props.isChecked && 'checked')}
        isChecked={props.isChecked}
        theme={theme}
      >
        <HidingView isInvisible={!props.isChecked}>
          <Icon variant='medium' svgContent={'<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96"/></svg>'} />
        </HidingView>
      </StyledCheckbox>
      <Spacing variant={props.gutter} />
      <StyledLabel
        htmlFor={props.id ? `${props.id}-input` : 'my-cool-checkbox'}
      >
        <Text variant={props.textVariant}>{ props.text }</Text>
      </StyledLabel>
    </StyledContainer>
  );
};

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  ...defaultComponentProps,
  isChecked: false,
  isEnabled: true,
  gutter: PaddingSize.Narrow,
  textVariant: 'default',
};
