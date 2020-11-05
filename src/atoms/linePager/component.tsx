import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IComponentProps, defaultComponentProps, themeToCss, useBuiltTheme } from '../..';
import { Spacing, ScreenSize } from '../../subatoms';
import { ILinePagerTheme } from './theme';
import { Direction } from '../../model';
import { ResponsiveHidingView } from '../../wrappers';
import { ResponsiveField } from '../../util';

interface IStyledLinePagerProps {
  theme: ILinePagerTheme;
}

const StyledLinePager = styled.div<IStyledLinePagerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledLinePagerItem = styled.button<IStyledLinePagerProps>`
  ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.default.background)};
  cursor: pointer;
  outline: none;
  transition-duration: 0.3s;
  flex-grow: 1;
  flex-shrink: 1;

  &:hover {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.normal.focus?.background)};
  }
  &.active {
    ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.default.background)};
    &:hover {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.hover?.background)};
    }
    &:active {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.press?.background)};
    }
    &:focus {
      ${(props: IStyledLinePagerProps): string => themeToCss(props.theme.active.focus?.background)};
    }
  }
`;

interface ILinePagerProps extends IComponentProps<ILinePagerTheme> {
  pageCount: number;
  pageCountResponsive?: ResponsiveField<number>;
  activePageIndex: number;
  onPageClicked?(index: number): void;
}

export const LinePager = (props: ILinePagerProps): React.ReactElement => {
  const theme = useBuiltTheme('linePagers', props.variant, props.theme);

  const pageCount = props.pageCountResponsive?.base || props.pageCount;
  const pageCountSmall = props.pageCountResponsive?.small || pageCount;
  const pageCountMedium = props.pageCountResponsive?.medium || pageCountSmall;
  const pageCountLarge = props.pageCountResponsive?.large || pageCountMedium;
  const pageCountExtraLarge = props.pageCountResponsive?.extraLarge || pageCountLarge;
  const pageCounts = [pageCount, pageCountSmall, pageCountMedium, pageCountLarge, pageCountExtraLarge];
  const maxPageCount = Math.max(...(pageCounts.filter((pageCount?: number): boolean => pageCount !== undefined)));

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
  }

  return (
    <StyledLinePager
      id={props.id}
      className={getClassName(LinePager.displayName, props.className)}
    >
      {Array(maxPageCount).fill(null).map((_: any, index: number): React.ReactElement => {
        return (
          <ResponsiveHidingView key={index} hiddenAbove={getHiddenAboveSize(index)}>
            <StyledLinePagerItem
              className={getClassName(index === props.activePageIndex && 'active')}
              theme={theme}
              aria-label={`Page ${index + 1}`}
              onClick={props.onPageClicked ? ((): void => props.onPageClicked(index)) : undefined}
            />
            {index < pageCount - 1 && <Spacing direction={Direction.Horizontal} />}
          </ResponsiveHidingView>
        );
      })}
    </StyledLinePager>
  );
};

LinePager.displayName = 'LinePager';
LinePager.defaultProps = {
  ...defaultComponentProps,
};
