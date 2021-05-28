import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Icon, PaddingSize, Spacing } from '../../particles';
import { propertyToCss } from '../../util';
import { HidingView } from '../../wrappers';
import { ICheckboxTheme } from './theme';

interface IStyledCheckboxProps {
  theme: ICheckboxTheme;
}

const StyledContainer = styled.label<IStyledCheckboxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition-duration: 0.3s;
  cursor: pointer;
  ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.default.text)};

  &:hover {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.hover?.text)};
  }
  &:active {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.press?.text)};
  }
  &:focus {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.focus?.text)};
  }
  &.checked {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.default?.text)};
    &:hover {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.hover?.text)};
    }
    &:active {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.press?.text)};
    }
    &:focus {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.focus?.text)};
    }
  }
  &.disabled {
    cursor: auto;
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.default?.text)};
    &:hover {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.hover?.text)};
    }
    &:active {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.press?.text)};
    }
    &:focus {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.focus?.text)};
    }
  }
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

const StyledCheckbox = styled.div<IStyledCheckboxProps>`
  cursor: pointer;
  background-clip: border-box;
  transition-duration: 0.3s;
  width: 1em;
  height: 1em;
  ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.default.checkBackground)};
  ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.normal.default.checkColor)};

  ${StyledContainer}:hover & {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.hover?.checkBackground)};
    ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.normal.hover?.checkColor)};
  }
  ${StyledContainer}:active & {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.press?.checkBackground)};
    ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.normal.press?.checkColor)};
  }
  ${StyledContainer}:focus & {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.normal.focus?.checkBackground)};
    ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.normal.focus?.checkColor)};
  }

  ${StyledContainer}.checked & {
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.default?.checkBackground)};
    ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.checked?.default?.checkColor)};
    ${StyledContainer}:hover & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.hover?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.checked?.hover?.checkColor)};
    }
    ${StyledContainer}:active & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.press?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.checked?.press?.checkColor)};
    }
    ${StyledContainer}:focus & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.checked?.focus?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.checked?.focus?.checkColor)};
    }
  }

  ${StyledContainer}.disabled & {
    cursor: auto;
    ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.default?.checkBackground)};
    ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.disabled?.default?.checkColor)};
    ${StyledContainer}:hover & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.hover?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.disabled?.hover?.checkColor)};
    }
    ${StyledContainer}:active & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.press?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.disabled?.press?.checkColor)};
    }
    ${StyledContainer}:focus & {
      ${(props: IStyledCheckboxProps): string => themeToCss(props.theme.disabled?.focus?.checkBackground)};
      ${(props: IStyledCheckboxProps): string => propertyToCss('color', props.theme.disabled?.focus?.checkColor)};
    }
  }
`;

interface ICheckBoxProps extends IComponentProps<ICheckboxTheme> {
  text: string;
  isChecked: boolean;
  isDisabled?: boolean;
  gutter?: PaddingSize;
  onToggled?(): void;
}

export const Checkbox = (props: ICheckBoxProps): React.ReactElement => {
  const onToggled = (event: React.SyntheticEvent<HTMLElement>): void => {
    if (!props.isDisabled && props.onToggled) {
      props.onToggled();
    }
    event.preventDefault();
  };

  const theme = useBuiltTheme('checkboxes', props.variant, props.theme);
  return (
    <StyledContainer
      id={props.id}
      className={getClassName(Checkbox.displayName, props.className, props.isDisabled && 'disabled', props.isChecked && 'checked')}
      theme={theme}
      onClick={onToggled}
    >
      <StyledHiddenCheckbox
        type='checkbox'
        checked={props.isChecked}
        onChange={onToggled}
      />
      <StyledCheckbox
        theme={theme}
      >
        <HidingView isHidden={!props.isChecked}>
          <Icon variant='fill' svgContent={'<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.365 4.5379c0.8075 0.75366 0.8512 2.0192 0.0975 2.8267l-11.2 12c-0.36243 0.3884-0.86448 0.6166-1.3954 0.6343s-1.047-0.1765-1.4346-0.5398l-4.8-4.5c-0.80582-0.7555-0.84665-2.0212-0.09119-2.827s2.0211-0.8466 2.827-0.0912l3.3377 3.1291 9.8323-10.535c0.7537-0.8075 2.0192-0.85114 2.8267-0.09747z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/></svg>'} />
        </HidingView>
      </StyledCheckbox>
      <Spacing variant={props.gutter || PaddingSize.Default} />
      { props.text }
    </StyledContainer>
  );
};

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  ...defaultComponentProps,
};
