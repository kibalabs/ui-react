import React from 'react';

import ReactDOM from 'react-dom';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, useEventListener, useInterval } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';


export enum Placement {
  bottomLeft = 'bottom-left',
  bottomCenter = 'bottom-center',
  bottomRight = 'bottom-right',
  topLeft = 'top-left',
  topCenter = 'top-center',
  topRight = 'top-right'
}

export function getOffsetTop(rect: DOMRect, vertical: number | string): number {
  let offset = 0;
  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }
  return offset;
}

export function getOffsetLeft(rect: DOMRect, horizontal: number | string): number {
  let offset = 0;
  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }
  return offset;
}

export interface IPortalProps extends IComponentProps, ISingleAnyChildProps {
  anchorElement: React.RefObject<HTMLDivElement | null>;
  placement: Placement | string;
  positionTop?: number;
  positionLeft?: number;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  shouldMatchAnchorWidth?: boolean;
  shouldMatchAnchorHeight?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const Portal = ({
  className = '',
  variant = 'default',
  isScrollableVertically = true,
  isScrollableHorizontally = true,
  ...props
}: IPortalProps): React.ReactElement => {
  const [positionTop, setPositionTop] = React.useState<number>(props.positionTop || 0);
  const [positionLeft, setPositionLeft] = React.useState<number>(props.positionLeft || 0);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const [anchorHeight, setAnchorHeight] = React.useState<number>(0);
  const [anchorWidth, setAnchorWidth] = React.useState<number>(0);
  const updateSizes = React.useCallback((): void => {
    const anchorElementNodeRect = props.anchorElement?.current?.getBoundingClientRect();
    if (!anchorElementNodeRect) {
      return;
    }
    setPositionTop(anchorElementNodeRect.top + getOffsetTop(anchorElementNodeRect, props.placement.split('-')[0]));
    setMaxHeight(window.innerHeight - anchorElementNodeRect.top - getOffsetTop(anchorElementNodeRect, props.placement.split('-')[0]));
    setPositionLeft(anchorElementNodeRect.left + getOffsetLeft(anchorElementNodeRect, props.placement.split('-')[1]));
    setMaxWidth(window.innerWidth - anchorElementNodeRect.left - getOffsetLeft(anchorElementNodeRect, props.placement.split('-')[1]));
    setAnchorHeight(anchorElementNodeRect.height);
    setAnchorWidth(anchorElementNodeRect.width);
  }, [props.anchorElement, props.placement]);
  useEventListener(window, 'resize', (): void => {
    updateSizes();
  });
  useInterval(1, (): void => {
    updateSizes();
  }, true);
  React.useEffect((): void => {
    updateSizes();
  }, [updateSizes]);
  const portalStyles: React.CSSProperties = {
    ...props.style,
    '--kiba-portal-top': `${positionTop}px`,
    '--kiba-portal-left': `${positionLeft}px`,
    '--kiba-portal-max-height': maxHeight ? `${maxHeight}px` : 'none',
    '--kiba-portal-max-width': maxWidth ? `${maxWidth}px` : 'none',
    '--kiba-portal-width': props.shouldMatchAnchorWidth ? `${anchorWidth}px` : 'auto',
    '--kiba-portal-height': props.shouldMatchAnchorHeight ? `${anchorHeight}px` : 'auto',
  } as React.CSSProperties;
  return ReactDOM.createPortal(
    (
      <div
        id={props.id}
        className={getClassName(Portal.displayName, className, isScrollableVertically && 'scrollableVertically', isScrollableHorizontally && 'scrollableHorizontally', ...(variant?.split('-') || []))}
        style={portalStyles}
        ref={props.ref}
      >
        {props.children}
      </div>
    ), window.document.body,
  );
};
Portal.displayName = 'KibaPortal';
