import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Atoms/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    text: 'Accept terms and conditions',
    isChecked: false,
  },
  render: (args) => <Checkbox {...args} />,
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <Checkbox
        text="Click to toggle"
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
      />
    );
  },
};

export const Checked: Story = {
  render: () => (
    <Checkbox text="This is checked" isChecked={true} />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Checkbox text="Disabled unchecked" isChecked={false} isDisabled={true} />
      <Checkbox text="Disabled checked" isChecked={true} isDisabled={true} />
    </Stack>
  ),
};

export const FormExample: Story = {
  render: function FormExampleStory() {
    const [newsletter, setNewsletter] = React.useState(false);
    const [terms, setTerms] = React.useState(false);
    const [marketing, setMarketing] = React.useState(true);
    return (
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Checkbox
          text="Subscribe to newsletter"
          isChecked={newsletter}
          onToggled={() => setNewsletter(!newsletter)}
        />
        <Checkbox
          text="I agree to terms and conditions"
          isChecked={terms}
          onToggled={() => setTerms(!terms)}
        />
        <Checkbox
          text="Receive marketing emails"
          isChecked={marketing}
          onToggled={() => setMarketing(!marketing)}
        />
      </Stack>
    );
  },
};
