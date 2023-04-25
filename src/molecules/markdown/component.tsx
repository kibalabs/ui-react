import React, { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import MarkdownToJsx from 'markdown-to-jsx';

import { Link, PrettyText } from '../../atoms';
import { Box, Media, TextAlignment } from '../../particles';
import { getVariant } from '../../util';

const MarkdownParagraph = (props: AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  const childrenDisplayNames = React.Children.map(props.children, (child: React.ReactNode): string | null => (
    (child && typeof child === 'object' && 'type' in child) ? String(child.type.displayName).split('-')[0] : null
  )) || [];
  const isCaption = childrenDisplayNames.indexOf('MarkdownMedia') >= 0;
  return (
    <PrettyText
      variant={getVariant('paragraph', isCaption && 'note')}
      alignment={isCaption ? TextAlignment.Center : TextAlignment.Left}
    >
      {props.children}
    </PrettyText>
  );
};

const MarkdownLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  return (
    <Link
      target={props.href || '#'}
      text={String(React.Children.toArray(props.children)[0]) || ''}
    />
  );
};

const MarkdownMedia = (props: ImgHTMLAttributes<HTMLImageElement>): React.ReactElement => {
  return (
    <Media
      maxWidth='100%'
      isCenteredHorizontally={true}
      source={props.src || ''}
      alternativeText={props.alt || ''}
    />
  );
};

interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootBoxVariant?: string;
}

export const Markdown = React.memo((props: IMarkdownProps): React.ReactElement => {
  return (
    <Box
      id={props.id}
      className={getClassName(Markdown.displayName, props.className)}
      variant={props.rootBoxVariant}
    >
      <MarkdownToJsx
        options={{
          forceWrapper: true,
          wrapper: React.Fragment,
          overrides: {
            a: { component: MarkdownLink },
            img: { component: MarkdownMedia },
            p: { component: MarkdownParagraph },
            h1: {
              component: PrettyText,
              props: {
                variant: 'header1',
              },
            },
            h2: {
              component: PrettyText,
              props: {
                variant: 'header2',
              },
            },
            h3: {
              component: PrettyText,
              props: {
                variant: 'header3',
              },
            },
            h4: {
              component: PrettyText,
              props: {
                variant: 'header4',
              },
            },
            h5: {
              component: PrettyText,
              props: {
                variant: 'header5',
              },
            },
            h6: {
              component: PrettyText,
              props: {
                variant: 'header6',
              },
            },
          },
        }}
      >
        {props.source}
      </MarkdownToJsx>
    </Box>
  );
}, deepCompare);

Markdown.displayName = 'KibaMarkdown';
