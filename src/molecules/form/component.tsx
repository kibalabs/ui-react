import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';
import { Box, IBoxTheme, ILoadingSpinnerTheme, LoadingSpinner } from '../../particles';
import { useBuiltTheme } from '../../theming';
import { ThemeType, themeToCss } from '../../util';

export interface IFormTheme extends ThemeType {
  backgroundTheme: IBoxTheme;
  loadingOverlayTheme: IBoxTheme;
  loadingSpinnerTheme: ILoadingSpinnerTheme;
}

// TODO(krishan711): this should not be relative when it uses layers
const StyledForm = styled.form`
  position: relative;
`;

interface ILoadingOverlayProps {
  $theme: IBoxTheme;
}

const LoadingOverlay = styled.div<ILoadingOverlayProps>`
  ${(props: ILoadingOverlayProps): string => themeToCss(props.$theme)};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IFormProps extends IMoleculeProps<IFormTheme>, ISingleAnyChildProps {
  isLoading: boolean;
  backgroundVariant?: string;
  loadingOverlayVariant?: string;
  loadingSpinnerVariant?: string;
  onFormSubmitted: () => void;
}

export const Form = (props: IFormProps): React.ReactElement => {
  const onSubmitted = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    props.onFormSubmitted();
  };

  const loadingOverlayTheme = useBuiltTheme('boxes', props.loadingOverlayVariant || 'overlay', props.theme?.loadingOverlayTheme);
  console.log('loadingOverlayTheme', loadingOverlayTheme);

  // TODO(krishan711): this should use layers
  return (
    <Box
      id={props.id}
      className={getClassName(Form.displayName, props.className)}
      variant={props.backgroundVariant}
      theme={props.theme?.backgroundTheme}
      isFullWidth={true}
    >
      <StyledForm
        id={props.id && `${props.id}-form`}
        className={getClassName(StyledForm.displayName)}
        onSubmit={onSubmitted}
      >
        {props.children}
        { props.isLoading && (
          <LoadingOverlay
            id={props.id && `${props.id}-loading-overlay`}
            className={'form-overlay'}
            $theme={loadingOverlayTheme}
          >
            <LoadingSpinner
              id={props.id && `${props.id}-loading-spinner`}
              className={'form-overlay-spinner'}
              variant={props.loadingSpinnerVariant}
              theme={props.theme?.loadingSpinnerTheme}
            />
          </LoadingOverlay>
        )}
      </StyledForm>
    </Box>
  );
};

Form.displayName = 'Form';
Form.defaultProps = {
  ...defaultMoleculeProps,
  isLoading: false,
};
