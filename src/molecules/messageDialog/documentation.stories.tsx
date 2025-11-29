import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MessageDialog } from '.';
import { Button } from '../../atoms';

const meta: Meta<typeof MessageDialog> = {
  component: MessageDialog,
  title: 'Molecules/MessageDialog',
};

export default meta;
type Story = StoryObj<typeof MessageDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    onConfirmClicked: () => {},
    onCloseClicked: () => {},
  },
};

export const Interactive: Story = {
  render: function InteractiveDialog() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant='primary' onClicked={() => setIsOpen(true)} text='Open Dialog' />
        <MessageDialog
          isOpen={isOpen}
          title='Message Dialog'
          message='This is a simple message dialog with two buttons.'
          onConfirmClicked={() => {
            alert('Confirmed!');
            setIsOpen(false);
          }}
          onCloseClicked={() => setIsOpen(false)}
        />
      </React.Fragment>
    );
  },
};

export const LongMessage: Story = {
  args: {
    isOpen: true,
    title: 'Important Notice',
    message: 'This is a longer message that provides more detailed information about the action the user is about to take. Please read carefully before proceeding as this action cannot be undone.',
    onConfirmClicked: () => {},
    onCloseClicked: () => {},
  },
};

export const DeleteConfirmation: Story = {
  render: function DeleteDialog() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant='destructive' onClicked={() => setIsOpen(true)} text='Delete Item' />
        <MessageDialog
          isOpen={isOpen}
          title='Delete Item?'
          message='This action cannot be undone. Are you sure you want to delete this item?'
          onConfirmClicked={() => {
            console.log('Item deleted');
            setIsOpen(false);
          }}
          onCloseClicked={() => setIsOpen(false)}
        />
      </React.Fragment>
    );
  },
};
