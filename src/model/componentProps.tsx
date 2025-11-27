import React from 'react';

import { RecursivePartial } from '@kibalabs/core';

export interface IComponentProps {
  id?: string;
  className?: string;
  variant?: string;
  style?: React.CSSProperties;
}

/** @deprecated Use IComponentProps instead - theme prop is no longer used */
export interface IComponentPropsCompat<Theme> extends IComponentProps {
  theme?: RecursivePartial<Theme>;
}
