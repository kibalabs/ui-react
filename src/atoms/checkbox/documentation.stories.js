import { Checkbox, ICheckboxProps } from ".";
import { PaddingSize, KibaIcon } from "../../particles";

const Template = (args) => <Checkbox {...args} />;

export default {
  component: Checkbox,
  title: "Atoms/Checkbox",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    text: "Default Checkbox",
  },
};

export const WrappedState = {
  render: () => {
    const [isChecked, setIsChecked] = React.useState(true);

    return (
      <Checkbox
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
        text="A Simple Checkbox"
      />
    );
  },

  name: "Wrapped state",
};

export const Disabled = {
  render: () => {
    const [isChecked, setIsChecked] = React.useState(true);

    return (
      <Checkbox
        isChecked={isChecked}
        onToggled={() => setIsChecked(!isChecked)}
        isDisabled={true}
        text="Disabled Checkbox"
      />
    );
  },

  name: "Disabled",
};
