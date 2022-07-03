import React from 'react';

import { getClassName } from '@kibalabs/core';
import styled from 'styled-components';

import { IInputFrameTheme, IListTheme, InputFrame, List } from '../..';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { IBoxTheme, KibaIcon, Text } from '../../particles';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
import { HidingView } from '../../wrappers';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

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
  optionsContainerTheme: IBoxTheme;
}

interface IStyledOptionsContainer {
  $theme: IBoxTheme;
}

const StyledOptionsContainer = styled.div<IStyledOptionsContainer>`
  ${(props: IStyledOptionsContainer): string => themeToCss(props.$theme)};
  position: absolute;
  display: block;
  z-index: 999;
  width: 100%;
`;

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


export const OptionSelect = (props: IOptionSelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const optionsContainerTheme = useBuiltTheme<IBoxTheme>('boxes', props.optionsContainerVariant || 'card-unpadded-unmargined', props.theme?.optionsContainerTheme);

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
      className={getClassName(OptionSelect.displayName, props.className)}
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
        <StyledOptionsContainer $theme={optionsContainerTheme}>
          <List theme={props.theme?.optionListTheme} itemVariant={props.optionListVariant || 'slim'} onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={true}>
            {props.options.map((option) => (
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
        </StyledOptionsContainer>
      </HidingView>
    </StyledOptionSelect>
  );
};

OptionSelect.displayName = 'OptionSelect';
OptionSelect.defaultProps = {
  ...defaultMoleculeProps,

};
