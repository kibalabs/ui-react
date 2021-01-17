import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import { Content as MarkdownAST, Parent } from 'mdast';
import ReactMarkdown from 'react-markdown';

import { Link, PrettyText } from '../../atoms';
import { TextAlignment, TextTag } from '../../particles';
import { mergeVariants } from '../../util';
import { ReactMarkdownTypes } from '../reactMarkdown';

interface IMarkdownTextProps {
  id?: string;
  className?: string;
  source: string;
  textAlignment?: TextAlignment;
  textVariant?: string;
  textTag?: TextTag;
}

interface RendererProps extends IMultiAnyChildProps {
  className?: string;
  index: number;
  parentChildCount: number;
}

export const MarkdownText = (props: IMarkdownTextProps): React.ReactElement => {
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

  /* eslint-disable react/display-name */
  const renderers: ReactMarkdownTypes.Renderers = {
    root: (rendererProps: RendererProps): React.ReactElement => {
      // TODO(krish): what should this check? It cant run the below check cos would fail for markdown like: "**Hello** world"
      // const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
      // if (React.Children.count(rendererProps.children) > 1 && childrenKeys[0] !== 'text') {
      //   throw new Error('MarkdownText only supports having one text child!')
      // }
      return (
        <PrettyText
          id={props.id}
          className={rendererProps.className}
          variant={mergeVariants(props.textVariant, 'unmargined')}
          tag={props.textTag}
          alignment={props.textAlignment}
        >
          {rendererProps.children}
        </PrettyText>
      );
    },
    link: (rendererProps: {href: string} & RendererProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      // @ts-ignore
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)} />;
    },
    linkReference: (rendererProps: {href: string} & RendererProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      // @ts-ignore
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)} />;
    },
    emphasis: (rendererProps: RendererProps): React.ReactElement => {
      return <em>{rendererProps.children}</em>;
    },
    strong: (rendererProps: RendererProps): React.ReactElement => {
      return <strong>{rendererProps.children}</strong>;
    },
  };
  /* eslint-enable react/display-name */

  return (
    <ReactMarkdown
      id={props.id}
      className={getClassName(MarkdownText.displayName, props.className)}
      allowNode={shouldAllowNode}
      unwrapDisallowed={true}
      // @ts-ignore
      renderers={renderers}
      includeNodeIndex={true}
      escapeHtml={false}
    >
      {props.source.replace(/\n/g, '<br/>')}
    </ReactMarkdown>
  );
};

MarkdownText.displayName = 'MarkdownText';
MarkdownText.defaultProps = {
  className: '',
};
