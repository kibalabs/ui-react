import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IColorGuide } from '../../particles';
import { ColorProvider, useAlternateColors } from '../../theming';
import { colorsToCss } from '../../util';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';

interface IStyledColorSettingViewProps extends IWrapperProps {
  colors: Partial<IColorGuide>;
}

const withColorSettingView = (Component: React.ComponentType<IStyledColorSettingViewProps>): React.ComponentType => styled(Component)<IStyledColorSettingViewProps>`
  ${(props: IStyledColorSettingViewProps): string => colorsToCss(props.colors)};
`;

const StyledColorSettingView = withColorSettingView((props: IStyledColorSettingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div key='defaultChild' />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })));
});

export interface IColorSettingViewProps extends IWrapperProps {
  theme?: Partial<IColorGuide>;
  variant?: string;
}

export const ColorSettingView = (props: IColorSettingViewProps): React.ReactElement => {
  const colors = useAlternateColors(props.variant, props.theme);

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
