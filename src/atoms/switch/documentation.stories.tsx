import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '.';
import { Stack } from '../../layouts/stack';
import { Direction } from '../../model';
import { Text } from '../../particles';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Atoms/Switch',
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
  render: (args) => <Switch {...args} />,
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [isOn, setIsOn] = React.useState(false);
    return (
      <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
        <Switch isChecked={isOn} onToggled={() => setIsOn(!isOn)} />
        <Text>{isOn ? 'ON' : 'OFF'}</Text>
      </Stack>
    );
  },
};

export const States: Story = {
  render: () => (
    <Stack direction={Direction.Vertical} shouldAddGutters={true}>
      <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
        <Switch isChecked={false} />
        <Text>Off</Text>
      </Stack>
      <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
        <Switch isChecked={true} />
        <Text>On</Text>
      </Stack>
    </Stack>
  ),
};

export const SettingsExample: Story = {
  render: function SettingsExampleStory() {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [autoSave, setAutoSave] = React.useState(true);
    return (
      <Stack direction={Direction.Vertical} shouldAddGutters={true}>
        <Stack direction={Direction.Horizontal} shouldAddGutters={true} contentAlignment="space-between">
          <Text>Enable notifications</Text>
          <Switch isChecked={notifications} onToggled={() => setNotifications(!notifications)} />
        </Stack>
        <Stack direction={Direction.Horizontal} shouldAddGutters={true} contentAlignment="space-between">
          <Text>Dark mode</Text>
          <Switch isChecked={darkMode} onToggled={() => setDarkMode(!darkMode)} />
        </Stack>
        <Stack direction={Direction.Horizontal} shouldAddGutters={true} contentAlignment="space-between">
          <Text>Auto-save</Text>
          <Switch isChecked={autoSave} onToggled={() => setAutoSave(!autoSave)} />
        </Stack>
      </Stack>
    );
  },
};
