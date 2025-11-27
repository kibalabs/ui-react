import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { ILoadingSpinnerTheme } from './theme';
import { IComponentProps } from '../..';
import { themeToInlineStyles } from '../../util/legacyThemeCompat';

export { LoadingSpinnerThemedStyle } from '../../util/legacyThemeCompat';

interface ILoadingSpinnerProps extends IComponentProps<ILoadingSpinnerTheme> {
}

export function LoadingSpinner({
  className = '',
  variant = 'default',
  ...props
}: ILoadingSpinnerProps): React.ReactElement {
  const themeStyles = themeToInlineStyles(props.theme as Record<string, unknown>);
  return (
    <div
      id={props.id}
      className={getClassName(LoadingSpinner.displayName, className, ...(variant?.split('-') || []))}
      style={{ ...props.style, ...themeStyles }}
    />
  );
}
LoadingSpinner.displayName = 'KibaLoadingSpinner';
