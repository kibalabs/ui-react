import { InputFrame, IInputFrameProps } from ".";

const Template = (args) => <InputFrame {...args} />;

export default {
  component: InputFrame,
  title: "Molecules/InputFrame",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    placeholderText: "What do you say?",
  },
};
