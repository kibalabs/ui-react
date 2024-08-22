import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';
import styled from 'styled-components';

import { Box, IInputFrameTheme, IListTheme, InputFrame, List } from '../..';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { IBoxTheme, KibaIcon, Text } from '../../particles';
import { getVariant } from '../../util';
import { HidingView } from '../../wrappers';
import { IMoleculeProps } from '../moleculeProps';

export interface IOption {
  text: string;
  itemKey: string;
  listItemVariant?: string;
  textVariant?: string;
  isDisabled?: boolean;
}

export interface IOptionSelectTheme {
  inputFrameTheme: IInputFrameTheme;
  optionListTheme: IListTheme;
  optionsContainerTheme?: RecursivePartial<IBoxTheme>;
}

interface IOptionSelectProps extends IMoleculeProps<IOptionSelectTheme> {
  options: IOption[];
  selectedItemKey?: string;
  isDisabled?:boolean;
  closeIconId?: string;
  openIconId?: string;
  messageText?: string;
  placeholderText?: string;
  inputWrapperVariant?: string;
  optionListVariant?: string;
  optionTextVariant?: string;
  optionsContainerVariant?: string;
  onItemClicked: (itemKey: string) => void;
}

const StyledOptionSelect = styled.div`
  width: 100%;
  position: relative;
  display: block;
`;


export function OptionSelect({
  className = '',
  ...props
}: IOptionSelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const optionsContainerVariant = getVariant(props.optionsContainerVariant || 'card-unpadded-unmargined');

  const getSelectedItem = (itemKey?: string) => {
    return props.options.find((option) => option.itemKey === itemKey);
  };

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    setIsOpen(false);
  };

  const onToggleOpenClicked = (): void => {
    setIsOpen(!isOpen);
  };

  const placeholder = props.placeholderText || 'Select an option';

  return (
    <StyledOptionSelect
      id={props.id}
      className={getClassName(OptionSelect.displayName, className)}
    >
      <InputFrame
        onClicked={onToggleOpenClicked}
        theme={props.theme?.inputFrameTheme}
        inputWrapperVariant={props.inputWrapperVariant}
        isEnabled={!props.isDisabled}
        messageText={props.messageText}
      >
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Text>{getSelectedItem(props.selectedItemKey)?.text || placeholder}</Text>
          </Stack.Item>
          <KibaIcon iconId={isOpen ? (props.closeIconId || 'ion-close') : props.openIconId || 'ion-chevron-down'} />
        </Stack>
      </InputFrame>
      <HidingView isHidden={!isOpen}>
        <Box theme={props.theme?.optionsContainerTheme} variant={optionsContainerVariant} zIndex={999} isFullWidth={true} position='absolute'>
          <List theme={props.theme?.optionListTheme} itemVariant={props.optionListVariant || 'slim'} onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={true}>
            {props.options.map((option: IOption): React.ReactElement => (
              <List.Item
                key={option.itemKey}
                itemKey={option.itemKey}
                variant={option.listItemVariant}
                isDisabled={option.isDisabled}
                isSelected={option.itemKey === props.selectedItemKey}
              >
                <Text variant={option.textVariant || props.optionTextVariant || 'smaller'}>{option.text}</Text>
              </List.Item>
            ))}
          </List>
        </Box>
      </HidingView>
    </StyledOptionSelect>
  );
}
OptionSelect.displayName = 'KibaOptionSelect';
