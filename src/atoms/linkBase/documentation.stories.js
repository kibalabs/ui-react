import { LinkBase, ILinkBaseProps } from ".";
import { KibaIcon } from "../../particles";

const Template = (args) => (
  <LinkBase {...args}>
    <KibaIcon iconId="ion-bulb" />
  </LinkBase>
);

export default {
  component: LinkBase,
  title: "Atoms/LinkBase",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};

export const Translucent = {
  render: () => (
    <LinkBase variant="translucent">
      <p>I'm a link now</p>
    </LinkBase>
  ),

  name: "Translucent",
};

export const Image = {
  render: () => (
    <LinkBase variant="image">
      <img
        src={
          "https://www.everypagehq.com/20200505212614/assets/everypage-wordmark.svg"
        }
      />
    </LinkBase>
  ),

  name: "Image",
};

export const Card = {
  render: () => (
    <LinkBase variant="card">
      <span>hello world</span>
    </LinkBase>
  ),

  name: "Card",
};

export const LinkWithTarget = {
  render: () => (
    <LinkBase variant="card" target="https://www.everypagehq.com">
      <span>This is anchored</span>
    </LinkBase>
  ),

  name: "Link with target",
};

export const LinkWithoutTarget = {
  render: () => (
    <LinkBase variant="card">
      <span>This is in a button</span>
    </LinkBase>
  ),

  name: "Link without target",
};
