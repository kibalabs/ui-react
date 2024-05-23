import { Box, Text } from "../../particles";
import { ResponsiveContainingView, IResponsiveContainingViewProps } from ".";

const Template = (args) => (
  <ResponsiveContainingView {...args}>
    <Box variant="card">
      <Box width={"2000px"}>
        <Text>I'm wrapped</Text>
      </Box>
    </Box>
  </ResponsiveContainingView>
);

export default {
  component: ResponsiveContainingView,
  title: "Wrappers/ResponsiveContainingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    size: 10,
  },
};
