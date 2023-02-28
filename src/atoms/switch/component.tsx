import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { ISwitchTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';
import { propertyToCss, themeToCss } from '../../util';


export const SwitchThemedStyle = (theme: RecursivePartial<ISwitchTheme>): string => `
  ${themeToCss(theme?.normal?.default?.background)};
  ${propertyToCss('width', theme.normal?.default?.backgroundWidth)};
  & > .SwitchInner {
    ${themeToCss(theme?.normal?.default?.switch)};
    ${propertyToCss('width', theme?.normal?.default?.switchWidth)};
    ${propertyToCss('height', theme?.normal?.default?.switchHeight)};
  }
  &:hover {
    ${themeToCss(theme?.normal?.hover?.background)};
    & > .SwitchInner {
      ${themeToCss(theme?.normal?.hover?.switch)};
    }
  }
  &:focus {
    ${themeToCss(theme?.normal?.focus?.background)};
    & > .SwitchInner {
      ${themeToCss(theme?.normal?.focus?.switch)};
    }
  }
  &:active {
    ${themeToCss(theme?.normal?.press?.background)};
    & > .SwitchInner {
      ${themeToCss(theme?.normal?.press?.switch)};
    }
  }
  &.disabled {
    ${themeToCss(theme?.disabled?.default?.background)};
    & > .SwitchInner {
      ${themeToCss(theme?.disabled?.default?.switch)};
    }
    &:hover {
      ${themeToCss(theme?.disabled?.hover?.background)};
      & > .SwitchInner {
        ${themeToCss(theme?.disabled?.hover?.switch)};
      }
    }
    &:focus {
      ${themeToCss(theme?.disabled?.focus?.background)};
      & > .SwitchInner {
        ${themeToCss(theme?.disabled?.focus?.switch)};
      }
    }
    &:active {
      ${themeToCss(theme?.disabled?.press?.background)};
      & > .SwitchInner {
        ${themeToCss(theme?.disabled?.press?.switch)};
      }
    }
  }
  &[aria-checked="true"] {
    ${themeToCss(theme?.checked?.default?.background)};
    & > .SwitchInner {
      ${themeToCss(theme?.checked?.default?.switch)};
    }
    &:hover {
      ${themeToCss(theme?.checked?.hover?.background)};
      & > .SwitchInner {
        ${themeToCss(theme?.checked?.hover?.switch)};
      }
    }
    &:focus {
      ${themeToCss(theme?.checked?.focus?.background)};
      & > .SwitchInner {
        ${themeToCss(theme?.checked?.focus?.switch)};
      }
    }
    &:active {
      ${themeToCss(theme?.checked?.press?.background)};
      & > .SwitchInner {
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
      <StyledSwitchInner className='SwitchInner' />
    </StyledSwitch>
  );
};

Switch.displayName = 'Switch';
Switch.defaultProps = {
  ...defaultComponentProps,
};
