import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps } from '@kibalabs/core-react';

import { Alignment, PaddingSizeProp } from '../..';
import { IDimensionGuide } from '../../particles';
import { ResponsiveField } from '../../util';
import { IPaddingViewPaddingProps } from '../../wrappers';
import { Grid } from '../grid';

export interface IEqualGridProps extends IMultiAnyChildProps, IPaddingViewPaddingProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  defaultGutter?: PaddingSizeProp;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  childSize?: number;
  childSizeResponsive?: ResponsiveField<number>;
}

export function EqualGrid({
  className = '',
  ...props
}: IEqualGridProps): React.ReactElement {
  if (props.childSize == null && props.childSizeResponsive?.base == null) {
    throw new Error(`One of {childSize, childSizeResponsive.base} must be passed to ${EqualGrid.displayName}`);
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid {...props} className={getClassName(EqualGrid.displayName, className)}>
      {flattenChildren(props.children).map((child: (React.ReactElement | string | number)): React.ReactElement => (
        <Grid.Item key={child.toString()} size={props.childSize} sizeResponsive={props.childSizeResponsive}>{child}</Grid.Item>
      ))}
    </Grid>
  );
}
EqualGrid.displayName = 'KibaEqualGrid';
