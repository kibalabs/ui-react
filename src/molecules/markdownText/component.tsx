import React, { AnchorHTMLAttributes } from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import MarkdownToJsx from 'markdown-to-jsx';

import { Link, PrettyText } from '../../atoms';
import { TextAlignment, TextTag } from '../../particles';
import { getVariant } from '../../util';

const MarkdownLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  return (
    <Link
      target={props.href || '#'}
      text={String(React.Children.toArray(props.children)[0]) || ''}
    />
  );
};

interface IMarkdownTextProps {
  id?: string;
  className?: string;
  source: string;
  textAlignment?: TextAlignment;
  textVariant?: string;
  textTag?: TextTag;
}

export const MarkdownText = React.memo((props: IMarkdownTextProps): React.ReactElement => {
  const content = props.source.replace(/\n\n/g, '\n<br/>').replace(/\n/g, '  \n');

  return (
    <PrettyText
      id={props.id}
      className={getClassName(MarkdownText.displayName, props.className)}
      variant={getVariant(props.textVariant, 'unmargined')}
      tag={props.textTag}
      alignment={props.textAlignment}
    >
      <MarkdownToJsx
        options={{
          forceWrapper: true,
          wrapper: React.Fragment,
          overrides: {
            a: {
              component: MarkdownLink,
            },
          },
        }}
      >
        {content}
      </MarkdownToJsx>
    </PrettyText>
  );
}, deepCompare);

MarkdownText.displayName = 'KibaMarkdownText';
