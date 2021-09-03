import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Box, IBoxTheme, IColorGuide, ILoadingSpinnerTheme, LoadingSpinner } from '../../particles';
import { ThemeType, valueToCss } from '../../util';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';


export interface IFormTheme extends ThemeType {
  background: IBoxTheme;
  loadingSpinnerTheme: ILoadingSpinnerTheme;
  overlayColor: string;
}

// TODO(krishan711): this should not be relatives when it uses layers
const StyledForm = styled.form`
  position: relative;
`;

interface ILoadingOverlayProps {
  overlayColor: string;
}

const LoadingOverlay = styled.div<ILoadingOverlayProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props: ILoadingOverlayProps): string => props.overlayColor ? valueToCss(props.overlayColor) : `rgba(245,245,245, 0.5)`};
  // opacity: 0.5;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IFormProps extends IMoleculeProps<IFormTheme>, ISingleAnyChildProps {
  isLoading: boolean;
  onFormSubmitted: () => void;
}

export const Form = (props: IFormProps): React.ReactElement => {
  const onSubmitted = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();
    props.onFormSubmitted();
  };

  // TODO(krishan711): this should use layers
  return (
    <Box
      id={props.id}
      className={getClassName(Form.displayName, props.className)}
      theme={props.theme?.background}
      isFullWidth={true}
    >
      <StyledForm
        id={props.id && `${props.id}-form`}
        className={getClassName(StyledForm.displayName)}
        onSubmit={onSubmitted}
      >
        {props.children}
        { props.isLoading && (
          <LoadingOverlay id={props.id && `${props.id}-loading-overlay`} overlayColor={props.theme?.overlayColor} className={'form-overlay'}>
            <LoadingSpinner id={props.id && `${props.id}-loading-spinner`} className={'form-overlay-spinner'} variant='large' />
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
