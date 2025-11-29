import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Form, SingleLineInput } from '..';
import { Button } from '../../atoms';
import { Stack } from '../../layouts';
import { Direction } from '../../model';

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Molecules/Form',
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {},
};

export const Simple: Story = {
  render: function SimpleForm() {
    const [value, setValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const onSubmit = () => {
      setIsLoading(true);
      setTimeout(() => {
        setValue('');
        setIsLoading(false);
      }, 1000);
    };
    return (
      <Form isLoading={isLoading} onFormSubmitted={onSubmit}>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          <SingleLineInput
            placeholderText='Enter your message'
            value={value}
            onValueChanged={setValue}
          />
          <Button buttonType='submit' variant='primary' text='Submit' />
        </Stack>
      </Form>
    );
  },
};

export const Loading: Story = {
  render: function LoadingForm() {
    const [value, setValue] = React.useState('');
    return (
      <Form isLoading={true} onFormSubmitted={() => {}}>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          <SingleLineInput
            placeholderText='Name'
            value={value}
            onValueChanged={setValue}
          />
          <SingleLineInput
            placeholderText='Email'
            value=''
            onValueChanged={() => {}}
          />
          <Button buttonType='submit' variant='primary' text='Submit' />
        </Stack>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: function ValidationForm() {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const onSubmit = () => {
      if (!email.includes('@')) {
        setError('Please enter a valid email');
      } else {
        setError('');
        alert('Form submitted!');
      }
    };
    return (
      <Form onFormSubmitted={onSubmit}>
        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
          <SingleLineInput
            placeholderText='Email'
            value={email}
            onValueChanged={setEmail}
            inputWrapperVariant={error ? 'error' : undefined}
            messageText={error}
          />
          <Button buttonType='submit' variant='primary' text='Submit' />
        </Stack>
      </Form>
    );
  },
};
