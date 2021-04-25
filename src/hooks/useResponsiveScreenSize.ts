import React from 'react';

import { useWindowSize } from '@kibalabs/core-react';

import { getScreenSizeValue, ScreenSize } from '../particles';
import { useDimensions } from '../theming';

export const ResponsiveScreenSizeContext = React.createContext<ScreenSize>(ScreenSize.Base);

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
