import { IconButton, IIconButtonProps } from ".";
import { PaddingSize, KibaIcon } from "../../particles";

const Template = (args) => (
  <IconButton {...args} icon={<KibaIcon iconId="ion-bulb" />} />
);

export default {
  component: IconButton,
  title: "Atoms/IconButton",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    icon: <KibaIcon iconId="ion-bulb" />,
  },
};

export const Primary = {
  render: () => (
    <IconButton variant="primary" icon={<KibaIcon iconId="ion-bulb" />} />
  ),
  name: "Primary",
};

export const Secondary = {
  render: () => (
    <IconButton variant="secondary" icon={<KibaIcon iconId="ion-bulb" />} />
  ),
  name: "Secondary",
};

export const Disabled = {
  render: () => (
    <IconButton
      variant="primary"
      isEnabled={false}
      icon={<KibaIcon iconId="ion-bulb" />}
    />
  ),
  name: "Disabled",
};
