import React from 'react';

import { getClassName } from '@kibalabs/core';
import { OptionalProppedElement } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { IIconProps, PaddingSize, Spacing } from '../../particles';

export { PillThemedStyle } from '../../util/legacyThemeCompat';

export interface IPillProps extends IComponentProps {
  text: string;
  isFullWidth?: boolean;
  iconRight?: OptionalProppedElement<IIconProps>;
  iconLeft?: OptionalProppedElement<IIconProps>;
  iconGutter?: PaddingSize;
}

export function Pill({
  className = '',
  variant = 'default',
  isFullWidth = false,
  iconGutter = PaddingSize.Default,
  ...props
}: IPillProps): React.ReactElement {
  return (
    <div
      id={props.id}
      className={getClassName(Pill.displayName, className, isFullWidth && 'fullWidth', ...(variant?.split('-') || []))}
      style={props.style}
    >
      { props.iconLeft && (
        <React.Fragment>
          {props.iconLeft}
          <Spacing variant={iconGutter} />
        </React.Fragment>
      )}
      { props.text }
      { props.iconRight && (
        <React.Fragment>
          <Spacing variant={iconGutter} />
          {props.iconRight}
        </React.Fragment>
      )}
    </div>
  );
}
Pill.displayName = 'KibaPill';
