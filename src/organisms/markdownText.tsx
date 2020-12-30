import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import { Content as MarkdownAST } from 'mdast';
import ReactMarkdown from 'react-markdown';

import { Link, TextAlignment, TextTag } from '..';
import { PrettyText } from '../atoms/prettyText/component';
import { ReactMarkdownTypes } from './reactMarkdown';

interface IMarkdownTextProps {
  id?: string;
  className?: string;
  source: string;
  textAlignment?: TextAlignment;
  textVariant?: string;
  textTag?: TextTag;
}

export const MarkdownText = (props: IMarkdownTextProps): React.ReactElement => {
  const shouldAllowNode = (node: MarkdownAST, index: number, parent: ReactMarkdown.NodeType): boolean => {
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

  const mergeVariants = (...variants: (string | undefined | null)[]): string => {
    const values = variants.reduce((current: string[], value: string | undefined | null): string[] => {
      if (value) {
        current.push(String(value).trim());
      }
      return current;
    }, []);
    return values.join('-');
  };

  /* eslint-disable react/display-name */
  const renderers: ReactMarkdownTypes.Renderers = {
    root: (rendererProps: {className?: string} & IMultiAnyChildProps): React.ReactElement => {
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
    link: (rendererProps: {href: string} & IMultiAnyChildProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      // @ts-ignore
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)}/>;
    },
    linkReference: (rendererProps: {href: string} & IMultiAnyChildProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      // @ts-ignore
      return <Link target={rendererProps.href} text={String(rendererProps.children[0].props.children)}/>;
    },
    emphasis: (rendererProps: IMultiAnyChildProps): React.ReactElement => {
      return <em>{rendererProps.children}</em>;
    },
    strong: (rendererProps: IMultiAnyChildProps): React.ReactElement => {
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
      children={props.source.replace(/\n/g, '<br/>')}
    />
  );
};

MarkdownText.displayName = 'MarkdownText';
MarkdownText.defaultProps = {
  className: '',
};
