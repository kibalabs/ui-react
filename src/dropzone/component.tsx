import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core/react';
import * as ReactDropzone from 'react-dropzone';

import { KibaIcon } from '..';

export interface IDropzoneProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onFilesChosen: (files: File[]) => void;
  fileMimeTypes?: string[];
  fileMimeTypeExtensions?: Record<string, string[]>;
  fileLimit?: number;
  isDisabled?: boolean;
  iconId?: string;
}

export function Dropzone(props: IDropzoneProps): React.ReactElement {
  const { onFilesChosen, fileLimit, isDisabled, fileMimeTypeExtensions, fileMimeTypes, id, className, style, children, iconId } = props;
  const onDrop = React.useCallback((files: File[]) => {
    onFilesChosen(files);
  }, [onFilesChosen]);
  const { getRootProps, getInputProps, isDragActive } = ReactDropzone.useDropzone({
    onDrop,
    maxFiles: fileLimit,
    disabled: isDisabled,
    accept: fileMimeTypeExtensions ?? ((fileMimeTypes || []).reduce((accumulator: Record<string, string[]>, current: string): Record<string, string[]> => {
      accumulator[current] = [];
      return accumulator;
    }, {})),
  });
  const rootProps = getRootProps();
  const inputProps = getInputProps();
  return (
    <div
      ref={rootProps.ref}
      tabIndex={rootProps.tabIndex}
      role='button'
      onKeyDown={rootProps.onKeyDown}
      onFocus={rootProps.onFocus}
      onBlur={rootProps.onBlur}
      onClick={rootProps.onClick}
      onDragEnter={rootProps.onDragEnter}
      onDragOver={rootProps.onDragOver}
      onDragLeave={rootProps.onDragLeave}
      onDrop={rootProps.onDrop}
      id={id}
      className={getClassName(Dropzone.displayName, className, isDragActive && 'fileHovering', isDisabled && 'disabled')}
      style={style}
    >
      <input
        ref={(inputProps as React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> }).ref}
        accept={inputProps.accept}
        multiple={inputProps.multiple}
        type={inputProps.type}
        autoComplete={inputProps.autoComplete}
        onChange={inputProps.onChange}
        onClick={inputProps.onClick}
        tabIndex={inputProps.tabIndex}
        style={inputProps.style}
      />
      {children ?? <KibaIcon iconId={iconId || 'ion-cloud-upload-outline'} />}
    </div>
  );
}
Dropzone.displayName = 'KibaDropzone';
