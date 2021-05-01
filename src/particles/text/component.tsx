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
  theme: ITextTheme;
  alignment?: TextAlignment;
  clipToLines?: number;
}

const StyledText = styled.span<IStyledTextProps>`
  ${(props: IStyledTextProps): string => themeToCss(props.theme)};
  ${(props: IStyledTextProps): string => (props.alignment ? `text-align: ${props.alignment}` : '')};

  &.singleLine {
    white-wrap: nowrap;
    text-overflow: ellipses;
    overflow: hidden;
  }

  &.fixedLines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    ${(props: IStyledTextProps): string => (props.clipToLines ? `-webkit-line-clamp: ${props.clipToLines};` : '')}
    overflow: hidden;
  }
`;

export interface ITextProps extends IComponentProps<ITextTheme>, ISingleAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
  clipToLines?: number;
}

export const Text = (props: ITextProps): React.ReactElement => {
  const theme = useBuiltTheme('texts', props.variant, props.theme);

  let clipToLines = props.clipToLines;
  if (props.clipToLines && props.clipToLines <= 0) {
    console.error('The clipToLines prop should be a positive integer');
    clipToLines = undefined;
  }

  return (
    <StyledText
      id={props.id}
      className={getClassName(Text.displayName, props.className, clipToLines && clipToLines === 1 && 'singleLine', clipToLines && clipToLines >= 2 && 'fixedLines')}
      theme={theme}
      alignment={props.alignment}
      clipToLines={clipToLines}
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
