import React from 'react';

import ReactDOM from 'react-dom';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps, useEventListener, useInterval } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { IPortalTheme } from './theme';
import { IComponentProps } from '../../model';
import { propertyToCss, themeToCss } from '../../util';

export const PortalThemedStyle = (theme: RecursivePartial<IPortalTheme>): string => `
  ${themeToCss(theme.background)};
`;

interface IStyledPortalProps {
  $theme?: RecursivePartial<IPortalTheme>;
  $positionTop: number;
  $positionLeft: number;
  $maxHeight: string | null;
  $maxWidth: string | null;
  $height: string | null;
  $width: string | null;
}

const StyledPortal = styled.div<IStyledPortalProps>`
  position: absolute;
  display: block;
  z-index: 999;
  overflow: hidden;
  &.scrollableVertically {
    overflow-y: auto;
  }
  &.scrollableHorizontally {
    overflow-x: auto;
  }
  top: ${(props: IStyledPortalProps): string => `${props.$positionTop}px`};
  left: ${(props: IStyledPortalProps): string => `${props.$positionLeft}px`};
  ${(props: IStyledPortalProps): string => (props.$height ? propertyToCss('height', props.$height) : '')};
  ${(props: IStyledPortalProps): string => (props.$width ? propertyToCss('width', props.$width) : '')};
  ${(props: IStyledPortalProps): string => (props.$maxHeight ? propertyToCss('max-height', props.$maxHeight) : '')};
  ${(props: IStyledPortalProps): string => (props.$maxWidth ? propertyToCss('max-width', props.$maxWidth) : '')};
  &&&& {
    ${(props: IStyledPortalProps): string => (props.$theme ? PortalThemedStyle(props.$theme) : '')};
  }
`;

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

export interface IPortalProps extends IComponentProps<IPortalTheme>, ISingleAnyChildProps {
  anchorElement: React.RefObject<HTMLDivElement>;
  placement: Placement | string;
  positionTop?: number;
  positionLeft?: number;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  shouldMatchAnchorWidth?: boolean;
  shouldMatchAnchorHeight?: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
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

  // NOTE(krishan711): this is because the anchor might move on the page. it would be nicer if we could listen to the anchor moving rather than polling
  useInterval(1, (): void => {
    updateSizes();
  }, true);

  React.useEffect((): void => {
    updateSizes();
  }, [updateSizes]);

  return ReactDOM.createPortal(
    (
      <StyledPortal
        id={props.id}
        className={getClassName(Portal.displayName, className, isScrollableVertically && 'scrollableVertically', isScrollableHorizontally && 'scrollableHorizontally', ...(variant?.split('-') || []))}
        $theme={props.theme}
        $positionTop={positionTop}
        $positionLeft={positionLeft}
        $maxHeight={maxHeight ? `${maxHeight}px` : null}
        $maxWidth={maxWidth ? `${maxWidth}px` : null}
        $width={props.shouldMatchAnchorWidth ? `${anchorWidth}px` : null}
        $height={props.shouldMatchAnchorHeight ? `${anchorHeight}px` : null}
        ref={props.ref}
      >
        {props.children}
      </StyledPortal>
    ), window.document.body,
  );
};
Portal.displayName = 'KibaPortal';
