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
  colors?: Partial<IColorGuide>;
}

export function ColorSettingView(props: IColorSettingViewProps): React.ReactElement {
  const colorStyles = colorsToStyleProperties(props.colors || {});
  const wrapperStyle: React.CSSProperties = {
    ...colorStyles,
    ...(props.colors?.text ? { color: props.colors.text } : {}),
    ...(props.colors?.background ? { backgroundColor: props.colors.background } : {}),
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
