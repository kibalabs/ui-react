import React from 'react';

import { Box, HidingView, Text } from '../..';
import { IBoxTheme } from '../../particles';
import { IListTheme, List } from '../list';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';
import { ISingleLineInputTheme, SingleLineInput } from '../singleLineInput';

interface IOption {
  text: string;
  itemKey: string;
  isDisabled?: boolean;
}

export interface IOptionSelectTheme {
  // (I think so) Need to write a buildTheme file for OptionSelect, to give default style the components
  // or should I be using styled components
  inputHandler: ISingleLineInputTheme;
  optionsContainer: IBoxTheme;
  optionList: IListTheme;
}

interface IOptionSelectProps extends IMoleculeProps<IOptionSelectTheme> {
  onItemClicked: (itemKey: string) => void;
  options: IOption[];
  selectedItemKey?: string;
}


export const OptionSelect = (props: IOptionSelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedItem = (itemKey: string) => {
    return props.options.filter((option) => option.itemKey === itemKey).pop();
  };

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    setIsOpen(false);
  };
  return (
    <Box>
      <SingleLineInput theme={props.theme?.inputHandler} value={selectedItem(props.selectedItemKey)?.text} onValueChanged={() => null} onClick={() => { setIsOpen(!isOpen); }} />
      <HidingView isHidden={!isOpen}>
        <Box theme={props.theme?.optionsContainer}>
          <List theme={props.theme?.optionList} onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={true}>
            {props.options.map((option) => <List.Item key={option.itemKey} itemKey={option.itemKey} isDisabled={option.isDisabled} isSelected={option.itemKey === props.selectedItemKey}><Text>{option.text}</Text></List.Item>)}
          </List>
        </Box>
      </HidingView>
    </Box>
  );
};

OptionSelect.displayName = 'OptionSelect';
OptionSelect.defaultProps = {
  ...defaultMoleculeProps,
};
