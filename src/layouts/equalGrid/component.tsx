import React from 'react';
import { getClassName } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps } from '@kibalabs/core-react';

import { Grid } from '../grid';
import { IDimensionGuide } from '../../particles';
import { Alignment } from '../../model';
import { ResponsiveField } from '../../util';

export interface IEqualGridProps extends IMultiAnyChildProps {
  id?: string;
  className?: string;
  theme?: IDimensionGuide;
  isFullHeight?: boolean;
  shouldAddGutters?: boolean;
  childAlignment?: Alignment;
  contentAlignment?: Alignment;
  childSize: number;
  childSizeResponsive?: ResponsiveField<number>;
}

export const EqualGrid = (props: IEqualGridProps): React.ReactElement => {
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
