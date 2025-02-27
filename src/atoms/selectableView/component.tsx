
import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import { styled } from 'styled-components';

import { ISelectableViewTheme } from './theme';
import { Stack } from '../../layouts';
import { IComponentProps } from '../../model';
import { PaddingSize } from '../../particles';
import { KibaIcon } from '../../particles/kibaIcon';
import { useColors } from '../../theming';
import { themeToCss } from '../../util';

export const SelectableViewThemedStyle = (theme: RecursivePartial<ISelectableViewTheme>): string => `
  ${themeToCss(theme.normal?.default?.background)};
  & > .selectable-view-overlay {
    ${themeToCss(theme.normal?.default?.overlay)};
  }
  &:hover {
    ${themeToCss(theme.normal?.hover?.background)};
    & > .selectable-view-overlay {
      ${themeToCss(theme.normal?.hover?.overlay)};
    }
  }
  &:active {
    ${themeToCss(theme.normal?.press?.background)};
    & > .selectable-view-overlay {
      ${themeToCss(theme.normal?.press?.overlay)};
    }
  }
  &:focus {
    ${themeToCss(theme.normal?.focus?.background)};
    & > .selectable-view-overlay {
      ${themeToCss(theme.normal?.focus?.overlay)};
    }
  }
  &.selected {
    ${themeToCss(theme.selected?.default?.background)};
    & > .selectable-view-overlay {
      ${themeToCss(theme.selected?.default?.overlay)};
    }
    &:hover {
      ${themeToCss(theme.selected?.hover?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.selected?.hover?.overlay)};
      }
    }
    &:active {
      ${themeToCss(theme.selected?.press?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.selected?.press?.overlay)};
      }
    }
    &:focus {
      ${themeToCss(theme.selected?.focus?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.selected?.focus?.overlay)};
      }
    }
  }
  &.disabled {
    ${themeToCss(theme.disabled?.default?.background)};
    & > .selectable-view-overlay {
      ${themeToCss(theme.disabled?.default?.overlay)};
    }
    &:hover {
      ${themeToCss(theme.disabled?.hover?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.disabled?.hover?.overlay)};
      }
    }
    &:active {
      ${themeToCss(theme.disabled?.press?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.disabled?.press?.overlay)};
      }
    }
    &:focus {
      ${themeToCss(theme.disabled?.focus?.background)};
      & > .selectable-view-overlay {
        ${themeToCss(theme.disabled?.focus?.overlay)};
      }
    }
  }
`;

interface IStyledSelectableViewProps {
  $theme?: RecursivePartial<ISelectableViewTheme>;
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
  &.disabled {
    cursor: not-allowed !important;
  }

  &&&& {
    ${(props: IStyledSelectableViewProps): string => (props.$theme ? SelectableViewThemedStyle(props.$theme) : '')};
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
`;

export interface ISelectableViewProps extends IComponentProps<ISelectableViewTheme>, ISingleAnyChildProps {
  isSelected: boolean;
  isDisabled?: boolean;
  selectedIndicator?: React.ReactElement;
  shouldHideDefaultSelectedIndicator?: boolean;
  isFullWidth?: boolean;
  isFullHeight?: boolean;
  onClicked(): void;

}

export function SelectableView({
  className = '',
  variant = 'default',
  ...props
}: ISelectableViewProps): React.ReactElement {
  const colors = useColors();
  const onClicked = (): void => {
    if (props.onClicked && !props.isDisabled) {
      props.onClicked();
    }
  };

  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledSelectableView
      id={props.id}
      className={getClassName(SelectableView.displayName, className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', props.isSelected && 'selected', props.isDisabled && 'disabled', ...(variant?.split('-') || []))}
      $theme={props.theme}
      onClick={onClicked}
    >
      {props.children}
      <StyledOverlay className='selectable-view-overlay'>
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
}
SelectableView.displayName = 'KibaSelectableView';
