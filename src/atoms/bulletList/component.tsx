import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IBulletTextProps } from '../bulletText';
import { IBulletListTheme } from './theme';

interface IStyledBulletListProps {
  theme: IBulletListTheme;
}

const StyledBulletList = styled.ul<IStyledBulletListProps>`
  ${(props: IStyledBulletListProps): string => themeToCss(props.theme.normal.default.bulletList)};
`;

export interface IBulletListProps extends IComponentProps<IBulletListTheme>, IMultiChildProps<IBulletTextProps> {
}

export const BulletList = (props: IBulletListProps): React.ReactElement => {
  const theme = useBuiltTheme('bulletLists', props.variant, props.theme);
  return (
    <StyledBulletList
      id={props.id}
      className={getClassName(BulletList.displayName, props.className)}
      theme={theme}
    >
      {props.children}
    </StyledBulletList>
  );
};

BulletList.displayName = 'BulletList';
BulletList.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
