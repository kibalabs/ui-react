import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps } from '../../model';
import { getTextTag, TextAlignment, TextTag } from '../../particles/text';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { IPrettyTextTheme } from './theme';

interface IStyledPrettyTextProps {
  $theme: IPrettyTextTheme;
  $alignment?: TextAlignment;
}

const StyledPrettyText = styled.span<IStyledPrettyTextProps>`
  ${(props: IStyledPrettyTextProps): string => themeToCss(props.$theme.normal.default.text)};
  ${(props: IStyledPrettyTextProps): string => (props.$alignment ? `text-align: ${props.$alignment}` : '')};
  /* NOTE(krishan711): margin needs to be reset as it doesn't work if there are multiple children (coming from MarkdownText) so needs to be set */
  & > p {
    ${(props: IStyledPrettyTextProps): string => (props.$theme.normal.default.text.margin ? `margin: ${props.$theme.normal.default.text.margin}` : '')};
  }
  & > em {
    display: inline;
    ${(props: IStyledPrettyTextProps): string => themeToCss(props.$theme.normal.emphasis?.text)};
  }
  & > strong {
    display: inline;
    ${(props: IStyledPrettyTextProps): string => themeToCss(props.$theme.normal.strong?.text)};
  }
`;

export interface IPrettyTextProps extends IComponentProps<IPrettyTextTheme>, IMultiAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
}

export const PrettyText = (props: IPrettyTextProps): React.ReactElement => {
  console.log('props.variant', props.variant);
  console.log('props.theme', props.theme);
  const theme = useBuiltTheme('prettyTexts', props.variant, props.theme);
  console.log('theme', theme);
  return (
    <StyledPrettyText
      id={props.id}
      className={getClassName(PrettyText.displayName, props.className)}
      $theme={theme}
      $alignment={props.alignment}
      as={props.tag || getTextTag(props.variant)}
    >
      { props.children }
    </StyledPrettyText>
  );
};

PrettyText.displayName = 'PrettyText';
PrettyText.defaultProps = {
  ...defaultComponentProps,
};
