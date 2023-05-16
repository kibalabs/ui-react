import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IDimensionGuide } from '../../particles';
import { useDimensions } from '../../theming';

interface IStyledContainerProps {
  $theme: IDimensionGuide;
  $isFullHeight: boolean;
}

const StyledContainer = styled.div<IStyledContainerProps>`
  width: 100%;
  max-width: ${(props: IStyledContainerProps): string => props.$theme.screenWidthMax};
  height: ${(props: IStyledContainerProps): string => (props.$isFullHeight ? '100%' : 'auto')};
  overflow-y: ${(props: IStyledContainerProps): string => (props.$isFullHeight ? 'auto' : 'visible')};
  margin-right: auto;
  margin-left: auto;
`;

export interface IContainerProps extends ISingleAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight: boolean;
}

export const Container = (props: IContainerProps): React.ReactElement => {
  const theme = useDimensions(props.theme);
  return (
    <StyledContainer
      id={props.id}
      className={getClassName(Container.displayName, props.className)}
      $theme={theme}
      $isFullHeight={props.isFullHeight}
    >
      {props.children}
    </StyledContainer>
  );
};

Container.displayName = 'KibaContainer';
Container.defaultProps = {
  className: '',
  isFullHeight: true,
};
