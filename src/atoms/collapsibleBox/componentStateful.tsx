import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { CollapsibleBox } from './component';
import { ICollapsibleBoxTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';

interface IStatefulCollapsibleBoxProps extends IComponentProps<ICollapsibleBoxTheme>, ISingleAnyChildProps {
  headerView: React.ReactNode;
  isCollapsedInitially?: boolean;
  shouldSkipRenderingWhenCollapsed?: boolean;
  shouldHideIndicator?: boolean;
}

export const StatefulCollapsibleBox = (props: IStatefulCollapsibleBoxProps): React.ReactElement => {
  const [isCollapsed, setIsCollapsed] = React.useState(!!props.isCollapsedInitially);
  const onCollapseToggled = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollapsibleBox
      id={props.id}
      className={getClassName(StatefulCollapsibleBox.displayName, props.className)}
      theme={props.theme}
      variant={props.variant}
      headerView={props.headerView}
      isCollapsed={isCollapsed}
      onCollapseToggled={onCollapseToggled}
      shouldSkipRenderingWhenCollapsed={props.shouldSkipRenderingWhenCollapsed}
      shouldHideIndicator={props.shouldHideIndicator}
    >
      {props.children}
    </CollapsibleBox>
  );
};

StatefulCollapsibleBox.displayName = 'KibaStatefulCollapsibleBox';
StatefulCollapsibleBox.defaultProps = {
  ...defaultComponentProps,
};
