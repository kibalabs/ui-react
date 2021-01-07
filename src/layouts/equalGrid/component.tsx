import React from 'react';

import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps } from '@kibalabs/core-react';

import { Alignment } from '../../model';
import { IDimensionGuide } from '../../particles';
import { ResponsiveField } from '../../util';
import { Grid } from '../grid';

export interface IEqualGridProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  childSize?: number;
  childSizeResponsive?: ResponsiveField<number>;
}

export const EqualGrid = (props: IEqualGridProps): React.ReactElement => {
  if (props.childSize == null && props.childSizeResponsive?.base == null) {
    throw new Error(`One of {childSize, childSizeResponsive.base} must be passed to ${EqualGrid.displayName}`);
  }
  return (
    <Grid {...props} className={getClassName(EqualGrid.displayName, props.className)}>
      {flattenChildren(props.children).map((child: React.ReactChild, index: number): React.ReactElement => (
        <Grid.Item key={index} size={props.childSize} sizeResponsive={props.childSizeResponsive}>{child}</Grid.Item>
      ))}
    </Grid>
  );
};

EqualGrid.displayName = 'EqualGrid';
EqualGrid.defaultProps = {
};
