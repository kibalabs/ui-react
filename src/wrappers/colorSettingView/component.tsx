import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IWrapperProps, defaultWrapperProps } from '../wrapperProps';
import { ColorProvider, useAlternateColors } from '../../theming';
import { IColorGuide } from '../../particles';
import { colorsToCss } from '../../util';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledColorSettingViewProps extends IWrapperProps {
  colors: Partial<IColorGuide>;
}

const StyledColorSettingView = wrappingComponent((Component: React.ComponentType<IStyledColorSettingViewProps>): React.ComponentType<IStyledColorSettingViewProps> => {
  return styled(Component)<IStyledColorSettingViewProps>`
    ${(props: IStyledColorSettingViewProps): string => colorsToCss(props.colors)};
  `;
});

export interface IColorSettingViewProps extends IWrapperProps {
  theme?: Partial<IColorGuide>;
  variant?: string;
}

export const ColorSettingView = (props: IColorSettingViewProps): React.ReactElement => {
  const colors = props.theme || useAlternateColors(props.variant);

  return (
    <ColorProvider colors={colors}>
      <StyledColorSettingView
        className={getClassName(ColorSettingView.displayName, props.className)}
        colors={colors}
      >
        {props.children}
      </StyledColorSettingView>
    </ColorProvider>
  );
};

ColorSettingView.displayName = 'ColorSettingView';
ColorSettingView.defaultProps = {
  ...defaultWrapperProps,
};
