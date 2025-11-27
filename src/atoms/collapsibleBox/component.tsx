import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { ICollapsibleBoxTheme } from './theme';
import { IComponentProps } from '../../model';
import { KibaIcon } from '../../particles';
import { HidingView } from '../../wrappers';

export const CollapsibleBoxThemedStyle = (theme: RecursivePartial<ICollapsibleBoxTheme>): string => '';

interface ICollapsibleBoxProps extends IComponentProps<ICollapsibleBoxTheme>, ISingleAnyChildProps {
  headerView: React.ReactNode;
  isCollapsed: boolean;
  onCollapseToggled(): void;
  shouldSkipRenderingWhenCollapsed?: boolean;
  shouldHideIndicator?: boolean;
  style?: React.CSSProperties;
}

export function CollapsibleBox({
  className = '',
  variant = 'default',
  ...props
}: ICollapsibleBoxProps): React.ReactElement {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };

  return (
    <div
      id={props.id}
      className={getClassName(CollapsibleBox.displayName, className, props.isCollapsed && 'collapsed', ...(variant?.split('-') || []))}
      style={props.style}
    >
      <div
        className='KibaCollapsibleBoxHeader'
        onClick={onCollapseToggled}
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
