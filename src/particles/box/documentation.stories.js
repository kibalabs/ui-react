import { Box, IBoxProps } from ".";
import { BoxThemeExample } from "./themeExample";
import { PaddingSize, KibaIcon, Image, Text } from "../../particles";
import { LayerContainer, Stack } from "../../layouts";
import { Alignment } from "../../model";

const Template = (args) => (
  <Box {...args}>
    <p>I'm in a box</p>
  </Box>
);

export default {
  component: Box,
  title: "Particles/Box",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};

export const Card = {
  render: () => (
    <Box variant="card">
      <p>I'm in a box</p>
    </Box>
  ),

  name: "Card",
};

export const Bordered = {
  render: () => (
    <Box variant="bordered">
      <p>I'm in a box</p>
    </Box>
  ),

  name: "Bordered",
};

export const Padded = {
  render: () => (
    <Box variant="padded">
      <p>I'm in a box</p>
    </Box>
  ),

  name: "Padded",
};

export const ScrollableHorizontally = {
  render: () => (
    <Box width={"100px"} isScrollableHorizontally={true} isFullHeight={true}>
      <div
        style={{
          backgroundColor: "#dddddd",
          width: "1000px",
          height: "50px",
        }}
      />
    </Box>
  ),

  name: "Scrollable Horizontally",
};

export const ScrollableVertically = {
  render: () => (
    <Box height={"100px"} isScrollableVertically={true} isFullWidth={false}>
      <div
        style={{
          backgroundColor: "#dddddd",
          height: "1000px",
          width: "50px",
        }}
      />
    </Box>
  ),

  name: "Scrollable Vertically",
};

export const EmptyCardWithTooltip = {
  render: () => (
    <Box variant="card" title="Tooltip on the Box" isFullWidth={false} />
  ),
  name: "Empty Card with Tooltip",
};

export const ClippedContent = {
  render: () => (
    <Box
      variant="rounded-borderColored"
      shouldClipContent={true}
      width="200px"
      height="200px"
    >
      <LayerContainer>
        <Box isFullWidth={true} isFullHeight={true}>
          <Image
            fitType="cover"
            isFullHeight={true}
            isFullWidth={true}
            source="https://unsplash.com/photos/gsf4OfORp5c/download?force=true&w=640"
          />
        </Box>
        <LayerContainer.Layer isFullWidth={true} isFullHeight={true}>
          <Box isFullHeight={true}>
            <Stack isFullHeight={true} isFullWidth={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1} />
              <Box variant="padded-overlay">
                <Text variant="paragraph-imageCaption" alignment="center">
                  Hot air balloon
                </Text>
                <br />
              </Box>
            </Stack>
          </Box>
        </LayerContainer.Layer>
      </LayerContainer>
    </Box>
  ),

  name: "Clipped Content",
};

export const ComTestBlock = {
  render: () => <BoxThemeExample />,
  name: "comTestBlock",
};
