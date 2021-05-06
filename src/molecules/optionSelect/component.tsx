import React from 'react';

import styled, { useTheme } from 'styled-components';

import { IInputFrameTheme, IListTheme, InputFrame, List } from '../..';
import { IconButton } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { Box, IBoxTheme, ITextTheme, KibaIcon, Text } from '../../particles';
import { useBuiltTheme } from '../../theming';
import { themeToCss, mergeTheme } from '../../util';
import { HidingView } from '../../wrappers';
import { defaultMoleculeProps, IMoleculeProps } from '../moleculeProps';

interface IOption {
  text: string;
  itemKey: string;
  isDisabled?: boolean;
}

export interface IOptionSelectTheme {
  inputHandler: IInputFrameTheme;
  optionsContainer: IBoxTheme;
  optionList: IListTheme;
  optionText: ITextTheme;
}


interface IStyledOptionsContainer {
  theme: IBoxTheme;
}

const StyledOptionsContainer = styled.div<IStyledOptionsContainer>`
  z-index: 999;
  ${(props: IStyledOptionsContainer): string => themeToCss(props.theme)};
`;

interface IOptionSelectProps extends IMoleculeProps<IOptionSelectTheme> {
  onItemClicked: (itemKey: string) => void;
  options: IOption[];
  selectedItemKey?: string;
  isEnabled?:boolean;
  width?: string;
  closeIconId?: string;
  openIconId?: string;
  messageText?: string;
  isFullWidth?: boolean;
}


export const OptionSelect = (props: IOptionSelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);
  const width = props.isFullWidth ? '100%' : props.width || '200px';

  const inputFrameTheme = useBuiltTheme('inputWrappers' , 'lessPadded' , props.theme?.inputHandler.inputWrapperTheme);

  const optionsContainerTheme = useBuiltTheme('boxes', 'card', { margin: '0px', padding: '0px', "border-top-left-radius": '0px', 'border-top-right-radius': '0px', ...props.theme?.optionsContainer });

  const textTheme = useBuiltTheme('texts' ,'default' , { 'font-size': '0.9rem' , ...props.theme?.optionText});

  const listTheme = useBuiltTheme('listItems', 'lessPadded', props.theme?.optionList['listItems']);

  const selectedItem = (itemKey: string) => {
    return props.options.find((option) => option.itemKey === itemKey);
  };

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    setIsOpen(false);
  };
  return (
    <Box isFullWidth={props.isFullWidth} width={width}>
      <InputFrame onClicked={() => setIsOpen(!isOpen)} theme={isOpen && {inputWrapperTheme : inputFrameTheme}} isEnabled={props.isEnabled} messageText={props.messageText}>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Text theme={textTheme}>{selectedItem(props.selectedItemKey)?.text || 'Select an option'}</Text>
          </Stack.Item>
          {isOpen ? <IconButton variant='unpadded' icon={<KibaIcon iconId={props.closeIconId || 'ion-close-outline'} />} onClicked={() => setIsOpen(false)} /> : <IconButton variant='unpadded' icon={<KibaIcon iconId={props.openIconId || 'ion-chevron-down'} />} onClicked={() => setIsOpen(true)} /> }
        </Stack>
      </InputFrame>
      <HidingView isHidden={!isOpen}>
        <StyledOptionsContainer theme={optionsContainerTheme}>
          <List theme={{ listItemTheme: listTheme}} onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={true}>
            {props.options.map((option) => <List.Item key={option.itemKey} itemKey={option.itemKey} isDisabled={option.isDisabled} isSelected={option.itemKey === props.selectedItemKey}><Text theme={textTheme}>{option.text}</Text></List.Item>)}
          </List>
        </StyledOptionsContainer>
      </HidingView>
    </Box>
  );
};

OptionSelect.displayName = 'OptionSelect';
OptionSelect.defaultProps = {
  ...defaultMoleculeProps,
  isEnabled: true,
  isFullWidth: false,
};
