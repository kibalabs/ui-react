import React from 'react';

import { generateUUID } from '@kibalabs/core';
import { flattenChildren, IMultiAnyChildProps, useDeepCompareEffect } from '@kibalabs/core-react';

interface IHeadTag {
  type: string;
  attributes: Record<string, string>;
  content: string | null;
  headId: string;
}

// NOTE(krishan711): can everything that's not title and base be merged?
interface IHead {
  base: IHeadTag | null,
  title: IHeadTag | null,
  links: IHeadTag[],
  metas: IHeadTag[],
  styles: IHeadTag[],
  scripts: IHeadTag[],
  noscripts: IHeadTag[],
}

const getHeadTag = (element: React.ReactElement, headId: string): IHeadTag => {
  const { children: nestedChildren, ...props } = element.props;
  return {
    type: String(element.type),
    attributes: props,
    headId,
    content: nestedChildren ? String(nestedChildren) : null,
  };
};

const convertChildrenToHead = (children: React.ReactNode | React.ReactNode[], headId: string): IHead => {
  const flattenedChildren = flattenChildren(children).filter((child: React.ReactChild): boolean => React.isValidElement(child)) as React.ReactElement[];
  const titleElement = flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'title').shift();
  const baseElement = flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'base').shift();
  const head: IHead = {
    title: titleElement ? getHeadTag(titleElement, headId) : null,
    base: baseElement ? getHeadTag(baseElement, headId) : null,
    links: flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'link').map((child: React.ReactElement): IHeadTag => getHeadTag(child, headId)),
    metas: flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'meta').map((child: React.ReactElement): IHeadTag => getHeadTag(child, headId)),
    styles: flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'style').map((child: React.ReactElement): IHeadTag => getHeadTag(child, headId)),
    scripts: flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'script').map((child: React.ReactElement): IHeadTag => getHeadTag(child, headId)),
    noscripts: flattenedChildren.filter((child: React.ReactElement): boolean => child.type === 'noscript').map((child: React.ReactElement): IHeadTag => getHeadTag(child, headId)),
  };
  return head;
};

const mergeHeads = (heads: IHead[]): IHead => {
  const mergedHead: IHead = { title: null, base: null, links: [], metas: [], styles: [], scripts: [], noscripts: [] };
  mergedHead.title = heads.reduce((current: IHeadTag | null, head: IHead): IHeadTag | null => {
    return head.title ?? current;
  }, null);
  mergedHead.base = heads.reduce((current: IHeadTag | null, head: IHead): IHeadTag | null => {
    return head.base ?? current;
  }, null);
  // NOTE(krishan711): it may be worth doing some de-duplicating here
  mergedHead.links = heads.reduce((current: IHeadTag[], head: IHead): IHeadTag[] => {
    return head.links ? current.concat(head.links) : current;
  }, []);
  mergedHead.metas = heads.reduce((current: IHeadTag[], head: IHead): IHeadTag[] => {
    return head.metas ? current.concat(head.metas) : current;
  }, []);
  mergedHead.styles = heads.reduce((current: IHeadTag[], head: IHead): IHeadTag[] => {
    return head.styles ? current.concat(head.styles) : current;
  }, []);
  mergedHead.scripts = heads.reduce((current: IHeadTag[], head: IHead): IHeadTag[] => {
    return head.scripts ? current.concat(head.scripts) : current;
  }, []);
  mergedHead.noscripts = heads.reduce((current: IHeadTag[], head: IHead): IHeadTag[] => {
    return head.noscripts ? current.concat(head.noscripts) : current;
  }, []);
  return mergedHead;
};

export const createElement = (type: string, headId: string): Element => {
  const element = document.createElement(type);
  element.setAttribute('ui-react-head', headId);
  return element;
};

export const resolveElementsAndTags = (elements: Element[], tags: IHeadTag[], elementsToRemove: Set<Element>, tagsToAdd: Set<IHeadTag>): void => {
  elements.forEach((element: Element): void => { elementsToRemove.add(element); });
  tags.forEach((tag: IHeadTag): void => {
    tagsToAdd.add(tag);
    elements.forEach((element: Element): void => {
      const hasMatchingHeadId = element.getAttribute('ui-react-head') === tag.headId;
      const hasMatchingAttributes = Object.keys(tag.attributes).reduce((current: boolean, attributeKey: string): boolean => {
        return current && element.getAttribute(attributeKey) === tag.attributes[attributeKey];
      }, true);
      if (hasMatchingHeadId && hasMatchingAttributes) {
        elementsToRemove.delete(element);
        tagsToAdd.delete(tag);
      }
    });
  });
};

interface IHeadRoot {
  addHead: (head: IHead) => void;
  removeHead: (head: IHead) => void;
  refresh: () => void;
}

export const HeadRootContext = React.createContext<IHeadRoot | null>(null);

export interface IHeadRootProviderProps extends IMultiAnyChildProps {
  setHead?: (head: IHead) => void;
}

export const HeadRootProvider = (props: IHeadRootProviderProps): React.ReactElement => {
  const headsRef = React.useRef<IHead[]>([]);
  const setHead = props.setHead;

  const refresh = React.useCallback((): void => {
    const mergedHead = mergeHeads(headsRef.current);
    if (setHead) {
      setHead(mergedHead);
    } else if (typeof document === 'undefined') {
      console.error('No setHead provided to HeadRootProvider and no document to edit so Heads are being ignored.');
      return;
    }
    if (mergedHead.title && document.title !== mergedHead.title.content) {
      let titleElement = document.querySelector('title') as Element | undefined;
      if (!titleElement) {
        titleElement = createElement('title', mergedHead.title.headId);
      }
      titleElement.textContent = mergedHead.title.content;
    }
    if (mergedHead.base && document.baseURI !== mergedHead.base.content) {
      let baseElement = document.querySelector('base') as Element | undefined;
      if (!baseElement) {
        baseElement = createElement('base', mergedHead.base.headId);
      }
      baseElement.textContent = mergedHead.base.content;
    }
    const elementsToRemove = new Set<Element>();
    const tagsToAdd = new Set<IHeadTag>();
    const linkElements = Array.from(document.head.querySelectorAll('link[ui-react-head]'));
    resolveElementsAndTags(linkElements, mergedHead.links, elementsToRemove, tagsToAdd);
    const metaElements = Array.from(document.head.querySelectorAll('meta[ui-react-head]'));
    resolveElementsAndTags(metaElements, mergedHead.metas, elementsToRemove, tagsToAdd);
    const styleElements = Array.from(document.head.querySelectorAll('style[ui-react-head]'));
    resolveElementsAndTags(styleElements, mergedHead.styles, elementsToRemove, tagsToAdd);
    const scriptElements = Array.from(document.head.querySelectorAll('script[ui-react-head]'));
    resolveElementsAndTags(scriptElements, mergedHead.scripts, elementsToRemove, tagsToAdd);
    const noscriptElements = Array.from(document.head.querySelectorAll('noscript[ui-react-head]'));
    resolveElementsAndTags(noscriptElements, mergedHead.noscripts, elementsToRemove, tagsToAdd);
    tagsToAdd.forEach((headTag: IHeadTag): void => {
      const tagElement = createElement(headTag.type, headTag.headId);
      Object.keys(headTag.attributes).forEach((attributeKey: string): void => {
        tagElement.setAttribute(attributeKey, headTag.attributes[attributeKey]);
      });
      document.head.appendChild(tagElement);
    });
    elementsToRemove.forEach((tag: Element): void => {
      tag.parentNode?.removeChild(tag);
    });
  }, [setHead, headsRef]);

  const addHead = React.useCallback((head: IHead): void => {
    headsRef.current.push(head);
    refresh();
  }, [headsRef, refresh]);

  const removeHead = React.useCallback((head: IHead): void => {
    headsRef.current = headsRef.current.filter((currentHead: IHead): boolean => currentHead !== head);
    refresh();
  }, [headsRef, refresh]);

  return (
    <HeadRootContext.Provider value={{ addHead, removeHead, refresh }}>
      {props.children}
    </HeadRootContext.Provider>
  );
};

export function useHeadRoot(): IHeadRoot {
  const headRoot = React.useContext(HeadRootContext);
  if (!headRoot) {
    throw Error('No headRoot has been set!');
  }
  return headRoot;
}

// Head Component

interface IHeadProps extends IMultiAnyChildProps {
  headId?: string;
}

export const Head = (props: IHeadProps): React.ReactElement | null => {
  const headRoot = useHeadRoot();
  const headId = React.useMemo((): string => props.headId || generateUUID(), [props.headId]);
  const headRef = React.useRef<IHead>({ title: null, base: null, links: [], metas: [], styles: [], scripts: [], noscripts: [] });

  React.useEffect((): (() => void) => {
    headRoot.addHead(headRef.current);
    const head = headRef.current;
    return ((): void => {
      headRoot.removeHead(head);
    });
  }, [headId, headRef, headRoot]);

  useDeepCompareEffect((): void => {
    const newHead = convertChildrenToHead(props.children, headId);
    headRef.current.title = newHead.title;
    headRef.current.base = newHead.base;
    headRef.current.links = newHead.links;
    headRef.current.metas = newHead.metas;
    headRef.current.styles = newHead.styles;
    headRef.current.scripts = newHead.scripts;
    headRef.current.noscripts = newHead.noscripts;
    headRoot.refresh();
  }, [props.children, headId, headRoot]);

  return null;
};
