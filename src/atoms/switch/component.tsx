import React from 'react';

import { getClassName } from '@kibalabs/core';

import { Box, defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Icon, PaddingSize, Spacing } from '../../particles';
import { LayerContainer, Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { ISwitchTheme } from './theme';

export interface ISwitchProps extends IComponentProps<ISwitchTheme> {
  isEnabled?: boolean;
  onToggled?(): void;
  isChecked: boolean;
  gutter?: PaddingSize;
};


export const Switch = (props: ISwitchProps): React.ReactElement => {

  const isEnabled = props.isEnabled != undefined ? props.isEnabled : true;
  const switchBackgroundTheme = isEnabled ? props.isChecked ? props.theme?.checked : props.theme?.unchecked : props.theme?.disabled;
  
  const onToggled = () => {
    if (isEnabled && props.onToggled) {
      props.onToggled();
    }
  }

  return (
    <div onClick={onToggled}>
      <Box theme={{ "background-color": "skyblue" , "border-radius": "36px"}} height='36px' width='64px' >
        <Stack direction={Direction.Horizontal} paddingHorizontal={PaddingSize.Narrow} isFullHeight={true} contentAlignment={props.isChecked ? Alignment.End : Alignment.Start} childAlignment={Alignment.Center}>
          <Box theme={{ "background-color": 'white' }} variant='rounded' height='30px' width="30px" />
        </Stack>
      </Box>
    </div>
  );
}