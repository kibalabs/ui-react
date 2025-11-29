import React from 'react';

import { ISingleAnyChildProps } from '@kibalabs/core-react';

export interface IWrapperProps extends ISingleAnyChildProps {
  className?: string;
  style?: React.CSSProperties;
}
