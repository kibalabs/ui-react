import { SelectableView, ISelectableViewProps } from ".";
import { KibaIcon } from "../../particles";

const Template = (args) => (
  <SelectableView {...args}>
    <KibaIcon iconId="ion-bulb" />
  </SelectableView>
);

export default {
  component: SelectableView,
  title: "Atoms/SelectableView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};
