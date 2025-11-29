import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { ScreenSize } from '../../particles/dimensions';
import { IWrapperProps } from '../wrapperProps';
import { WrapperView } from '../wrappingComponent';

export interface IResponsiveHidingViewProps extends IWrapperProps {
  hiddenAbove?: ScreenSize;
  hiddenBelow?: ScreenSize;
}

export function ResponsiveHidingView(props: IResponsiveHidingViewProps): React.ReactElement {
  return (
    <WrapperView
      className={props.className}
      style={props.style}
      wrapperClassName={getClassName(
        ResponsiveHidingView.displayName,
        props.hiddenAbove && `hidden-above-${props.hiddenAbove}`,
        props.hiddenBelow && `hidden-below-${props.hiddenBelow}`,
      )}
    >
      {props.children}
    </WrapperView>
  );
}
ResponsiveHidingView.displayName = 'KibaResponsiveHidingView';
