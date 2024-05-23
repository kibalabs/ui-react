import React from 'react';

import { Form } from '.';
import { SingleLineInput } from '..';
import { Button } from '../../atoms';
import { Stack } from '../../layouts';
import { Direction } from '../../model';


const Template = (args) => <Form {...args} />;

export default {
  component: Form,
  title: 'Molecules/Form',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const Simple = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks, unused-imports/no-unused-vars
    const [isLoading, setIsLoading] = React.useState(false);

    return (
      <Form isLoading={isLoading} onFormSubmitted={() => setValue('')}>
        <SingleLineInput
          placeholderText='Enter Message'
          value={value}
          onValueChanged={setValue}
          messageText='Button is disabled'
        />
        <br />
        <Button
          type='submit'
          isEnabled={false}
          variant='primary'
          text='Submit'
        />
      </Form>
    );
  },

  name: 'Simple',
};

export const Loading = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks, unused-imports/no-unused-vars
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <Form isLoading={isLoading} onFormSubmitted={() => setValue('')}>
        <Stack direction={Direction.Verticl} shouldAddGutter={true}>
          <SingleLineInput
            placeholderText='Enter Message'
            value={value}
            onValueChanged={setValue}
          />
          <SingleLineInput
            placeholderText='Enter Other message'
            value={value}
            onValueChanged={setValue}
            messageText='Button is disabled'
          />
          <br />
          <Button
            type='submit'
            isEnabled={false}
            variant='primary'
            text='Submit'
          />
        </Stack>
      </Form>
    );
  },

  name: 'Loading',
};
