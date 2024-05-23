import { Button } from "../../atoms";
import { MessageDialog } from ".";

const Template = (args) => <MessageDialog {...args} />;

export default {
  component: MessageDialog,
  title: "Molecules/MessageDialog",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    title: "Here is something to choose",
    message:
      "And here is some detail about the important choice you are about to make. What do you think?",
  },
};

export const MessageDialog = {
  render: () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <React.Fragment>
        <Button
          variant="primary"
          onClicked={() => setOpenDialog(true)}
          text="Open Dialog"
        />
        <MessageDialog
          isOpen={openDialog}
          title="Message Dialog"
          message="This is a simple message dialog with two  buttons"
          onConfirmClicked={() => {
            console.log("confirm close");
            setOpenDialog(!openDialog);
          }}
          onCloseClicked={() => setOpenDialog(!openDialog)}
        />
      </React.Fragment>
    );
  },

  name: "Message Dialog",
};
