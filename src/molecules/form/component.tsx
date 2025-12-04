import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { Alignment } from '../..';
import { LayerContainer } from '../../layouts';
import { Box, LoadingSpinner } from '../../particles';
import { IMoleculeProps } from '../moleculeProps';

interface IFormProps extends IMoleculeProps, ISingleAnyChildProps {
  isLoading?: boolean;
  backgroundVariant?: string;
  loadingOverlayVariant?: string;
  loadingSpinnerVariant?: string;
  postTarget?: string;
  onFormSubmitted?: () => void;
}

export function Form({
  className = '',
  isLoading = false,
  ...props
}: IFormProps): React.ReactElement {
  if (props.postTarget && props.onFormSubmitted) {
    throw new Error('only one of {postTarget, onFormSubmitted} should be provided to Form');
  }

  const onSubmitted = (event: React.FormEvent<HTMLElement>): void => {
    if (props.onFormSubmitted) {
      event.preventDefault();
      props.onFormSubmitted();
    }
  };

  return (
    <Box
      id={props.id}
      className={getClassName(Form.displayName, className)}
      style={props.style}
      variant={props.backgroundVariant}
      isFullWidth={true}
    >
      <form
        id={props.id && `${props.id}-form`}
        onSubmit={props.onFormSubmitted ? onSubmitted : undefined}
        method={props.postTarget ? 'POST' : undefined}
        action={props.postTarget ? props.postTarget : undefined}
      >
        <LayerContainer>
          <LayerContainer.Layer isStatic={true}>
            {props.children}
          </LayerContainer.Layer>
          { isLoading && (
            <React.Fragment>
              <LayerContainer.Layer isFullHeight={true} isFullWidth={true}>
                <Box
                  id={props.id && `${props.id}-loading-overlay`}
                  className='form-overlay'
                  isFullHeight={true}
                  isFullWidth={true}
                  variant={props.loadingOverlayVariant || 'overlay'}
                />
              </LayerContainer.Layer>
              <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentHorizontal={Alignment.Center} alignmentVertical={Alignment.Center}>
                <LoadingSpinner
                  id={props.id && `${props.id}-loading-spinner`}
                  className='form-overlay-spinner'
                  variant={props.loadingSpinnerVariant}
                />
              </LayerContainer.Layer>
            </React.Fragment>
          )}
        </LayerContainer>
      </form>
    </Box>
  );
}
Form.displayName = 'KibaForm';
