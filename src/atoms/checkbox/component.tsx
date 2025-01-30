import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { ICheckboxTheme } from './theme';
import { IComponentProps } from '../../model';
import { Icon, PaddingSize, Spacing } from '../../particles';
import { propertyToCss, themeToCss } from '../../util';

export const CheckboxThemedStyle = (theme: RecursivePartial<ICheckboxTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  & > .checkbox-inner {
    ${themeToCss(theme?.normal?.default?.checkBackground)};
    ${propertyToCss('color', theme?.normal?.default?.checkColor)};
  }

  &:hover {
    ${themeToCss(theme?.normal?.hover?.text)};
    & > .checkbox-inner {
      ${themeToCss(theme?.normal?.hover?.checkBackground)};
      ${propertyToCss('color', theme?.normal?.hover?.checkColor)};
    }
  }
  &:active {
    ${themeToCss(theme?.normal?.press?.text)};
    & > .checkbox-inner {
      ${themeToCss(theme?.normal?.press?.checkBackground)};
      ${propertyToCss('color', theme?.normal?.press?.checkColor)};
    }
  }
  &:focus {
    ${themeToCss(theme?.normal?.focus?.text)};
    & > .checkbox-inner {
      ${themeToCss(theme?.normal?.focus?.checkBackground)};
      ${propertyToCss('color', theme?.normal?.focus?.checkColor)};
    }
  }

  &.checked {
    ${themeToCss(theme.checked?.default?.text)};
    & > .checkbox-inner {
      ${themeToCss(theme.checked?.default?.checkBackground)};
      ${propertyToCss('color', theme.checked?.default?.checkColor)};
    }
    &:hover {
      ${themeToCss(theme.checked?.hover?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.checked?.hover?.checkBackground)};
        ${propertyToCss('color', theme.checked?.hover?.checkColor)};
      }
    }
    &:active {
      ${themeToCss(theme.checked?.press?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.checked?.press?.checkBackground)};
        ${propertyToCss('color', theme.checked?.press?.checkColor)};
      }
    }
    &:focus {
      ${themeToCss(theme.checked?.focus?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.checked?.focus?.checkBackground)};
        ${propertyToCss('color', theme.checked?.focus?.checkColor)};
      }
    }
  }
  &.disabled {
    ${themeToCss(theme.disabled?.default?.text)};
    & > .checkbox-inner {
      ${themeToCss(theme.disabled?.default?.checkBackground)};
      ${propertyToCss('color', theme.disabled?.default?.checkColor)};
    }
    &:hover {
      ${themeToCss(theme.disabled?.hover?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.disabled?.hover?.checkBackground)};
        ${propertyToCss('color', theme.disabled?.hover?.checkColor)};
      }
    }
    &:active {
      ${themeToCss(theme.disabled?.press?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.disabled?.press?.checkBackground)};
        ${propertyToCss('color', theme.disabled?.press?.checkColor)};
      }
    }
    &:focus {
      ${themeToCss(theme.disabled?.focus?.text)};
      & > .checkbox-inner {
        ${themeToCss(theme.disabled?.focus?.checkBackground)};
        ${propertyToCss('color', theme.disabled?.focus?.checkColor)};
      }
    }
  }
`;

interface IStyledCheckboxProps {
  $theme?: RecursivePartial<ICheckboxTheme>;
}

const StyledContainer = styled.label<IStyledCheckboxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition-duration: 0.3s;
  cursor: pointer;
  &.disabled {
    cursor: auto;
    & > .checkbox-inner {
      cursor: auto;
    }
  }

  &&&& {
    ${(props: IStyledCheckboxProps): string => (props.$theme ? CheckboxThemedStyle(props.$theme) : '')};
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

const StyledCheckbox = styled.div`
  cursor: pointer;
  background-clip: border-box;
  transition-duration: 0.3s;
  width: 1em;
  height: 1em;
`;

interface ICheckBoxProps extends IComponentProps<ICheckboxTheme> {
  text: string;
  isChecked: boolean;
  isDisabled?: boolean;
  gutter?: PaddingSize;
  onToggled?(): void;
}

export function Checkbox({
  className = '',
  variant = 'default',
  ...props
}: ICheckBoxProps): React.ReactElement {
  const isDisabled = props.isDisabled;
  const propsOnToggled = props.onToggled;
  const onToggled = React.useCallback((event: React.SyntheticEvent<HTMLElement>): void => {
    if (!isDisabled && propsOnToggled) {
      propsOnToggled();
    }
    event.preventDefault();
  }, [isDisabled, propsOnToggled]);

  return (
    <StyledContainer
      id={props.id}
      className={getClassName(Checkbox.displayName, className, props.isDisabled && 'disabled', props.isChecked && 'checked', ...(variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onToggled}
    >
      <StyledHiddenCheckbox
        type='checkbox'
        checked={props.isChecked}
        onChange={onToggled}
      />
      <StyledCheckbox className='checkbox-inner'>
        {props.isChecked && (
          <Icon variant='fill' svgContent='<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.365 4.5379c0.8075 0.75366 0.8512 2.0192 0.0975 2.8267l-11.2 12c-0.36243 0.3884-0.86448 0.6166-1.3954 0.6343s-1.047-0.1765-1.4346-0.5398l-4.8-4.5c-0.80582-0.7555-0.84665-2.0212-0.09119-2.827s2.0211-0.8466 2.827-0.0912l3.3377 3.1291 9.8323-10.535c0.7537-0.8075 2.0192-0.85114 2.8267-0.09747z" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"/></svg>' />
        )}
      </StyledCheckbox>
      <Spacing variant={props.gutter || PaddingSize.Default} />
      { props.text }
    </StyledContainer>
  );
}
Checkbox.displayName = 'KibaCheckbox';
