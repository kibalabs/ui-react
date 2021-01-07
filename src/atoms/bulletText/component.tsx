import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IOptionalSingleChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';
import { IBulletListProps } from '../bulletList';
import { IBulletTextTheme } from './theme';

interface IStyledBulletTextProps {
  theme: IBulletTextTheme;
}

const StyledBulletText = styled.li<IStyledBulletTextProps>`
  ${(props: IStyledBulletTextProps): string => themeToCss(props.theme.normal.default.text)};
  &:before {
    ${(props: IStyledBulletTextProps): string => themeToCss(props.theme.normal.default.bullet)};
    display: inline-block;
  }
`;

export interface IBulletTextProps extends IComponentProps<IBulletTextTheme>, IOptionalSingleChildProps<IBulletListProps> {
  text: string;
}

export const BulletText = (props: IBulletTextProps): React.ReactElement => {
  const theme = useBuiltTheme('bulletTexts', props.variant, props.theme);
  return (
    <StyledBulletText
      id={props.id}
      className={getClassName(BulletText.displayName, props.className)}
      theme={theme}
    >
      {props.text}
      {props.children}
    </StyledBulletText>
  );
};

BulletText.displayName = 'BulletText';
BulletText.defaultProps = {
  ...defaultComponentProps,
  isEnabled: true,
};
