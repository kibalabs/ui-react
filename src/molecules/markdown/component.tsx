import React from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import MarkdownToJsx from 'markdown-to-jsx';

import { BulletList, BulletText, Link, PrettyText } from '../../atoms';
import { Box, Media, TextAlignment } from '../../particles';
import { getVariant } from '../../util';

const MarkdownParagraph = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  const childrenDisplayNames = React.Children.map(props.children, (child: React.ReactNode): string | null => (
    // @ts-expect-error: Property 'displayName' does not exist on type
    (child && typeof child === 'object' && 'type' in child) ? String(child.type.displayName).split('-')[0] : null
  )) || [];
  const isCaption = childrenDisplayNames.indexOf('MarkdownMedia') >= 0;

  if (isCaption) {
    return (
      <span style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
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
MarkdownParagraph.displayName = 'MarkdownParagraph';

const MarkdownLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => {
  return (
    <Link
      target={props.href || '#'}
      text={String(React.Children.toArray(props.children)[0]) || ''}
    />
  );
};
MarkdownLink.displayName = 'MarkdownLink';

const MarkdownMedia = (props: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement => {
  return (
    <Media
      maxWidth='100%'
      isCenteredHorizontally={true}
      source={props.src || ''}
      alternativeText={props.alt || ''}
    />
  );
};
MarkdownMedia.displayName = 'MarkdownMedia';

const MarkdownBulletList = (props: React.OlHTMLAttributes<HTMLUListElement>): React.ReactElement => {
  return (
    <BulletList>
      {/* @ts-expect-error */}
      {props.children}
    </BulletList>
  );
};
MarkdownBulletList.displayName = 'MarkdownBulletList';

const MarkdownBulletText = (props: React.LiHTMLAttributes<HTMLLIElement>): React.ReactElement => {
  const childrenDisplayNames = React.Children.map(props.children, (child: React.ReactNode): string | null => (
    // @ts-expect-error: Property 'displayName' does not exist on type
    (child && typeof child === 'object' && 'type' in child) ? String(child.type.displayName).split('-')[0] : null
  )) || [];
  if (React.Children.count(props.children) === 1 && childrenDisplayNames[0] === 'MarkdownParagraph') {
    return (
      // @ts-expect-error
      <BulletText text={React.Children.toArray(props.children)[0].props.children[0]} />
    );
  }
  return (
    // @ts-expect-error
    <BulletText>{props.children}</BulletText>
  );
};
MarkdownBulletText.displayName = 'MarkdownBulletText';


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
            ul: { component: MarkdownBulletList },
            li: { component: MarkdownBulletText },
            u: { component: PrettyText, props: { variant: 'underline' } },
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
