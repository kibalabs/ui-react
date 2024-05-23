import { Box, Text } from "../../particles";
import { ColorSettingView, IColorSettingViewProps } from ".";

const Template = (args) => (
  <ColorSettingView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </ColorSettingView>
);

export default {
  component: ColorSettingView,
  title: "Wrappers/ColorSettingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    theme: {
      text: "orange",
    },
  },
};
