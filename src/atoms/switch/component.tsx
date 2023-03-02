import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { ISwitchTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { propertyToCss, themeToCss } from '../../util';


export const SwitchThemedStyle = (theme: RecursivePartial<ISwitchTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};
  ${propertyToCss('width', theme.normal?.default?.backgroundWidth)};
  & > .KibaSwitchInner {
    ${themeToCss(theme?.normal?.default?.switch)};
    ${propertyToCss('width', theme?.normal?.default?.switchWidth)};
    ${propertyToCss('height', theme?.normal?.default?.switchHeight)};
  }
  &:hover {
    ${themeToCss(theme?.normal?.hover?.background)};
    & > .KibaSwitchInner {
      ${themeToCss(theme?.normal?.hover?.switch)};
    }
  }
  &:focus {
    ${themeToCss(theme?.normal?.focus?.background)};
    & > .KibaSwitchInner {
      ${themeToCss(theme?.normal?.focus?.switch)};
    }
  }
  &:active {
    ${themeToCss(theme?.normal?.press?.background)};
    & > .KibaSwitchInner {
      ${themeToCss(theme?.normal?.press?.switch)};
    }
  }
  &.disabled {
    ${themeToCss(theme?.disabled?.default?.background)};
    & > .KibaSwitchInner {
      ${themeToCss(theme?.disabled?.default?.switch)};
    }
    &:hover {
      ${themeToCss(theme?.disabled?.hover?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.disabled?.hover?.switch)};
      }
    }
    &:focus {
      ${themeToCss(theme?.disabled?.focus?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.disabled?.focus?.switch)};
      }
    }
    &:active {
      ${themeToCss(theme?.disabled?.press?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.disabled?.press?.switch)};
      }
    }
  }
  &[aria-checked="true"] {
    ${themeToCss(theme?.checked?.default?.background)};
    & > .KibaSwitchInner {
      ${themeToCss(theme?.checked?.default?.switch)};
    }
    &:hover {
      ${themeToCss(theme?.checked?.hover?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.checked?.hover?.switch)};
      }
    }
    &:focus {
      ${themeToCss(theme?.checked?.focus?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.checked?.focus?.switch)};
      }
    }
    &:active {
      ${themeToCss(theme?.checked?.press?.background)};
      & > .KibaSwitchInner {
        ${themeToCss(theme?.checked?.press?.switch)};
      }
    }
  }
`;

interface IStyledSwitchProps {
  $theme?: RecursivePartial<ISwitchTheme>;
}

const StyledSwitch = styled.button<IStyledSwitchProps>`
  cursor: pointer;
  transition: 300ms;

  && {
    ${(props: IStyledSwitchProps): string => (props.$theme ? SwitchThemedStyle(props.$theme) : '')};
  }
`;

const StyledSwitchInner = styled.div`
  float: left;
  cursor: pointer;
  &.checked {
    float: right;
  }
`;

export interface ISwitchProps extends IComponentProps<ISwitchTheme> {
  isEnabled?: boolean;
  isChecked: boolean;
  onToggled?(): void;
}

export const Switch = (props: ISwitchProps): React.ReactElement => {
  const isEnabled = props.isEnabled !== undefined ? props.isEnabled : true;
  const onToggled = () => {
    if (isEnabled && props.onToggled) {
      props.onToggled();
    }
  };

  return (
    <StyledSwitch
      id={props.id}
      className={getClassName(Switch.displayName, props.className, !isEnabled && 'disabled', ...(props.variant?.split('-') || []))}
      $theme={props.theme}
      aria-checked={props.isChecked}
      onClick={onToggled}
    >
      <StyledSwitchInner className='KibaSwitchInner' />
    </StyledSwitch>
  );
};

Switch.displayName = 'KibaSwitch';
Switch.defaultProps = {
  ...defaultComponentProps,
};
