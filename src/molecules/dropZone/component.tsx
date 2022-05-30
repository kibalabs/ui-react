
import React from 'react';

import { getClassName } from '@kibalabs/core';
import * as ReactDropzone from 'react-dropzone';
import styled from 'styled-components';

import { KibaIcon, ThemeType, valueToCss } from '../..';
import { Stack } from '../../layouts';
import { Direction } from '../../model';
import { Box, IBoxTheme, Text } from '../../particles';
import { ITheme, useTheme } from '../../theming';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

export interface IDropzoneTheme extends ThemeType {
  backgroundTheme: IBoxTheme;
}

interface IDropzoneProps extends IMoleculeProps<IDropzoneTheme> {
  onFilesChosen: (files: File[]) => void;
}

export interface IStyledDropzoneProps {
  $theme: ITheme;
}

const StyledDropzone = styled.div<IStyledDropzoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 1em;
  border-width: 0.1em;
  border-radius: ${(props: IStyledDropzoneProps): string => valueToCss(props.$theme.dimensions.borderRadius)};
  border-color: #ccc;
  border-style: dashed;
  justify-content: center;
  outline: none;
  cursor: pointer;
  transition: border .24s ease-in-out;
`;

export const DropZone = (props: IDropzoneProps): React.ReactElement => {
  const theme = useTheme();
  const onDrop = React.useCallback((files: File[]) => {
    props.onFilesChosen(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onFilesChosen]);

  const { getRootProps, getInputProps } = ReactDropzone.useDropzone({ onDrop, maxFiles: 1, accept: { image: ['image/png', 'image/jpeg', 'image/jpg'] } });

  return (
    <Box
      className={getClassName(DropZone.displayName, props.className)}
      id={props.id}
      theme={props.theme?.backgroundTheme}
    >
      <StyledDropzone
        theme={theme} {...getRootProps()}
        id={props.id && `${props.id}`}
        className={getClassName(StyledDropzone.displayName, props.className)}
      >
        <input {...getInputProps()} />
        <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
          <KibaIcon iconId='ion-cloud-upload-outline' />
          <Text>Upload custom image</Text>
        </Stack>
      </StyledDropzone>
    </Box>
  );
};

DropZone.displayName = 'DropZone';
DropZone.defaultProps = {
  ...defaultMoleculeProps,
};
