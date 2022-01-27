import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { Alignment } from '../..';
import { LayerContainer } from '../../layouts';
import { Box, IBoxTheme, ILoadingSpinnerTheme, LoadingSpinner } from '../../particles';
import { ThemeType } from '../../util';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

export interface IFormTheme extends ThemeType {
  backgroundTheme: IBoxTheme;
  loadingOverlayTheme: IBoxTheme;
  loadingSpinnerTheme: ILoadingSpinnerTheme;
}

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

  return (
    <Box
      id={props.id}
      className={getClassName(Form.displayName, props.className)}
      variant={props.backgroundVariant}
      theme={props.theme?.backgroundTheme}
      isFullWidth={true}
    >
      <form
        id={props.id && `${props.id}-form`}
        onSubmit={onSubmitted}
      >
        <LayerContainer>
          <LayerContainer.Layer isStatic={true}>
            {props.children}
          </LayerContainer.Layer>
          { props.isLoading && (
            <React.Fragment>
              <LayerContainer.Layer isFullHeight={true} isFullWidth={true}>
                <Box
                  id={props.id && `${props.id}-loading-overlay`}
                  className={'form-overlay'}
                  isFullHeight={true}
                  isFullWidth={true}
                  variant={props.loadingOverlayVariant || 'overlay'}
                  theme={props.theme?.loadingOverlayTheme}
                />
              </LayerContainer.Layer>
              <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentHorizontal={Alignment.Center} alignmentVertical={Alignment.Center}>
                <LoadingSpinner
                  id={props.id && `${props.id}-loading-spinner`}
                  className={'form-overlay-spinner'}
                  variant={props.loadingSpinnerVariant}
                  theme={props.theme?.loadingSpinnerTheme}
                />
              </LayerContainer.Layer>
            </React.Fragment>
          )}
        </LayerContainer>
      </form>
    </Box>
  );
};

Form.displayName = 'Form';
Form.defaultProps = {
  ...defaultMoleculeProps,
  isLoading: false,
};
