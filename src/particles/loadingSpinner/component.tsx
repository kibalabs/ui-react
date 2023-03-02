import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { ILoadingSpinnerTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../..';
import { propertyToCss } from '../../util';

export const LoadingSpinnerThemedStyle = (theme: RecursivePartial<ILoadingSpinnerTheme>): string => `
  ${propertyToCss('border-width', theme.width)};
  ${propertyToCss('border-color', theme.color)};
  ${propertyToCss('width', theme.size)};
  ${propertyToCss('height', theme.size)};
`;

interface IStyledLoadingSpinnerProps {
  $theme?: RecursivePartial<ILoadingSpinnerTheme>;
}

const StyledLoadingSpinner = styled.div<IStyledLoadingSpinnerProps>`
  border-radius: 50%;
  border-style: solid;
  border-top-color: transparent !important;
  animation: spin 1.0s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  && {
    ${(props: IStyledLoadingSpinnerProps): string => (props.$theme ? LoadingSpinnerThemedStyle(props.$theme) : '')};
  }
`;

interface ILoadingSpinnerProps extends IComponentProps<ILoadingSpinnerTheme> {
}

export const LoadingSpinner = (props: ILoadingSpinnerProps): React.ReactElement => {
  return (
    <StyledLoadingSpinner
      id={props.id}
      className={getClassName(LoadingSpinner.displayName, props.className, ...(props.variant?.split('-') || []))}
      $theme={props.theme}
    />
  );
};

LoadingSpinner.displayName = 'KibaLoadingSpinner';
LoadingSpinner.defaultProps = {
  ...defaultComponentProps,
};
