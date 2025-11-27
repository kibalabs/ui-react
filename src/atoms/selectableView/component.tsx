
import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { ISelectableViewTheme } from './theme';
import './styles.scss';
import { Stack } from '../../layouts';
import { IComponentProps } from '../../model';
import { PaddingSize } from '../../particles';
import { KibaIcon } from '../../particles/kibaIcon';
import { themeToCss } from '../../util';

export const SelectableViewThemedStyle = (theme: RecursivePartial<ISelectableViewTheme>): string => `
  ${themeToCss(theme.normal?.default?.background)};
  & > .KibaSelectableView-overlay {
    ${themeToCss(theme.normal?.default?.overlay)};
  }
  &:hover {
    ${themeToCss(theme.normal?.hover?.background)};
    & > .KibaSelectableView-overlay {
      ${themeToCss(theme.normal?.hover?.overlay)};
    }
  }
  &:active {
    ${themeToCss(theme.normal?.press?.background)};
    & > .KibaSelectableView-overlay {
      ${themeToCss(theme.normal?.press?.overlay)};
    }
  }
  &:focus {
    ${themeToCss(theme.normal?.focus?.background)};
    & > .KibaSelectableView-overlay {
      ${themeToCss(theme.normal?.focus?.overlay)};
    }
  }
  &.selected {
    ${themeToCss(theme.selected?.default?.background)};
    & > .KibaSelectableView-overlay {
      ${themeToCss(theme.selected?.default?.overlay)};
    }
    &:hover {
      ${themeToCss(theme.selected?.hover?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.selected?.hover?.overlay)};
      }
    }
    &:active {
      ${themeToCss(theme.selected?.press?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.selected?.press?.overlay)};
      }
    }
    &:focus {
      ${themeToCss(theme.selected?.focus?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.selected?.focus?.overlay)};
      }
    }
  }
  &.disabled {
    ${themeToCss(theme.disabled?.default?.background)};
    & > .KibaSelectableView-overlay {
      ${themeToCss(theme.disabled?.default?.overlay)};
    }
    &:hover {
      ${themeToCss(theme.disabled?.hover?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.disabled?.hover?.overlay)};
      }
    }
    &:active {
      ${themeToCss(theme.disabled?.press?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.disabled?.press?.overlay)};
      }
    }
    &:focus {
      ${themeToCss(theme.disabled?.focus?.background)};
      & > .KibaSelectableView-overlay {
        ${themeToCss(theme.disabled?.focus?.overlay)};
      }
    }
  }
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
  const onClicked = (): void => {
    if (props.onClicked && !props.isDisabled) {
      props.onClicked();
    }
  };
  return (
    <button
      id={props.id}
      className={getClassName(SelectableView.displayName, className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', props.isSelected && 'selected', props.isDisabled && 'disabled', ...(variant?.split('-') || []))}
      onClick={onClicked}
    >
      {props.children}
      <div className='KibaSelectableView-overlay'>
        {props.isSelected && (
          <React.Fragment>
            {props.selectedIndicator ? (
              <React.Fragment>
                {props.selectedIndicator}
              </React.Fragment>
            ) : !props.shouldHideDefaultSelectedIndicator && (
              <Stack paddingTop={PaddingSize.Default} paddingLeft={PaddingSize.Default}>
                <KibaIcon iconId='ion-checkmark-circle' variant='large' _color='var(--kiba-color-brand-primary)' />
              </Stack>
            )}
          </React.Fragment>
        )}
      </div>
    </button>
  );
}
SelectableView.displayName = 'KibaSelectableView';
