
import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ISelectableViewTheme } from './theme';
import { Stack } from '../../layouts';
import { defaultComponentProps, IComponentProps } from '../../model';
import { PaddingSize } from '../../particles';
import { KibaIcon } from '../../particles/kibaIcon';
import { useBuiltTheme, useColors } from '../../theming';
import { themeToCss } from '../../util';


interface IStyledSelectableViewProps {
  $theme: ISelectableViewTheme;
}

const StyledSelectableView = styled.button<IStyledSelectableViewProps>`
  position: relative;
  color: currentColor;
  cursor: pointer !important;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-clip: padding-box;
  transition: 0.3s;
  width: fit-content;
  &.fullWidth {
    width: 100%;
  }

  &.fullHeight {
    height: 100%;
  }

  ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.normal.default.background)};
  &:hover {
    ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.normal.hover?.background)};
  }
  &:active {
    ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.normal.press?.background)};
  }
  &:focus {
    ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.normal.focus?.background)};
  }
  &.selected {
    ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.selected.default?.background)};
    &:hover {
      ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.selected.hover?.background)};
    }
    &:active {
      ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.selected.press?.background)};
    }
    &:focus {
      ${(props: IStyledSelectableViewProps): string => themeToCss(props.$theme.selected.focus?.background)};
    }
  }
`;

interface IStyledOverlayProps {
  $theme: ISelectableViewTheme;
}

const StyledOverlay = styled.div<IStyledOverlayProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;

  ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.normal.default.overlay)};
  &:hover {
    ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.normal.hover?.overlay)};
  }
  &:active {
    ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.normal.press?.overlay)};
  }
  &:focus {
    ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.normal.focus?.overlay)};
  }
  &.selected {
    ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.selected.default?.overlay)};
    &:hover {
      ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.selected.hover?.overlay)};
    }
    &:active {
      ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.selected.press?.overlay)};
    }
    &:focus {
      ${(props: IStyledOverlayProps): string => themeToCss(props.$theme.selected.focus?.overlay)};
    }
  }
`;
StyledOverlay.displayName = 'SelectableViewOverlay';

export interface ISelectableViewProps extends IComponentProps<ISelectableViewTheme>, ISingleAnyChildProps {
  isSelected: boolean;
  selectedIndicator?: React.ReactElement;
  shouldHideDefaultSelectedIndicator?: boolean;
  onClicked(): void;

}

export const SelectableView = (props: ISelectableViewProps): React.ReactElement => {
  const colors = useColors();
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked();
    }
  };

  const theme = useBuiltTheme('selectableViews', props.variant, props.theme);

  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledSelectableView
      id={props.id}
      className={getClassName(SelectableView.displayName, props.className)}
      $theme={theme}
      onClick={onClicked}
    >
      {props.children}
      <StyledOverlay
        className={getClassName(StyledOverlay.displayName, props.isSelected && 'selected')}
        $theme={theme}
      >
        { props.isSelected && (
          <React.Fragment>
            {props.selectedIndicator ? (
              <React.Fragment>
                {props.selectedIndicator}
              </React.Fragment>
            ) : !props.shouldHideDefaultSelectedIndicator && (
              // TODO(krishan711): this would probably be better as a styled-component
              <Stack paddingTop={PaddingSize.Default} paddingLeft={PaddingSize.Default}>
                <KibaIcon iconId='ion-checkmark-circle' variant='large' _color={colors.brandPrimary} />
              </Stack>
            )}
          </React.Fragment>
        )}
      </StyledOverlay>
    </StyledSelectableView>
  );
};

SelectableView.displayName = 'SelectableView';
SelectableView.defaultProps = {
  ...defaultComponentProps,
};
