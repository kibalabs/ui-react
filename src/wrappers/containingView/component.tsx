import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';

interface IStyledContainingViewProps extends IWrapperProps {
  theme: IDimensionGuide;
}

const withContainingView = (Component: React.ComponentType<IStyledContainingViewProps>): React.ComponentType => styled(Component)<IStyledContainingViewProps>`
  max-width: ${(props: IStyledContainingViewProps): string => props.theme.screenWidthMax};
  width: 100%;
  overflow: auto;
  &.centered {
    margin-right: auto;
    margin-left: auto;
  }
`;

const StyledContainingView = withContainingView((props: IStyledContainingViewProps): React.ReactElement => {
  const children = React.Children.count(props.children) > 0 ? props.children : [<div key='defaultChild' />];
  return React.Children.map(children, ((child: React.ReactElement) => child && React.cloneElement(child, { className: getClassName(props.className, child.props.className) })));
});

export interface IContainingViewProps extends IWrapperProps {
  theme?: IDimensionGuide;
  isCenteredHorizontally: boolean;
}

export const ContainingView = (props: IContainingViewProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  return (
    <StyledContainingView
      className={getClassName(ContainingView.displayName, props.className, props.isCenteredHorizontally && 'centered')}
      theme={theme}
    >
      {props.children}
    </StyledContainingView>
  );
};

ContainingView.displayName = 'ContainingView';
ContainingView.defaultProps = {
  ...defaultWrapperProps,
  isCenteredHorizontally: true,
};
