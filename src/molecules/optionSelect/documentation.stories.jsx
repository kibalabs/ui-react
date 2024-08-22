import React from 'react';

import { OptionSelect } from '.';

function Template(args) {
  const [selectedItemKey, setSelectedItemKey] = React.useState('');
  const options = [
    { itemKey: '1', text: 'First Option' },
    { itemKey: '2', text: 'Second Option' },
    { itemKey: '3', text: 'Third Option' },
  ];
  return (
    <div style={{ height: '250px' }}>
      <OptionSelect
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        selectedItemKey={args.selectedItemKey || selectedItemKey}
        options={args.options || options}
        onItemClicked={args.onItemClicked || setSelectedItemKey}
      />
    </div>
  );
}

export default {
  component: OptionSelect,
  title: 'Molecules/OptionSelect',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const LongOption = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedItemKey, setSelectedItemKey] = React.useState('');

    const options = [
      {
        itemKey: '1',
        text: '1',
      },
      {
        itemKey: '2',
        text: '2',
      },
      {
        itemKey: '3',
        text: 'This is a very very long option',
      },
    ];

    return (
      <div
        style={{
          height: '250px',
        }}
      >
        <OptionSelect
          isFullWidth={false}
          selectedItemKey={selectedItemKey}
          options={options}
          onItemClicked={setSelectedItemKey}
        />
      </div>
    );
  },

  name: 'Long option',
};
