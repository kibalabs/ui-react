import React from 'react';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

import { Grid } from '../grid';
import { IDimensionGuide } from '../../subatoms';
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
      {React.Children.map(props.children, (child: React.ReactElement, index: number): React.ReactElement => {
        return (
          <Grid.Item key={index} size={props.childSize} sizeResponsive={props.childSizeResponsive}>{child}</Grid.Item>
        );
      })}
    </Grid>
  );
};

EqualGrid.defaultProps = {
};
