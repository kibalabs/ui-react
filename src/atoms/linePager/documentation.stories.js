import { LinePager, ILinePagerProps } from ".";
import { PaddingSize, KibaIcon } from "../../particles";

const Template = (args) => <LinePager {...args} />;

export default {
  component: LinePager,
  title: "Atoms/LinePager",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    pageCount: 5,
    activePageIndex: 1,
  },
};

export const Simple = {
  render: () => (
    <LinePager variant="default" pageCount={5} activePageIndex={1} />
  ),
  name: "Simple",
};

export const Many = {
  render: () => (
    <LinePager variant="default" pageCount={500} activePageIndex={1} />
  ),
  name: "Many",
};
