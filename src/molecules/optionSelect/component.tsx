import React from 'react';

import styled from 'styled-components';

import { IInputFrameTheme, IListTheme, InputFrame, List } from '../..';
import { IconButton } from '../../atoms';
import { Stack } from '../../layouts';
import { Alignment, Direction } from '../../model';
import { Box, IBoxTheme, KibaIcon, Text } from '../../particles';
import { useBuiltTheme } from '../../theming';
import { themeToCss } from '../../util';
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
}


const StyledClickableBox = styled.div`
  width: 100%;
  height: 100%;
`;

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
  messageText?: string;
  isFullWidth?: boolean;
}


export const OptionSelect = (props: IOptionSelectProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);
  const width = props.isFullWidth ? '100%' : props.width || '200px';

  const optionsContainerTheme = useBuiltTheme('boxes', 'card', { padding: '0', ...props.theme?.optionsContainer });

  const selectedItem = (itemKey: string) => {
    return props.options.find((option) => option.itemKey === itemKey);
  };

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    setIsOpen(false);
  };
  return (
    <Box isFullWidth={props.isFullWidth} width={width}>
      <StyledClickableBox onClick={() => setIsOpen(!isOpen)}>
        <InputFrame theme={props.theme?.inputHandler} isEnabled={props.isEnabled} messageText={props.messageText}>
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center}>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Text>{selectedItem(props.selectedItemKey)?.text || 'Select an option'}</Text>
            </Stack.Item>
            {isOpen && <IconButton variant='unpadded' icon={<KibaIcon iconId={props.closeIconId || 'ion-close-outline'} />} onClicked={() => setIsOpen(false)} />}
          </Stack>
        </InputFrame>
      </StyledClickableBox>
      <HidingView isHidden={!isOpen}>
        <StyledOptionsContainer theme={optionsContainerTheme}>
          <List theme={props.theme?.optionList} onItemClicked={onItemClicked} shouldShowDividers={true} isFullWidth={true}>
            {props.options.map((option) => <List.Item key={option.itemKey} itemKey={option.itemKey} isDisabled={option.isDisabled} isSelected={option.itemKey === props.selectedItemKey}><Text>{option.text}</Text></List.Item>)}
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
