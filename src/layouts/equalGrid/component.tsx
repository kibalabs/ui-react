import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

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

EqualGrid.displayName = 'EqualGrid';
EqualGrid.defaultProps = {
};
