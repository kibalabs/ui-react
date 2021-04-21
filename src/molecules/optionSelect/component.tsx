import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { Box, HidingView, Text } from "../..";
import { IListTheme, List } from '../list';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

interface IOption {
  text: string;
  textColor?: string;
  itemKey: string;
  isDisabled?: boolean;
}


interface IOptionSelectProps extends IMoleculeProps<IListTheme> {
  onItemClicked: (itemKey: string) => void;
  options: IOption[];
  selectedItemKey?: string;
}


export const OptionSelect = (props: IOptionSelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    setIsOpen(false);
  }
  return (
    <Box>
      <Box variant='bordered'>
        <div onClick={() => {setIsOpen(!isOpen)}}></div>
      </Box>
      <HidingView isHidden={!isOpen}>
        <Box variant='bordered' isFullWidth={false}>
          <List onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={false}>
            {props.options.map((option) => <List.Item itemKey={option.itemKey} isDisabled={option.isDisabled} isSelected={option.itemKey === props.selectedItemKey}><Text>{option.text}</Text></List.Item>)}
          </List>
        </Box>
      </HidingView>
    </Box>
  );
}

OptionSelect.displayName = 'OptionSelect';
OptionSelect.defaultProps = {
  ...defaultMoleculeProps,
};