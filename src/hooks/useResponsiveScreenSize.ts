import React from 'react';

import { useWindowSize } from '@kibalabs/core-react';

import { getScreenSizeValue, ScreenSize } from '../particles';

export const ResponsiveScreenSizeContext = React.createContext<ScreenSize>(ScreenSize.Base);

export function useResponsiveScreenSize(): ScreenSize {
  const windowSize = useWindowSize();
  let screenSize = ScreenSize.Base;
  if (windowSize.width > getScreenSizeValue(ScreenSize.Small)) {
    screenSize = ScreenSize.Small;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.Medium)) {
    screenSize = ScreenSize.Medium;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.Large)) {
    screenSize = ScreenSize.Large;
  }
  if (windowSize.width > getScreenSizeValue(ScreenSize.ExtraLarge)) {
    screenSize = ScreenSize.ExtraLarge;
  }
  return screenSize;
}
