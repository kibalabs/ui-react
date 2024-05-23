import { Box, Text } from "../../particles";
import {
  ResponsiveTextAlignmentView,
  IResponsiveTextAlignmentViewProps,
} from ".";

const Template = (args) => (
  <ResponsiveTextAlignmentView {...args}>
    <Box variant="card">
      <Text>I'm wrapped</Text>
    </Box>
  </ResponsiveTextAlignmentView>
);

export default {
  component: ResponsiveTextAlignmentView,
  title: "Wrappers/ResponsiveTextAlignmentView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
