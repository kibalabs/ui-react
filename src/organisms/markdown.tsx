import React from 'react';

import { getClassName } from '@kibalabs/core';
import ReactMarkdown from 'react-markdown';

import { Box, Media, PrettyText, TextAlignment } from '..';

interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootBoxVariant?: string;
}

export const Markdown = (props: IMarkdownProps): React.ReactElement => {
  const shouldAllowNode = (node: ReactMarkdown.MarkdownAbstractSyntaxTree, index: number, parent: ReactMarkdown.NodeType): boolean => {
    if (node.type === 'paragraph') {
      if (parent.children.length === 1) {
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

  const renderers: ReactMarkdown.Renderers = {
    // TODO(krish): this should use pretty text eventually
    // NOTE(krish): full list here: https://github.com/rexxars/react-markdown/blob/master/src/renderers.js
    root: (rendererProps: Record<string, unknown>): React.ReactElement => {
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
    image: (rendererProps: Record<string, unknown>): React.ReactElement => {
      return <Media isCenteredHorizontally={true} source={rendererProps.src} alternativeText={rendererProps.alt}/>;
    },
    paragraph: (rendererProps: Record<string, unknown>): React.ReactElement => {
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
      const isCaption = childrenKeys.indexOf('image') > -1;
      return (<PrettyText variant='paragraph' alignment={isCaption ? TextAlignment.Center : TextAlignment.Left}>{rendererProps.children}</PrettyText>);
    },
    heading: (rendererProps: Record<string, unknown>): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    emphasis: (rendererProps: Record<string, unknown>): React.ReactElement => {
      return <PrettyText variant='emphasis'>{rendererProps.children}</PrettyText>;
    },
    strong: (rendererProps: Record<string, unknown>): React.ReactElement => {
      return <PrettyText variant='strong'>{rendererProps.children}</PrettyText>;
    },
  };

  return (
    <ReactMarkdown
      id={props.id}
      className={getClassName(Markdown.displayName, props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      renderers={renderers}
      includeNodeIndex={true}
      source={props.source}
    />
  );
};

Markdown.displayName = 'Markdown';
Markdown.defaultProps = {
  className: '',
};
