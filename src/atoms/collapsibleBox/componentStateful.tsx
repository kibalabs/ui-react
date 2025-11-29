import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { CollapsibleBox } from './component';
import { IComponentProps } from '../../model';

interface IStatefulCollapsibleBoxProps extends IComponentProps, ISingleAnyChildProps {
  headerView: React.ReactNode;
  isCollapsedInitially?: boolean;
  shouldSkipRenderingWhenCollapsed?: boolean;
  shouldHideIndicator?: boolean;
}

export function StatefulCollapsibleBox({
  className = '',
  variant = 'default',
  ...props
}: IStatefulCollapsibleBoxProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState(!!props.isCollapsedInitially);
  const onCollapseToggled = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollapsibleBox
      id={props.id}
      className={getClassName(StatefulCollapsibleBox.displayName, className)}
      variant={variant}
      headerView={props.headerView}
      isCollapsed={isCollapsed}
      onCollapseToggled={onCollapseToggled}
      shouldSkipRenderingWhenCollapsed={props.shouldSkipRenderingWhenCollapsed}
      shouldHideIndicator={props.shouldHideIndicator}
      style={props.style}
    >
      {props.children}
    </CollapsibleBox>
  );
}
StatefulCollapsibleBox.displayName = 'KibaStatefulCollapsibleBox';
