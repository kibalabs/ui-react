import React from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import { Content as MarkdownAST, Parent } from 'mdast';
import ReactMarkdown from 'react-markdown';

import { PrettyText } from '../../atoms';
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
  const shouldAllowNode = (node: MarkdownAST, index: number, parent: ReactMarkdown.NodeType): boolean => {
    if (node.type === 'paragraph') {
      if ((parent as unknown as Parent).children.length === 1) {
        return false;
      }
      if (node.children.length === 0) {
        return false;
      }
      if (node.children.length === 1 && node.children[0].type !== 'text') {
        return false;
      }
    }
    return true;
  };

  const renderers: ReactMarkdownTypes.Renderers = {
    // TODO(krishan711): this should use pretty text eventually
    // NOTE(krishan711): full list here: https://github.com/rexxars/react-markdown/blob/main/src/renderers.js
    root: (rendererProps: RendererProps): React.ReactElement => {
      return (
        <Box
          id={props.id}
          variant={props.rootBoxVariant}
          className={rendererProps.className}
        >
          {rendererProps.children}
        </Box>
      );
    },
    image: (rendererProps: { src: string, alt: string } & RendererProps): React.ReactElement => {
      return <Media isCenteredHorizontally={true} source={rendererProps.src} alternativeText={rendererProps.alt} />;
    },
    paragraph: (rendererProps: RendererProps): React.ReactElement => {
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactNode): string | null => (
        (child && typeof child === 'object' && 'key' in child) ? String(child.key).split('-')[0] : null
      )) || [];
      const isCaption = childrenKeys.indexOf('image') > -1;
      return <PrettyText variant='paragraph' alignment={isCaption ? TextAlignment.Center : TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    heading: (rendererProps: { level: number } & RendererProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    emphasis: (rendererProps: RendererProps): React.ReactElement => {
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
  /* eslint-enable react/display-name */

  return (
    <ReactMarkdown
      id={props.id}
      className={getClassName(Markdown.displayName, props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      // @ts-ignore
      renderers={renderers}
      includeNodeIndex={true}
    >
      {props.source}
    </ReactMarkdown>
  );
}, deepCompare);

Markdown.displayName = 'Markdown';
