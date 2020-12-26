import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';

interface IStyledHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
}

const withHidingView = (Component: React.ComponentType<IStyledHidingViewProps>): React.ComponentType => styled(Component)<IStyledHidingViewProps>`
  ${(props: IStyledHidingViewProps): string => (props.isHidden ? 'display: none !important;' : '')};
`;

const StyledHidingView = withHidingView((props: IStyledHidingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div key='defaultChild' />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })));
});

export interface IHidingViewProps extends IWrapperProps {
  isHidden?: boolean;
}

export const HidingView = (props: IHidingViewProps): React.ReactElement => {
  return (
    <StyledHidingView
      className={getClassName(HidingView.displayName, props.className)}
      isHidden={props.isHidden}
    >
      {props.children}
    </StyledHidingView>
  );
};

HidingView.displayName = 'HidingView';
HidingView.defaultProps = {
  ...defaultWrapperProps,
};
