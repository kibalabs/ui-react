import React from 'react';

import { getClassName } from '@kibalabs/core';
import { ISingleAnyChildProps } from '@kibalabs/core-react';

import { TitledCollapsibleBox } from './component';
import { ITitledCollapsibleBoxTheme } from './theme';
import { defaultComponentProps, IComponentProps } from '../../model';

interface IStatefulTitledCollapsibleBoxProps extends IComponentProps<ITitledCollapsibleBoxTheme>, ISingleAnyChildProps {
  title: string;
  isCollapsedInitially?: boolean;
  shouldSkipRenderingWhenCollapsed?: boolean;
}

export const StatefulTitledCollapsibleBox = (props: IStatefulTitledCollapsibleBoxProps): React.ReactElement => {
  const [isCollapsed, setIsCollapsed] = React.useState(!!props.isCollapsedInitially);
  const onCollapseToggled = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <TitledCollapsibleBox
      id={props.id}
      className={getClassName(StatefulTitledCollapsibleBox.displayName, props.className)}
      theme={props.theme}
      variant={props.variant}
      title={props.title}
      isCollapsed={isCollapsed}
      onCollapseToggled={onCollapseToggled}
      shouldSkipRenderingWhenCollapsed={props.shouldSkipRenderingWhenCollapsed}
    >
      {props.children}
    </TitledCollapsibleBox>
  );
};

StatefulTitledCollapsibleBox.displayName = 'StatefulTitledCollapsibleBox';
StatefulTitledCollapsibleBox.defaultProps = {
  ...defaultComponentProps,
};
