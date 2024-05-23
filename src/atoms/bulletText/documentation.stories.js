import { BulletText, IBulletTextProps } from ".";
import { BulletList, IBulletListProps } from "../bulletList";

const Template = (args) => (
  <BulletList>
    <BulletText {...args} />
  </BulletList>
);

export default {
  component: BulletText,
  title: "Atoms/BulletText",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    text: "I'm a bullet",
  },
};

export const SimpleExample = {
  render: () => (
    <BulletList>
      <BulletText>Example bullet</BulletText>
    </BulletList>
  ),

  name: "Simple example",
};
