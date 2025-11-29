import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '.';
import { Button } from '../button';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text, TextAlignment } from '../../particles';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Atoms/Dialog',
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    onCloseClicked: () => {},
  },
  render: (args) => (
    <Dialog {...args}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Text variant="header3" alignment={TextAlignment.Center}>Dialog Title</Text>
        <Text alignment={TextAlignment.Center}>This is the dialog content.</Text>
      </Stack>
    </Dialog>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant="primary" text="Open Dialog" onClicked={() => setIsOpen(true)} />
        <Dialog isOpen={isOpen} onCloseClicked={() => setIsOpen(false)}>
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <Text variant="header3" alignment={TextAlignment.Center}>Hello!</Text>
            <Text alignment={TextAlignment.Center}>Click outside or press Escape to close.</Text>
            <Button variant="primary" text="Close" onClicked={() => setIsOpen(false)} />
          </Stack>
        </Dialog>
      </React.Fragment>
    );
  },
};

export const NonDismissable: Story = {
  render: function NonDismissableStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant="primary" text="Open Non-Dismissable" onClicked={() => setIsOpen(true)} />
        <Dialog
          isOpen={isOpen}
          onCloseClicked={() => setIsOpen(false)}
          isClosableByBackdrop={false}
          isClosableByEscape={false}
        >
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <Text variant="header3" alignment={TextAlignment.Center}>Important!</Text>
            <Text alignment={TextAlignment.Center}>You must click the button to close this dialog.</Text>
            <Button variant="primary" text="I Understand" onClicked={() => setIsOpen(false)} />
          </Stack>
        </Dialog>
      </React.Fragment>
    );
  },
};

export const CustomSize: Story = {
  render: function CustomSizeStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <React.Fragment>
        <Button variant="primary" text="Open Large Dialog" onClicked={() => setIsOpen(true)} />
        <Dialog
          isOpen={isOpen}
          onCloseClicked={() => setIsOpen(false)}
          maxWidth="600px"
          maxHeight="500px"
        >
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <Text variant="header3">Large Dialog</Text>
            <Text>This dialog has custom maxWidth and maxHeight.</Text>
            <Button text="Close" onClicked={() => setIsOpen(false)} />
          </Stack>
        </Dialog>
      </React.Fragment>
    );
  },
};
