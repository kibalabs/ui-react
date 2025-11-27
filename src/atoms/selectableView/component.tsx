
import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { Stack } from '../../layouts';
import { IComponentProps } from '../../model';
import { PaddingSize } from '../../particles';
import { KibaIcon } from '../../particles/kibaIcon';

export { SelectableViewThemedStyle } from '../../util/legacyThemeCompat';

export interface ISelectableViewProps extends IComponentProps, ISingleAnyChildProps {
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
      type='button'
      id={props.id}
      className={getClassName(SelectableView.displayName, className, props.isFullWidth && 'fullWidth', props.isFullHeight && 'fullHeight', props.isSelected && 'selected', props.isDisabled && 'disabled', ...(variant?.split('-') || []))}
      onClick={onClicked}
      style={props.style}
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
