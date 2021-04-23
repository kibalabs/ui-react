import React from 'react';

import { useWindowSize } from '@kibalabs/core-react';

import { getScreenSize, IDimensionGuide, ScreenSize } from '../particles';
import { useDimensions } from '../theming';

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
