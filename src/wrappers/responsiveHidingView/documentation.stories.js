import { Box, Text } from "../../particles";
import { ResponsiveHidingView, IResponsiveHidingViewProps } from ".";

const Template = (args) => (
  <ResponsiveHidingView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </ResponsiveHidingView>
);

export default {
  component: ResponsiveHidingView,
  title: "Wrappers/ResponsiveHidingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
