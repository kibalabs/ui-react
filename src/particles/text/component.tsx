import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { ResponsiveField } from '../../util';


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

export interface ITextProps extends IComponentProps, ISingleAnyChildProps {
  alignment?: TextAlignment;
  alignmentResponsive?: ResponsiveField<TextAlignment>;
  tag?: TextTag;
  lineLimit?: number;
  shouldBreakOnWords?: boolean;
  shouldBreakAnywhere?: boolean;
  style?: React.CSSProperties;
}

export function Text({
  className = '',
  variant = 'default',
  ...props
}: ITextProps): React.ReactElement {
  let lineLimit = props.lineLimit;
  if (props.lineLimit && props.lineLimit <= 0) {
    console.error('The lineLimit prop should be a positive integer');
    lineLimit = undefined;
  }
  const shouldBreakOnWords = props.shouldBreakOnWords === true || props.shouldBreakOnWords === undefined;
  const TagComponent = (props.tag || getTextTag(variant)) as React.ElementType;
  const dynamicStyle: React.CSSProperties = {
    ...props.style,
    ...(lineLimit ? { WebkitLineClamp: lineLimit } : {}),
    ...(shouldBreakOnWords ? { wordBreak: 'break-word' as const } : {}),
    ...(props.shouldBreakAnywhere ? { wordBreak: 'break-all' as const } : {}),
    ...(props.alignment ? { textAlign: props.alignment } : {}),
  };
  return (
    <TagComponent
      id={props.id}
      className={getClassName(Text.displayName, className, lineLimit && lineLimit === 1 && 'singleLine', lineLimit && lineLimit >= 2 && 'fixedLines', ...(variant?.split('-') || []))}
      style={dynamicStyle}
    >
      { props.children }
    </TagComponent>
  );
}
Text.displayName = 'KibaText';
