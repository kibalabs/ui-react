import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { defaultComponentProps, Direction, IComponentProps, MultiDirection } from '../../model';
import { useDimensions } from '../../theming';
import { setDefaults } from '../../util/SetDefaultProps';
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

export const Spacing = (inputProps: ISpacingProps): React.ReactElement => {
  const props = setDefaults(inputProps, { ...defaultComponentProps,
    direction: MultiDirection.Both });
  const theme = useDimensions(props.theme);
  return (
    <StyledDiv
      id={props.id}
      className={getClassName(Spacing.displayName, props.className)}
      $theme={theme}
      $size={props.variant as PaddingSize}
      $direction={props.direction}
    />
  );
};

Spacing.displayName = 'Spacing';
