import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { KibaIcon } from '../../particles';
import { HidingView } from '../../wrappers';

export { CollapsibleBoxThemedStyle } from '../../util/legacyThemeCompat';

interface ICollapsibleBoxProps extends IComponentProps, ISingleAnyChildProps {
  headerView: React.ReactNode;
  isCollapsed: boolean;
  onCollapseToggled(): void;
  shouldSkipRenderingWhenCollapsed?: boolean;
  shouldHideIndicator?: boolean;
}

export function CollapsibleBox({
  className = '',
  variant = 'default',
  ...props
}: ICollapsibleBoxProps): React.ReactElement {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };
  const onKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCollapseToggled();
    }
  };
  return (
    <div
      id={props.id}
      className={getClassName(CollapsibleBox.displayName, className, props.isCollapsed && 'collapsed', ...(variant?.split('-') || []))}
      style={props.style}
    >
      <div
        role='button'
        tabIndex={0}
        className='KibaCollapsibleBoxHeader'
        onClick={onCollapseToggled}
        onKeyDown={onKeyDown}
      >
        {props.headerView}
        {!props.shouldHideIndicator && (
          <KibaIcon iconId={props.isCollapsed ? 'ion-chevron-down' : 'ion-chevron-up'} />
        )}
      </div>
      {(!props.isCollapsed || !props.shouldSkipRenderingWhenCollapsed) && (
        <HidingView isHidden={props.isCollapsed}>
          <div className='KibaCollapsibleBoxContent'>
            {props.children}
          </div>
        </HidingView>
      )}
    </div>
  );
}
CollapsibleBox.displayName = 'KibaCollapsibleBox';
