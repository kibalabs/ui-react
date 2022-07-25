import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { defaultComponentProps, IComponentProps } from '../../model';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { ITextTheme } from './theme';

export enum TextAlignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justify = 'justify',
}

export type TextTag = 'p' | 'span' | 'h1' | 'h1' | 'h2' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6' | 'b' | 'strong' | 'i' | 'em' | 'mark' | 'small' | 'del' | 'ins' | 'sub' | 'sup';

const styleVariantTagMapping: Record<string, TextTag> = {
  bold: 'b',
  strong: 'strong',
  italic: 'i',
  emphasis: 'em',
  mark: 'mark',
  small: 'small',
  deleted: 'del',
  inserted: 'ins',
  subscript: 'sub',
  superscript: 'sup',
};

const textVariantTagMapping: Record<string, TextTag> = {
  paragraph: 'p',
  inline: 'span',
  header1: 'h1',
  header: 'h1',
  header2: 'h2',
  title: 'h2',
  header3: 'h3',
  subtitle: 'h3',
  header4: 'h4',
  header5: 'h5',
  header6: 'h6',
};

export const getTextTag = (variant?: string): TextTag => {
  if (!variant) {
    return 'span';
  }
  const textVariants = variant.split('-').reduce((current: TextTag[], value: string): TextTag[] => {
    if (value in textVariantTagMapping) {
      current.push(textVariantTagMapping[value]);
    }
    if (value in styleVariantTagMapping) {
      current.push(styleVariantTagMapping[value]);
    }
    return current;
  }, []);
  return textVariants.length > 0 ? textVariants[textVariants.length - 1] : 'span';
};

interface IStyledTextProps {
  $theme: ITextTheme;
  $alignment?: TextAlignment;
  $lineLimit?: number;
  $shouldBreakOnWords?: boolean;
  $shouldBreakAnywhere?: boolean;
}

const StyledText = styled.span<IStyledTextProps>`
  ${(props: IStyledTextProps): string => themeToCss(props.$theme)};
  ${(props: IStyledTextProps): string => (props.$alignment ? `text-align: ${props.$alignment}` : '')};
  ${(props: IStyledTextProps): string => (props.$shouldBreakOnWords ? `word-break: break-word` : '')};
  ${(props: IStyledTextProps): string => (props.$shouldBreakAnywhere ? `word-break: break-all` : '')};

  &.singleLine {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  // NOTE(krishan711): fixedLines class is not supported in IE11
  &.fixedLines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${(props: IStyledTextProps): string => String(props.$lineLimit)};
    overflow: hidden;
  }
`;

export interface ITextProps extends IComponentProps<ITextTheme>, ISingleAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
  lineLimit?: number;
  shouldBreakOnWords?: boolean;
  shouldBreakAnywhere?: boolean;
}

export const Text = (props: ITextProps): React.ReactElement => {
  const theme = useBuiltTheme('texts', props.variant, props.theme);

  let lineLimit = props.lineLimit;
  if (props.lineLimit && props.lineLimit <= 0) {
    console.error('The lineLimit prop should be a positive integer');
    lineLimit = undefined;
  }

  return (
    <StyledText
      id={props.id}
      className={getClassName(Text.displayName, props.className, lineLimit && lineLimit === 1 && 'singleLine', lineLimit && lineLimit >= 2 && 'fixedLines')}
      $theme={theme}
      $alignment={props.alignment}
      $lineLimit={lineLimit}
      $shouldBreakOnWords={props.shouldBreakOnWords}
      $shouldBreakAnywhere={props.shouldBreakAnywhere}
      as={props.tag || getTextTag(props.variant)}
    >
      { props.children }
    </StyledText>
  );
};

Text.displayName = 'Text';
Text.defaultProps = {
  ...defaultComponentProps,
  isSingleLine: false,
};
