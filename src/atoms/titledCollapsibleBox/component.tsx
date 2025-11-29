import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import './styles.scss';
import { IComponentProps } from '../../model';
import { KibaIcon } from '../../particles';
import { HidingView } from '../../wrappers';


interface ITitledCollapsibleBoxProps extends IComponentProps, ISingleAnyChildProps {
  title: string;
  isCollapsed: boolean;
  onCollapseToggled(): void;
  shouldSkipRenderingWhenCollapsed?: boolean;
}

export function TitledCollapsibleBox({
  variant = 'default',
  ...props
}: ITitledCollapsibleBoxProps): React.ReactElement {
  const onCollapseToggled = (): void => {
    props.onCollapseToggled();
  };
  return (
    <div
      id={props.id}
      className={getClassName(TitledCollapsibleBox.displayName, props.className, props.isCollapsed && 'collapsed', ...(variant?.split('-') || []))}
      style={props.style}
    >
      <button
        type='button'
        className='KibaTitledCollapsibleBoxHeader'
        onClick={onCollapseToggled}
      >
        <span>{props.title}</span>
        <KibaIcon iconId={props.isCollapsed ? 'ion-chevron-down' : 'ion-chevron-up'} />
      </button>
      {(!props.isCollapsed || !props.shouldSkipRenderingWhenCollapsed) && (
        <HidingView isHidden={props.isCollapsed}>
          <div className='KibaTitledCollapsibleBoxContent'>
            {props.children}
          </div>
        </HidingView>
      )}
    </div>
  );
}
TitledCollapsibleBox.displayName = 'KibaTitledCollapsibleBox';
