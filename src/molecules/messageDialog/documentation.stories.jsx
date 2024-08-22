import React from 'react';

import { MessageDialog } from '.';
import { Button } from '../../atoms';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MessageDialog {...args} />;
}

export default {
  component: MessageDialog,
  title: 'Molecules/MessageDialog',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',

  args: {
    title: 'Here is something to choose',
    message:
      'And here is some detail about the important choice you are about to make. What do you think?',
  },
};

export const ExampleMessageDialog = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <React.Fragment>
        <Button
          variant='primary'
          onClicked={() => setOpenDialog(true)}
          text='Open Dialog'
        />
        <MessageDialog
          isOpen={openDialog}
          title='Message Dialog'
          message='This is a simple message dialog with two  buttons'
          onConfirmClicked={() => {
            // eslint-disable-next-line no-console
            console.log('confirm close');
            setOpenDialog(!openDialog);
          }}
          onCloseClicked={() => setOpenDialog(!openDialog)}
        />
      </React.Fragment>
    );
  },

  name: 'Message Dialog',
};
