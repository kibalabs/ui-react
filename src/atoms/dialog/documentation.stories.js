import { Text, TextAlignment } from "../../particles";
import { Button } from "../../atoms";
import { Stack } from "../../layouts";
import { Alignment, Direction } from "../../model";
import { Dialog } from ".";

const Template = (args) => <Dialog {...args} />;

export default {
  component: Dialog,
  title: "Atoms/Dialog",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};

export const SimpleDialog = {
  render: () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <React.Fragment>
        <Button
          variant="primary"
          onClicked={() => setOpenDialog(true)}
          text="Open Dialog"
        />
        <Dialog
          isOpen={openDialog}
          onCloseClicked={() => setOpenDialog(!openDialog)}
        >
          <Stack direction={Direction.Vertical} shouldAddGutters={true}>
            <Text alignment={TextAlignment.Center}>I'm a Dialog</Text>
            <Button
              variant="primary"
              text="Close"
              onClicked={() => setOpenDialog(!openDialog)}
            />
          </Stack>
        </Dialog>
      </React.Fragment>
    );
  },

  name: "Simple Dialog",
};

export const NonDismissableDialog = {
  render: () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <React.Fragment>
        <Button
          variant="primary"
          onClicked={() => setOpenDialog(true)}
          text="Open Dialog"
        />
        <Dialog
          isOpen={openDialog}
          onCloseClicked={() => setOpenDialog(!openDialog)}
          isDismissableByBackdrop={false}
          isDismissableByEscape={false}
        >
          <Text alignment={TextAlignment.Center}>I'm not going anywhere</Text>
        </Dialog>
      </React.Fragment>
    );
  },

  name: "Non-dismissable Dialog",
};
