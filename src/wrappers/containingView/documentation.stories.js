import { Box, Text } from "../../particles";
import { ContainingView, IContainingViewProps } from ".";

const Template = (args) => (
  <ContainingView {...args}>
    <Box variant="card">
      <Box width={"2000px"}>
        <Text>I'm wrapped</Text>
      </Box>
    </Box>
  </ContainingView>
);

export default {
  component: ContainingView,
  title: "Wrappers/ContainingView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
