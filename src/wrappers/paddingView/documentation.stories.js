import { Box, Text } from "../../particles";
import { PaddingView, IPaddingViewProps } from ".";

const Template = (args) => (
  <PaddingView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </PaddingView>
);

export default {
  component: PaddingView,
  title: "Wrappers/PaddingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
