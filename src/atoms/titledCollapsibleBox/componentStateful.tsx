import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { TitledCollapsibleBox } from './component';
import { IComponentProps } from '../../model';

interface IStatefulTitledCollapsibleBoxProps extends IComponentProps, ISingleAnyChildProps {
  title: string;
  isCollapsedInitially?: boolean;
  shouldSkipRenderingWhenCollapsed?: boolean;
}

export function StatefulTitledCollapsibleBox({
  className = '',
  variant = 'default',
  ...props
}: IStatefulTitledCollapsibleBoxProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState(!!props.isCollapsedInitially);
  const onCollapseToggled = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <TitledCollapsibleBox
      id={props.id}
      className={getClassName(StatefulTitledCollapsibleBox.displayName, className)}
      variant={variant}
      title={props.title}
      isCollapsed={isCollapsed}
      onCollapseToggled={onCollapseToggled}
      shouldSkipRenderingWhenCollapsed={props.shouldSkipRenderingWhenCollapsed}
      style={props.style}
    >
      {props.children}
    </TitledCollapsibleBox>
  );
}
StatefulTitledCollapsibleBox.displayName = 'KibaStatefulTitledCollapsibleBox';
