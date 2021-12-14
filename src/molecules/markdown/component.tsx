import React from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import { Element, ElementContent, Root, RootContent } from 'hast';
import ReactMarkdown from 'react-markdown';

import { Link, PrettyText } from '../../atoms';
import { Box, Media, TextAlignment } from '../../particles';
import { ReactMarkdownTypes } from '../reactMarkdown';

interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootBoxVariant?: string;
}

interface RendererProps extends IMultiAnyChildProps {
  className?: string;
  index: number;
  parentChildCount: number;
}

export const Markdown = React.memo((props: IMarkdownProps): React.ReactElement => {
  const shouldAllowElement = (element: Element, index: number, parent: Element | Root): boolean => {
    if (element.tagName === 'p') {
      if (parent.children.filter((child: RootContent | ElementContent): boolean => child.type !== 'text' || child.value !== '\n').length === 1) {
        return false;
      }
      if (element.children.length === 0) {
        return false;
      }
      if (element.children.length === 1 && element.children[0].type !== 'text') {
        return false;
      }
    }
    return true;
  };

  // NOTE(krishan711): full list: https://github.com/remarkjs/react-markdown/#appendix-b-components
  const components: ReactMarkdownTypes.Renderers = {
    img: (rendererProps: { src: string, alt: string } & RendererProps): React.ReactElement => {
      return <Media isCenteredHorizontally={true} source={rendererProps.src} alternativeText={rendererProps.alt} />;
    },
    p: (rendererProps: RendererProps): React.ReactElement => {
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactNode): string | null => (
        (child && typeof child === 'object' && 'key' in child) ? String(child.key).split('-')[0] : null
      )) || [];
      const isCaption = childrenKeys.indexOf('image') > -1;
      return <PrettyText variant='paragraph' alignment={isCaption ? TextAlignment.Center : TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h1: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h2: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h3: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h4: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h5: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    h6: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    a: (rendererProps: {href: string} & RendererProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      return <Link target={rendererProps.href} text={String(React.Children.toArray(rendererProps.children)[0])} />;
    },
    em: (rendererProps: RendererProps): React.ReactElement => {
      if (rendererProps.parentChildCount === 1) {
        return <PrettyText variant='paragraph'><em>{rendererProps.children}</em></PrettyText>;
      }
      return <em>{rendererProps.children}</em>;
    },
    strong: (rendererProps: RendererProps): React.ReactElement => {
      if (rendererProps.parentChildCount === 1) {
        return <PrettyText variant='paragraph'><strong>{rendererProps.children}</strong></PrettyText>;
      }
      return <strong>{rendererProps.children}</strong>;
    },
  };

  return (
    <Box
      id={props.id}
      className={getClassName(Markdown.displayName, props.className)}
      variant={props.rootBoxVariant}
    >
      <ReactMarkdown
        allowElement={shouldAllowElement}
        unwrapDisallowed={true}
        components={components}
        includeElementIndex={true}
      >
        {props.source}
      </ReactMarkdown>
    </Box>
  );
}, deepCompare);

Markdown.displayName = 'Markdown';
