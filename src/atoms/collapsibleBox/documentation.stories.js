import {
  CollapsibleBox,
  ICollapsibleBoxProps,
  StatefulCollapsibleBox,
} from ".";

const Template = (args) => (
  <CollapsibleBox {...args}>
    <span>This is the content inside the box</span>
  </CollapsibleBox>
);

export default {
  component: CollapsibleBox,
  title: "Atoms/CollapsibleBox",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    headerView: (
      <div
        style={{
          height: "50px",
          backgroundColor: "yellow",
          width: "100%",
        }}
      >
        My Cool Box
      </div>
    ),

    onCollapseToggled: () => {},
  },
};

export const Stateful = {
  render: () => (
    <StatefulCollapsibleBox
      headerView={
        <div
          style={{
            height: "50px",
            backgroundColor: "yellow",
            width: "100%",
          }}
        >
          Stateful CollapsibleBox
        </div>
      }
    >
      <span>This is the content inside the box</span>
    </StatefulCollapsibleBox>
  ),

  name: "Stateful",
};

export const StatefulUnpadded = {
  render: () => (
    <StatefulCollapsibleBox
      variant="unpaddedHeader"
      shouldHideIndicator={true}
      headerView={
        <div
          style={{
            height: "50px",
            backgroundColor: "yellow",
            width: "100%",
          }}
        >
          Stateful CollapsibleBox (no padding)
        </div>
      }
    >
      <span>This is the content inside the box</span>
    </StatefulCollapsibleBox>
  ),

  name: "Stateful unpadded",
};

export const StatefulCollapsed = {
  render: () => (
    <StatefulCollapsibleBox
      headerView={
        <div
          style={{
            height: "50px",
            backgroundColor: "yellow",
            width: "100%",
          }}
        >
          Stateful CollapsibleBox (collapsed initially)
        </div>
      }
      isCollapsedInitially={true}
    >
      <span>This is the content inside the box</span>
    </StatefulCollapsibleBox>
  ),

  name: "Stateful Collapsed",
};
