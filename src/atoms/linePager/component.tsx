import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { styled } from 'styled-components';

import { ILinePagerTheme } from './theme';
import { Direction, IComponentProps } from '../../model';
import { ScreenSize, Spacing } from '../../particles';
import { ResponsiveField, themeToCss } from '../../util';
import { ResponsiveHidingView } from '../../wrappers';

export const LinePagerThemedStyle = (theme: RecursivePartial<ILinePagerTheme>): string => `
  & > .LinePagerItem {
    ${themeToCss(theme.normal?.default?.background)};
    &:hover {
      ${themeToCss(theme.normal?.hover?.background)};
    }
    &:active {
      ${themeToCss(theme.normal?.press?.background)};
    }
    &:focus {
      ${themeToCss(theme.normal?.focus?.background)};
    }
    &.active {
      ${themeToCss(theme.active?.default?.background)};
      &:hover {
        ${themeToCss(theme.active?.hover?.background)};
      }
      &:active {
        ${themeToCss(theme.active?.press?.background)};
      }
      &:focus {
        ${themeToCss(theme.active?.focus?.background)};
      }
    }
  }
`;

interface IStyledLinePagerProps {
  $theme?: RecursivePartial<ILinePagerTheme>;
}

const StyledLinePager = styled.div<IStyledLinePagerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;

  &&&& {
    ${(props: IStyledLinePagerProps): string => (props.$theme ? LinePagerThemedStyle(props.$theme) : '')};
  }
`;

const StyledLinePagerItem = styled.button<IStyledLinePagerProps>`
  cursor: pointer;
  outline: none;
  transition-duration: 0.3s;
  flex-grow: 1;
  flex-shrink: 1;
`;

interface ILinePagerProps extends IComponentProps<ILinePagerTheme> {
  pageCount?: number;
  pageCountResponsive?: ResponsiveField<number>;
  activePageIndex: number;
  onPageClicked?(index: number): void;
}

export function LinePager({
  className = '',
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
    <StyledLinePager
      id={props.id}
      className={getClassName(LinePager.displayName, className, ...(variant?.split('-') || []))}
      $theme={props.theme}
    >
      {Array(maxPageCount).fill(null).map((_: unknown, index: number): React.ReactElement => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ResponsiveHidingView key={index} hiddenAbove={getHiddenAboveSize(index)}>
            <StyledLinePagerItem
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
    </StyledLinePager>
  );
}
LinePager.displayName = 'KibaLinePager';
