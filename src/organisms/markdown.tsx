import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Content as MarkdownAST } from 'mdast'
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

import { Box, PrettyText, TextAlignment, Media } from '..';
import { ReactMarkdownTypes } from './reactMarkdown';

interface IMarkdownProps {
  id?: string;
  className?: string;
  source: string;
  rootBoxVariant?: string;
}

export const Markdown = (props: IMarkdownProps): React.ReactElement => {
  const shouldAllowNode = (node: MarkdownAST, index: number, parent: ReactMarkdown.NodeType): boolean => {
    if (node.type === 'paragraph') {
      if (React.Children.count((parent as IMultiAnyChildProps)?.children) === 1) {
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
    // TODO(krish): this should use pretty text eventually
    // NOTE(krish): full list here: https://github.com/rexxars/react-markdown/blob/main/src/renderers.js
    root: (rendererProps: { className?: string } & IMultiAnyChildProps): React.ReactElement => {
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
    image: (rendererProps: { src: string, alt: string }): React.ReactElement => {
      return <Media isCenteredHorizontally={true} source={rendererProps.src} alternativeText={rendererProps.alt}/>;
    },
    paragraph: (rendererProps: IMultiAnyChildProps): React.ReactElement => {
      const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactNode): string | null => (
        (child && typeof child === 'object' && 'key' in child) ? String(child.key).split('-')[0] : null
      )) || [];
      const isCaption = childrenKeys.indexOf('image') > -1;
      return (<PrettyText variant='paragraph' alignment={isCaption ? TextAlignment.Center : TextAlignment.Left}>{rendererProps.children}</PrettyText>);
    },
    heading: (rendererProps: { level: number } & IMultiAnyChildProps): React.ReactElement => {
      return <PrettyText variant={`header${rendererProps.level}`} alignment={TextAlignment.Left}>{rendererProps.children}</PrettyText>;
    },
    emphasis: (rendererProps: IMultiAnyChildProps): React.ReactElement => {
      return <PrettyText variant='emphasis'>{rendererProps.children}</PrettyText>;
    },
    strong: (rendererProps: IMultiAnyChildProps): React.ReactElement => {
      return <PrettyText variant='strong'>{rendererProps.children}</PrettyText>;
    },
  };

  return (
    <ReactMarkdown
      id={props.id}
      className={getClassName(Markdown.displayName, props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      // @ts-ignore
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
