import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { PaddingSize } from '../../particles';
import { ISwitchTheme } from './theme';


interface IStyledSwitchProps {
  theme: ISwitchTheme;
  width: string;
  height: string;
}

const StyledSwitchBackground = styled.div<IStyledSwitchProps>`
  ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.default?.switchBackground)};
  width: ${(props: IStyledSwitchProps): string => props.width};
  height: ${(props: IStyledSwitchProps): string => props.height};
  border-radius: ${(props: IStyledSwitchProps): string => props.height};

  &:hover {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.hover?.switchBackground)};
  }

  &:focus {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.focus?.switchBackground)};
  }
  
  &:press {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.press?.switchBackground)};
  }

  &.disabled {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.default?.switchBackground)};
    border-radius: 36px;

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.hover?.switchBackground)};
    }
  
    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.focus?.switchBackground)};
    }
    
    &:press {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.press?.switchBackground)};
    }
  }

  &.checked {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.default?.switchBackground)};
    border-radius: 36px;

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.hover?.switchBackground)};
    }
  
    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.focus?.switchBackground)};
    }
    
    &:press {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.press?.switchBackground)};
    }
  }
`;

const StyledSwitch = styled.div<IStyledSwitchProps>`
  ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.default?.switch)};
  width: ${(props: IStyledSwitchProps): string => props.width};
  height: ${(props: IStyledSwitchProps): string => props.height};
  border-radius: 50%;

  &:hover {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.hover?.switch)};
  }

  &:focus {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.focus?.switch)};
  }

  &:press {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.unchecked.press?.switch)};
  }

  &.disabled {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.default?.switch)};
    border-radius: 36px;

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.hover?.switch)};
    }

    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.focus?.switch)};
    }
    
    &:press {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.disabled.press?.switch)};
    }
  }

  &.checked {
    ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.default?.switch)};
    border-radius: 36px;

    &:hover {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.hover?.switch)};
    }

    &:focus {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.focus?.switch)};
    }
    
    &:press {
      ${(props: IStyledSwitchProps): string => themeToCss(props.theme.checked.press?.switch)};
    }
  }
`;

export interface ISwitchProps extends IComponentProps<ISwitchTheme> {
  isEnabled?: boolean;
  onToggled?(): void;
  isChecked: boolean;
  gutter?: PaddingSize;
}

export const Switch = (props: ISwitchProps): React.ReactElement => {
  const isEnabled = props.isEnabled !== undefined ? props.isEnabled : true;
  const theme = useBuiltTheme('switches', props.variant, props.theme);
  const onToggled = () => {
    if (isEnabled && props.onToggled) {
      props.onToggled();
    }
  };

  return (
    <div onClick={onToggled}>
      <StyledSwitchBackground width='72px' height='36px' theme={theme} className={getClassName(Switch.displayName, props.className, !isEnabled && 'disabled', props.isChecked && 'checked')}>
        <Stack direction={Direction.Horizontal} paddingHorizontal={PaddingSize.Narrow} isFullHeight={true} contentAlignment={props.isChecked ? Alignment.End : Alignment.Start} childAlignment={Alignment.Center}>
          <StyledSwitch width='30px' height='30px' theme={theme} className={getClassName(Switch.displayName, props.className, !isEnabled && 'disabled', props.isChecked && 'checked')} />
        </Stack>
      </StyledSwitchBackground>
    </div>
  );
};

Switch.displayName = 'Switch';
Switch.defaultProps = {
  ...defaultComponentProps,
};
