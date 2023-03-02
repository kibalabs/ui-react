import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
  isInvisible?: boolean;
}

const StyledHidingView = wrappingComponent((Component: React.ComponentType<IStyledHidingViewProps>): React.ComponentType<IStyledHidingViewProps> => {
  return styled(Component)<IStyledHidingViewProps>`
    ${(props: IStyledHidingViewProps): string => (props.isHidden ? 'display: none !important;' : '')};
    ${(props: IStyledHidingViewProps): string => (props.isInvisible ? 'visibility: hidden !important;' : '')};
  `;
});

export interface IHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
  isInvisible?: boolean;
}

export const HidingView = (props: IHidingViewProps): React.ReactElement => {
  return (
    <StyledHidingView
      className={getClassName(HidingView.displayName, props.className)}
      isHidden={props.isHidden}
      isInvisible={props.isInvisible}
    >
      {props.children}
    </StyledHidingView>
  );
};

HidingView.displayName = 'KibaHidingView';
HidingView.defaultProps = {
  ...defaultWrapperProps,
};
