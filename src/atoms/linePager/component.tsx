import React from 'react';

import { getClassName } from '@kibalabs/core';

import './styles.scss';
import { Direction, IComponentProps } from '../../model';
import { ScreenSize, Spacing } from '../../particles';
import { ResponsiveField } from '../../util';
import { ResponsiveHidingView } from '../../wrappers';


interface ILinePagerProps extends IComponentProps {
  pageCount?: number;
  pageCountResponsive?: ResponsiveField<number>;
  activePageIndex: number;
  onPageClicked?(index: number): void;
}

export function LinePager({
  variant = 'default',
  ...props
}: ILinePagerProps): React.ReactElement {
  if (props.pageCount == null && props.pageCountResponsive?.base == null) {
    throw new Error(`One of {pageCount, pageCountResponsive.base} must be passed to ${LinePager.displayName}`);
  }
  const pageCount = props.pageCountResponsive?.base || props.pageCount || 12;
  const pageCountSmall = props.pageCountResponsive?.small || pageCount;
  const pageCountMedium = props.pageCountResponsive?.medium || pageCountSmall;
  const pageCountLarge = props.pageCountResponsive?.large || pageCountMedium;
  const pageCountExtraLarge = props.pageCountResponsive?.extraLarge || pageCountLarge;
  const pageCounts = [pageCount, pageCountSmall, pageCountMedium, pageCountLarge, pageCountExtraLarge];
  const maxPageCount = Math.max(...(pageCounts.filter((candidatePageCount?: number): boolean => candidatePageCount !== undefined)));
  const onPageClicked = (pageIndex: number): void => {
    if (props.onPageClicked) {
      props.onPageClicked(pageIndex);
    }
  };
  const getHiddenAboveSize = (index: number): ScreenSize | undefined => {
    if (index >= pageCountSmall) {
      return ScreenSize.Small;
    }
    if (index >= pageCountMedium) {
      return ScreenSize.Medium;
    }
    if (index >= pageCountLarge) {
      return ScreenSize.Large;
    }
    if (index >= pageCountExtraLarge) {
      return ScreenSize.ExtraLarge;
    }
    return undefined;
  };
  return (
    <div
      id={props.id}
      className={getClassName(LinePager.displayName, props.className, ...(variant?.split('-') || []))}
      style={props.style}
    >
      {Array(maxPageCount).fill(null).map((_: unknown, index: number): React.ReactElement => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ResponsiveHidingView key={index} hiddenAbove={getHiddenAboveSize(index)}>
            <button
              type='button'
              className={getClassName(index === props.activePageIndex && 'active', 'LinePagerItem')}
              aria-label={`Page ${index + 1}`}
              onClick={(): void => onPageClicked(index)}
            />
            {index < pageCount - 1 && (
              <Spacing direction={Direction.Horizontal} />
            )}
          </ResponsiveHidingView>
        );
      })}
    </div>
  );
}
LinePager.displayName = 'KibaLinePager';
