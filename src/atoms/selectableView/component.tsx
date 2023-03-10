
import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
import styled from 'styled-components';

import { ISelectableViewTheme } from './theme';
import { Stack } from '../../layouts';
import { defaultComponentProps, IComponentProps } from '../../model';
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

  && {
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

  return (
    // @ts-ignore: as prop doesn't match type required
    <StyledSelectableView
      id={props.id}
      className={getClassName(SelectableView.displayName, props.className, props.isSelected && 'selected')}
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
};

SelectableView.displayName = 'KibaSelectableView';
SelectableView.defaultProps = {
  ...defaultComponentProps,
};
