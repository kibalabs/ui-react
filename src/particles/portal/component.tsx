import React from 'react';

import ReactDOM from 'react-dom';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IPortalTheme } from './theme';
import { defaultComponentProps, IComponentProps, themeToCss, useBuiltTheme } from '../..';

interface IStyledPortalProps {
  $theme: IPortalTheme;
  $positionTop: number;
  $positionLeft: number;
}

const StyledPortal = styled.div<IStyledPortalProps>`
  position: absolute;
  display: block;
  z-index: 999;
  top: ${(props: IStyledPortalProps): string => `${props.$positionTop}px`};
  left: ${(props: IStyledPortalProps): string => `${props.$positionLeft}px`};
  ${(props: IStyledPortalProps): string => themeToCss(props.$theme.background)};
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
}

export const Portal = React.forwardRef((props: IPortalProps, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement => {
  const theme = useBuiltTheme('portals', props.variant, props.theme);
  const [positionTop, setPositionTop] = React.useState<number>(props.positionTop || 0);
  const [positionLeft, setPositionLeft] = React.useState<number>(props.positionLeft || 0);

  const updateSizes = React.useCallback((): void => {
    const anchorElementNodeRect = props.anchorElement?.current?.getBoundingClientRect();
    if (!anchorElementNodeRect) {
      return;
    }

    setPositionTop(anchorElementNodeRect.top + getOffsetTop(anchorElementNodeRect, props.placement.split('-')[0]));
    setPositionLeft(anchorElementNodeRect.left + getOffsetLeft(anchorElementNodeRect, props.placement.split('-')[1]));
  }, [props.anchorElement, props.placement]);

  useEventListener(window, 'resize', (): void => {
    updateSizes();
  });

  React.useEffect((): void => {
    updateSizes();
  }, [updateSizes]);

  return ReactDOM.createPortal(
    (
      <StyledPortal
        id={props.id}
        className={getClassName(Portal.displayName, props.className)}
        $theme={theme}
        $positionTop={positionTop}
        $positionLeft={positionLeft}
        ref={ref}
      >
        {props.children}
      </StyledPortal>
    ), window.document.body,
  );
});

Portal.displayName = 'Portal';
Portal.defaultProps = {
  ...defaultComponentProps,
};
