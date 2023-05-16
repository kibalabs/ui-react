import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';
import { defaultWrapperProps, IWrapperProps } from '../wrapperProps';
import { wrappingComponent } from '../wrappingComponent';

interface IStyledContainingViewProps extends IWrapperProps {
  theme: IDimensionGuide;
}

const StyledContainingView = wrappingComponent((Component: React.ComponentType<IStyledContainingViewProps>): React.ComponentType<IStyledContainingViewProps> => {
  return styled(Component)<IStyledContainingViewProps>`
    max-width: ${(props: IStyledContainingViewProps): string => props.theme.screenWidthMax};
    width: 100%;
    overflow: auto;
    &.centered {
      margin-right: auto;
      margin-left: auto;
    }
  `;
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

ContainingView.displayName = 'KibaContainingView';
ContainingView.defaultProps = {
  ...defaultWrapperProps,
  isCenteredHorizontally: true,
};
