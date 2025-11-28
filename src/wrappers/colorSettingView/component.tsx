import React from 'react';

import { camelCaseToKebabCase } from '@kibalabs/core';

import { IColorGuide } from '../../particles';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

const colorsToStyleProperties = (colors: Partial<IColorGuide>): Record<string, string> => {
  const output: Record<string, string> = {};
  Object.keys(colors).forEach((colorKey: string): void => {
    const colorValue = colors[colorKey as keyof IColorGuide];
    if (colorValue) {
      output[`--kiba-color-${camelCaseToKebabCase(colorKey)}`] = colorValue;
    }
  });
  return output;
};

export interface IColorSettingViewProps extends IWrapperProps {
  /** @deprecated Use `colors` instead */
  theme?: Partial<IColorGuide>;
  colors?: Partial<IColorGuide>;
}

export function ColorSettingView(props: IColorSettingViewProps): React.ReactElement {
  const colorOverrides = props.colors || props.theme;
  const colorStyles = colorsToStyleProperties(colorOverrides || {});
  const wrapperStyle: React.CSSProperties = {
    ...colorStyles,
    ...(colorOverrides?.text ? { color: colorOverrides.text } : {}),
    ...(colorOverrides?.background ? { backgroundColor: colorOverrides.background } : {}),
  };
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={ColorSettingView.displayName}
      wrapperStyle={wrapperStyle}
    >
      {props.children}
    </WrapperView>
  );
}
ColorSettingView.displayName = 'KibaColorSettingView';
