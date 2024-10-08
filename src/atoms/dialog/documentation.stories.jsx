import React from 'react';

import { Dialog } from '.';
import { Button } from '..';
import { Stack } from '../../layouts';
import { Direction } from '../../model';
import { Text, TextAlignment } from '../../particles';

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Dialog {...args} />;
}

export default {
  component: Dialog,
  title: 'Atoms/Dialog',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const SimpleDialog = {
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
        <Dialog
          isOpen={openDialog}
          onCloseClicked={() => setOpenDialog(!openDialog)}
        >
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <Text alignment={TextAlignment.Center}>I&apos;m a Dialog</Text>
            <Button
              variant='primary'
              text='Close'
              onClicked={() => setOpenDialog(!openDialog)}
            />
          </Stack>
        </Dialog>
      </React.Fragment>
    );
  },

  name: 'Simple Dialog',
};

export const NonDismissableDialog = {
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
        <Dialog
          isOpen={openDialog}
          onCloseClicked={() => setOpenDialog(!openDialog)}
          isDismissableByBackdrop={false}
          isDismissableByEscape={false}
        >
          <Text alignment={TextAlignment.Center}>I&apos;m not going anywhere</Text>
        </Dialog>
      </React.Fragment>
    );
  },

  name: 'Non-dismissable Dialog',
};
