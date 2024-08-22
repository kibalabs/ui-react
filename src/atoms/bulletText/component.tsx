import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IOptionalSingleChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IBulletTextTheme } from './theme';
import { IComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { IBulletListProps } from '../bulletList';

export const BulletTextThemedStyle = (theme: RecursivePartial<IBulletTextTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  &:before {
    ${themeToCss(theme?.normal?.default?.bullet)};
  }
`;

interface IStyledBulletTextProps {
  $theme?: RecursivePartial<IBulletTextTheme>;
}

const StyledBulletText = styled.li<IStyledBulletTextProps>`
  counter-increment: list-number;
  display: table;
  &:before {
    display: table-cell;
    padding-right: 1em;
  }
  &&&& {
    ${(props: IStyledBulletTextProps): string => (props.$theme ? BulletTextThemedStyle(props.$theme) : '')};
  }
`;

export interface IBulletTextProps extends IComponentProps<IBulletTextTheme>, IOptionalSingleChildProps<IBulletListProps> {
  text: string;
}

export function BulletText({
  text,
  className = '',
  variant = 'default',
  ...props
}: IBulletTextProps): React.ReactElement {
  return (
    <StyledBulletText
      id={props.id}
      className={getClassName(BulletText.displayName, className, ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      {text}
      {props.children}
    </StyledBulletText>
  );
}
BulletText.displayName = 'KibaBulletText';
