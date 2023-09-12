import React, { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import MarkdownToJsx from 'markdown-to-jsx';

import { Link, PrettyText } from '../../atoms';
import { Box, Media, TextAlignment } from '../../particles';
import { getVariant } from '../../util';

const MarkdownParagraph = (props: AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  const childrenDisplayNames = React.Children.map(props.children, (child: React.ReactNode): string | null => (
    // @ts-expect-error: Property 'displayName' does not exist on type
    (child && typeof child === 'object' && 'type' in child) ? String(child.type.displayName).split('-')[0] : null
  )) || [];
  const isCaption = childrenDisplayNames.indexOf('MarkdownMedia') >= 0;

  if (isCaption) {
    return (
      <span style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        {props.children}
        <PrettyText
          variant={getVariant('paragraph', 'note')}
          alignment={TextAlignment.Center}
        />
      </span>
    );
  }
  return (
    <PrettyText
      variant={getVariant('paragraph')}
      alignment={TextAlignment.Left}
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

export interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootBoxVariant?: string;
  extraOverrideComponents?: Record<string, React.ElementType>;
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
            ...(props.extraOverrideComponents || {}),
          },
        }}
      >
        {props.source}
      </MarkdownToJsx>
    </Box>
  );
}, deepCompare);

Markdown.displayName = 'KibaMarkdown';
