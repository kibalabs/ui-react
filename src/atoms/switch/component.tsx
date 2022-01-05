import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { setDefaults } from '../../util/SetDefaultProps';
import { ISwitchTheme } from './theme';


interface IStyledSwitchBackgroundProps {
  $theme: ISwitchTheme;
}

const StyledSwitchBackground = styled.button<IStyledSwitchBackgroundProps>`
  ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.normal.default?.background)};
  width: ${(props: IStyledSwitchBackgroundProps): string => props.$theme.normal.default?.backgroundWidth};
  cursor: pointer;
  transition: 300ms;

  &:hover {
    ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.normal.hover?.background)};
  }

  &:focus {
    ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.normal.focus?.background)};
  }

  &:active {
    ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.normal.press?.background)};
  }

  &.disabled {
    ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.disabled.default?.background)};

    &:hover {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.disabled.hover?.background)};
    }

    &:focus {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.disabled.focus?.background)};
    }

    &:active {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.disabled.press?.background)};
    }
  }

  &[aria-checked="true"] {
    ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.checked.default?.background)};

    &:hover {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.checked.hover?.background)};
    }

    &:focus {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.checked.focus?.background)};
    }

    &:active {
      ${(props: IStyledSwitchBackgroundProps): string => themeToCss(props.$theme.checked.press?.background)};
    }
  }
`;

interface IStyledSwitchProps {
  $theme: ISwitchTheme;
}

const StyledSwitch = styled.div<IStyledSwitchProps>`
  ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.normal.default?.switch)};
  width: ${(props: IStyledSwitchProps): string => props.$theme.normal.default?.switchWidth};
  height: ${(props: IStyledSwitchProps): string => props.$theme.normal.default?.switchHeight};
  float: left;
  cursor: pointer;

  &:hover {
    ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.normal.hover?.switch)};
  }

  &:focus {
    ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.normal.focus?.switch)};
  }

  &:active {
    ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.normal.press?.switch)};
  }

  &.disabled {
    ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.disabled.default?.switch)};

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.disabled.hover?.switch)};
    }

    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.disabled.focus?.switch)};
    }

    &:active {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.disabled.press?.switch)};
    }
  }

  &.checked {
    ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.checked.default?.switch)};
    float: right;

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.checked.hover?.switch)};
    }

    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.checked.focus?.switch)};
    }

    &:press {
      ${(props: IStyledSwitchProps): string => themeToCss(props.$theme.checked.press?.switch)};
    }
  }
`;

export interface ISwitchProps extends IComponentProps<ISwitchTheme> {
  isEnabled?: boolean;
  isChecked: boolean;
  onToggled?(): void;
}

export const Switch = (inputProps: ISwitchProps): React.ReactElement => {
  const props = setDefaults(inputProps, {
    ...defaultComponentProps,
  });
  const isEnabled = props.isEnabled !== undefined ? props.isEnabled : true;
  const theme = useBuiltTheme('switches', props.variant, props.theme);

  const onToggled = () => {
    if (isEnabled && props.onToggled) {
      props.onToggled();
    }
  };

  return (
    <StyledSwitchBackground
      id={props.id}
      className={getClassName(Switch.displayName, props.className, !isEnabled && 'disabled')}
      $theme={theme}
      aria-checked={props.isChecked}
      onClick={onToggled}
    >
      <StyledSwitch
        className={getClassName(!isEnabled && 'disabled', props.isChecked && 'checked')}
        $theme={theme}
      />
    </StyledSwitchBackground>
  );
};

Switch.displayName = 'Switch';
