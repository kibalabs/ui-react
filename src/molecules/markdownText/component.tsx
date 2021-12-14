import React from 'react';

import { deepCompare, getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';
import { Element, ElementContent, Root, RootContent } from 'hast';
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

export const MarkdownText = React.memo((props: IMarkdownTextProps): React.ReactElement => {
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

  // TODO(krishan711): what should this check? It cant run the below check cos would fail for markdown like: "**Hello** world"
  // const childrenKeys = React.Children.map(rendererProps.children, (child: React.ReactElement): string => String(child.key).split('-')[0]);
  // if (React.Children.count(rendererProps.children) > 1 && childrenKeys[0] !== 'text') {
  //   throw new Error('MarkdownText only supports having one text child!')
  // }
  const components: ReactMarkdownTypes.Renderers = {
    a: (rendererProps: {href: string} & RendererProps): React.ReactElement => {
      if (React.Children.count(rendererProps.children) > 1) {
        console.error(`Link in markdown has more than one child: ${rendererProps.children}`);
      }
      return <Link target={rendererProps.href} text={String(React.Children.toArray(rendererProps.children)[0])} />;
    },
    em: (rendererProps: RendererProps): React.ReactElement => {
      return <em>{rendererProps.children}</em>;
    },
    strong: (rendererProps: RendererProps): React.ReactElement => {
      return <strong>{rendererProps.children}</strong>;
    },
  };

  return (
    <PrettyText
      id={props.id}
      className={getClassName(MarkdownText.displayName, props.className)}
      variant={mergeVariants(props.textVariant, 'unmargined')}
      tag={props.textTag}
      alignment={props.textAlignment}
    >
      <ReactMarkdown
        allowElement={shouldAllowElement}
        unwrapDisallowed={true}
        components={components}
        includeElementIndex={true}
      >
        {props.source}
      </ReactMarkdown>
    </PrettyText>
  );
}, deepCompare);

MarkdownText.displayName = 'MarkdownText';
