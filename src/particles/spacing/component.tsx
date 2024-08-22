import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { Direction, IComponentProps, MultiDirection } from '../../model';
import { useDimensions } from '../../theming';
import { getPaddingSize, IDimensionGuide, PaddingSize } from '../dimensions';

interface IStyledSpacingProps {
  $size: PaddingSize;
  $direction: Direction | MultiDirection;
  $theme: IDimensionGuide;
}

const StyledDiv = styled.div<IStyledSpacingProps>`
  margin-left: ${(props: IStyledSpacingProps): string => (props.$direction === MultiDirection.Both || props.$direction === MultiDirection.Horizontal ? getPaddingSize(props.$size, props.$theme) : '0')};
  margin-top: ${(props: IStyledSpacingProps): string => (props.$direction === MultiDirection.Both || props.$direction === MultiDirection.Vertical ? getPaddingSize(props.$size, props.$theme) : '0')};
`;

export interface ISpacingProps extends IComponentProps<IDimensionGuide> {
  direction?: Direction | MultiDirection;
}

export function Spacing({
  className = '',
  variant = 'default',
  direction = MultiDirection.Both,
  ...props
}: ISpacingProps): React.ReactElement {
  const theme = useDimensions(props.theme);
  return (
    <StyledDiv
      id={props.id}
      className={getClassName(Spacing.displayName, className)}
      $theme={theme}
      $size={variant as PaddingSize}
      $direction={direction}
    />
  );
}
Spacing.displayName = 'KibaSpacing';
