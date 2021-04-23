import React from 'react';

import { useWindowSize } from "@kibalabs/core-react";

import { useDimensions } from '../../theming';
import { ThemeType } from '../../util';

export interface IDimensionGuide extends ThemeType {
  fontSize: string;

  borderRadius: string;
  borderWidth: string;
  borderWidthNarrow: string;
  borderWidthWide: string;

  padding: string;
  paddingNarrow: string;
  paddingNarrow1: string;
  paddingNarrow2: string;
  paddingNarrow3: string;
  paddingNarrow4: string;
  paddingWide: string;
  paddingWide1: string;
  paddingWide2: string;
  paddingWide3: string;
  paddingWide4: string;

  columnCount: number;
  gutter: string;

  screenWidthSmall: string;
  screenWidthMedium: string;
  screenWidthLarge: string;
  screenWidthExtraLarge: string;
  screenWidthMax: string;
}

export enum ScreenSize {
  Base = 'base',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

export const getScreenSize = (size: ScreenSize, theme: IDimensionGuide): string => {
  switch (size) {
    case ScreenSize.Small: {
      return theme.screenWidthSmall;
    }
    case ScreenSize.Medium: {
      return theme.screenWidthMedium;
    }
    case ScreenSize.Large: {
      return theme.screenWidthLarge;
    }
    case ScreenSize.ExtraLarge: {
      return theme.screenWidthExtraLarge;
    }
    default: {
      return '0';
    }
  }
};

export enum PaddingSize {
  None = 'none',
  Default = 'default',
  Narrow = 'Narrow1',
  Narrow1 = 'Narrow1',
  Narrow2 = 'Narrow2',
  Narrow3 = 'Narrow3',
  Narrow4 = 'Narrow4',
  Wide = 'Wide1',
  Wide1 = 'Wide1',
  Wide2 = 'Wide2',
  Wide3 = 'Wide3',
  Wide4 = 'Wide4',
}

export type PaddingSizeProp = PaddingSize | string;

export const getPaddingSize = (size: PaddingSizeProp, theme: IDimensionGuide): string => {
  if (size === PaddingSize.None) {
    return '0px';
  }
  if (size === PaddingSize.Default) {
    return theme.padding;
  }
  const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);
  const fieldName = size.startsWith('padding') ? size : `padding${capitalizedSize}`;
  if (fieldName in theme) {
    return theme[fieldName] as string;
  }
  console.error(`Failed to find padding size: ${size} (${fieldName})`);
  return '0px';
};

export const ResponsiveScreenSizeContext = React.createContext<ScreenSize>(ScreenSize.Base);

const getScreenSizeValue = (size: ScreenSize, theme: IDimensionGuide): number => {
  if (size === ScreenSize.Base) {
    return 0;
  }
  return Number(getScreenSize(size as string as ScreenSize, theme).replace('px', ''));
};

export function useResponsiveScreenSize(): ScreenSize {
  const dimensions = useDimensions();
  const windowSize = useWindowSize();
  let screenSize = ScreenSize.Base;
  if (windowSize.width > getScreenSizeValue(ScreenSize.Small, dimensions)) {
    screenSize = ScreenSize.Small;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.Medium, dimensions)) {
    screenSize = ScreenSize.Medium;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.Large, dimensions)) {
    screenSize = ScreenSize.Large;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.ExtraLarge, dimensions)) {
    screenSize = ScreenSize.ExtraLarge;
  }
  return screenSize;
}