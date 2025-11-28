import React from 'react';

import { getClassName, RecursivePartial } from '@kibalabs/core';

import './styles.scss';
import { Box, IInputFrameTheme, IListItemProps, IListTheme, List, SingleLineInput } from '../..';
import { IBoxTheme, KibaIcon, Placement, Portal, Text } from '../../particles';
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
  shouldUsePortal?: boolean;
  onFilterTextChanged?: (filterText: string | null) => void;
  onItemClicked: (itemKey: string) => void;
}

interface IOptionSelectContentProps {
  options: IOption[];
  selectedItemKey?: string;
  isDisabled?:boolean;
  placeholderText?: string;
  optionListVariant?: string;
  optionTextVariant?: string;
  optionsContainerVariant?: string;
  optionListTheme?: IListTheme;
  onItemClicked: (itemKey: string) => void;
}

function OptionSelectContent({
  ...props
}: IOptionSelectContentProps): React.ReactElement {
  return (
    <List theme={props.optionListTheme} itemVariant={props.optionListVariant || 'slim'} onItemClicked={props.onItemClicked} shouldShowDividers={true} isFullWidth={true}>
      {props.options.map((option: IOption): React.ReactElement<IListItemProps> => (
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
  );
}

export function OptionSelect({
  className = '',
  shouldUsePortal = true,
  ...props
}: IOptionSelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [textFilter, setTextFilter] = React.useState<string | null>(null);
  const optionsContainerVariant = getVariant(props.optionsContainerVariant || 'card-unpadded-unmargined');
  const inputFrameRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const getSelectedItem = (itemKey?: string) => {
    return props.options.find((option) => option.itemKey === itemKey);
  };

  const onItemClicked = (itemKey: string) => {
    props.onItemClicked(itemKey);
    updateIsOpen(false);
  };

  const updateIsOpen = (newIsOpen: boolean): void => {
    if (newIsOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      onFilterTextChanged(null);
    }
    setIsOpen(newIsOpen);
  };

  const onToggleOpenClicked = (): void => {
    const newIsOpen = !isOpen;
    updateIsOpen(newIsOpen);
  };

  const onFilterTextChanged = (filterText: string | null): void => {
    if (props.onFilterTextChanged) {
      props.onFilterTextChanged(filterText);
    }
    setTextFilter(filterText);
  };

  const placeholder = props.placeholderText || 'Select an option';

  return (
    <div
      id={props.id}
      className={getClassName(OptionSelect.displayName, className)}
    >
      <Box ref={inputFrameRef}>
        <SingleLineInput
          ref={inputRef}
          theme={{
            inputFrameTheme: props.theme?.inputFrameTheme,
          }}
          inputWrapperVariant={props.inputWrapperVariant}
          isEnabled={!props.isDisabled}
          messageText={props.messageText}
          iconRight={<KibaIcon iconId={isOpen ? (props.closeIconId || 'ion-close') : props.openIconId || 'ion-chevron-down'} />}
          value={isOpen ? textFilter : getSelectedItem(props.selectedItemKey)?.text || placeholder}
          onValueChanged={onFilterTextChanged}
          placeholderText='Type to filter...'
          onClicked={isOpen ? undefined : onToggleOpenClicked}
          onFrameClicked={onToggleOpenClicked}
        />
      </Box>
      <HidingView isHidden={!isOpen}>
        {shouldUsePortal ? (
          <Portal anchorElement={inputFrameRef} placement={Placement.bottomLeft} variant='unpadded' shouldMatchAnchorWidth={true}>
            <Box theme={props.theme?.optionsContainerTheme} variant={optionsContainerVariant} isFullHeight={true}>
              <OptionSelectContent
                options={props.options}
                selectedItemKey={props.selectedItemKey}
                isDisabled={props.isDisabled}
                placeholderText={placeholder}
                optionListVariant={props.optionListVariant}
                optionTextVariant={props.optionTextVariant}
                optionsContainerVariant={props.optionsContainerVariant}
                optionListTheme={props.theme?.optionListTheme}
                onItemClicked={onItemClicked}
              />
            </Box>
          </Portal>
        ) : (
          <Box theme={props.theme?.optionsContainerTheme} variant={optionsContainerVariant} zIndex={999} isFullWidth={true} position='absolute'>
            <OptionSelectContent
              options={props.options}
              selectedItemKey={props.selectedItemKey}
              isDisabled={props.isDisabled}
              placeholderText={placeholder}
              optionListVariant={props.optionListVariant}
              optionTextVariant={props.optionTextVariant}
              optionsContainerVariant={props.optionsContainerVariant}
              optionListTheme={props.theme?.optionListTheme}
              onItemClicked={onItemClicked}
            />
          </Box>
        )}
      </HidingView>
    </div>
  );
}
OptionSelect.displayName = 'KibaOptionSelect';
