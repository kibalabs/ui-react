import React from 'react';

import { getClassName } from '@kibalabs/core';
import { IMultiChildProps, OptionalProppedElement } from '@kibalabs/core-react';
import styled from 'styled-components';

import { IListItemTheme, ListItem } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { List } from '../../molecules';
import { IMenuItemProps } from '../../molecules/menuItem';
import { KibaIcon, PaddingSize, Text } from '../../particles';
import { IPortalTheme, Placement, Portal } from '../../particles/portal';
import { defaultOrganismProps, IOrganismProps } from '../organismProps';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IMenuItemInnerProps extends Omit<IMenuItemProps, 'onClicked'> {
}

class MenuItemInner extends React.Component<IMenuItemInnerProps> {
  static displayName = 'Menu.Item';
}


export interface IMenuTheme {
  // list theme specific to menu and also portal theme
  listItemTheme: IListItemTheme;
  portalTheme: IPortalTheme;
}

interface IStyledMenuProps{

}

const StyledMenu = styled.div<IStyledMenuProps>`
  width: 100%;
  height: 100%;
  background: transparent;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  
  &.close {
    display: none;
  }
`;


interface IMenuProps extends IOrganismProps<IMenuTheme>, IMultiChildProps<IMenuItemInnerProps>{
  anchorElement: React.RefObject<HTMLDivElement>;
  placement: Placement | string;
  selectedItemKey?: string;
  onItemClicked(itemKey: string): void;
  isOpen: boolean;
  onClose(): void;
}

export const Menu = (props: IMenuProps): React.ReactElement => {
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (event.target === menuRef.current) {
      props.onClose();
    }
  };

  return (
    <StyledMenu
      className={getClassName(Menu.displayName, !props.isOpen && 'close')}
      ref={menuRef}
      onClick={onBackdropClicked}
    >
      <Portal theme={props.theme?.portalTheme} anchorElement={props.anchorElement} isOpen={props.isOpen} placement={props.placement}>
        <List onItemClicked={props.onItemClicked} shouldShowDividers={true} selectedItemKey={props.selectedItemKey}>
          {React.Children.map(props.children, (child: OptionalProppedElement<IMenuItemInnerProps>, index: number): React.ReactElement | null => {
            if (!child) {
              return null;
            }
            return (
              <ListItem
                itemKey={child.props.itemKey || String(index)}
                theme={props.theme?.listItemTheme}
              >
                {child.props.children
                  ? child.props.children
                  : (
                    <Stack direction={Direction.Horizontal} shouldAddGutters={true} childAlignment={Alignment.Center} defaultGutter={PaddingSize.Default}>
                      {child.props.itemIconId && <KibaIcon variant={child.props.itemIconVariant || 'default'} iconId={child.props.itemIconId} />}
                      {child.props.itemText && <Text variant={`bold-${child.props.itemTextVariant || 'default'}`}>{child.props.itemText}</Text>}
                    </Stack>
                  )
                }
              </ListItem>
            );
          })}
        </List>
      </Portal>
    </StyledMenu>
  );
};

Menu.displayName = 'Menu';
Menu.defaultProps = {
  ...defaultOrganismProps,
};
Menu.Item = MenuItemInner;
