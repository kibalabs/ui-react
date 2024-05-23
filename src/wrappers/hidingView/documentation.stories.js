import { Box, Text } from "../../particles";
import { HidingView, IHidingViewProps } from ".";

const Template = (args) => (
  <HidingView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </HidingView>
);

export default {
  component: HidingView,
  title: "Wrappers/HidingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
