import { Box, Text } from "../../particles";
import { BackgroundView, IBackgroundViewProps } from ".";

const Template = (args) => (
  <BackgroundView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </BackgroundView>
);

export default {
  component: BackgroundView,
  title: "Wrappers/BackgroundView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    color: "lightblue",
  },
};
