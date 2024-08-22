import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IPrettyTextTheme } from './theme';
import {IComponentProps } from '../../model';
import { getTextTag, TextAlignment, TextTag } from '../../particles/text';
import { propertyToCss, themeToCss } from '../../util';

export const PrettyTextThemedStyle = (theme: RecursivePartial<IPrettyTextTheme>): string => `
  ${themeToCss(theme?.normal?.default?.text)};
  /* NOTE(krishan711): margin needs to be reset as it doesn't work if there are multiple children (coming from MarkdownText) so needs to be set */
  & > p {
    ${propertyToCss('margin', theme?.normal?.default?.text?.margin)};
  }
  & > em {
    display: inline;
    ${themeToCss(theme?.normal?.emphasis?.text)};
  }
  & > strong {
    display: inline;
    ${themeToCss(theme?.normal?.strong?.text)};
  }
  `;

interface IStyledPrettyTextProps {
  $theme?: RecursivePartial<IPrettyTextTheme>;
  $alignment?: TextAlignment;
}

const StyledPrettyText = styled.span<IStyledPrettyTextProps>`
  ${(props: IStyledPrettyTextProps): string => propertyToCss('text-align', props.$alignment)};

  &&&& {
    ${(props: IStyledPrettyTextProps): string => (props.$theme ? PrettyTextThemedStyle(props.$theme) : '')};
  }
`;

export interface IPrettyTextProps extends IComponentProps<IPrettyTextTheme>, IMultiAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
}

export function PrettyText({
  className = '',
  variant = 'default',
  ...props
}: IPrettyTextProps): React.ReactElement {
  const theme = React.useMemo((): RecursivePartial<IPrettyTextTheme> => {
    const currentTheme = (props.theme || {}) as RecursivePartial<IPrettyTextTheme>;
    if (props.alignment) {
      currentTheme.normal = currentTheme.normal || {};
      currentTheme.normal.default = currentTheme.normal.default || {};
      currentTheme.normal.default.text = currentTheme.normal.default.text || {};
      currentTheme.normal.default.text['text-align'] = props.alignment;
    }
    return currentTheme;
  }, [props.theme, props.alignment]);

  return (
    <StyledPrettyText
      id={props.id}
      className={getClassName(PrettyText.displayName, className, ...(variant?.split('-') || []))}
      $theme={theme}
      $alignment={props.alignment}
      as={props.tag || getTextTag(variant)}
    >
      { props.children }
    </StyledPrettyText>
  );
}
PrettyText.displayName = 'KibaPrettyText';
