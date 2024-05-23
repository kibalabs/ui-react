import { Pill, IPillProps } from ".";
import { PaddingSize, KibaIcon } from "../../particles";

const Template = (args) => <Pill {...args} />;

export default {
  component: Pill,
  title: "Atoms/Pill",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    text: "Default Pill",
  },
};

export const Primary = {
  render: () => <Pill variant="primary" text="Primary Pill" />,
  name: "Primary",
};

export const Secondary = {
  render: () => <Pill variant="secondary" text="Secondary Pill" />,
  name: "Secondary",
};

export const Success = {
  render: () => <Pill variant="success" text="Success Pill" />,
  name: "Success",
};

export const Error = {
  render: () => <Pill variant="error" text="Error Pill" />,
  name: "Error",
};

export const RightIcon = {
  render: () => (
    <Pill
      iconRight={<KibaIcon iconId="ion-aperture" />}
      text="Pill With Right Icon"
    />
  ),

  name: "Right Icon",
};

export const LeftIcon = {
  render: () => (
    <Pill
      iconLeft={<KibaIcon iconId="ion-aperture" />}
      text="Pill With Left Icon"
    />
  ),
  name: "Left Icon",
};
