import { Button, IButtonProps } from ".";
import { ButtonThemeExample } from "./themeExample";
import { EqualGrid, Stack } from "../../layouts";
import { Direction } from "../../model";
import { Box, KibaIcon, Text } from "../../particles";
import { MultiLineInput } from "../../molecules";
import { buildTheme, ThemeProvider } from "../../theming";

const Template = (args) => <Button {...args} />;

export default {
  component: Button,
  title: "Atoms/Button",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    text: "Default Button",
  },
};

export const Primary = {
  render: () => <Button variant="primary" text="Primary Button" />,
  name: "Primary",
};

export const Secondary = {
  render: () => <Button variant="secondary" text="Secondary Button" />,
  name: "Secondary",
};

export const RightIcon = {
  render: () => (
    <Button
      iconRight={<KibaIcon iconId="ion-aperture" />}
      text="Button With Right Icon"
    />
  ),

  name: "Right Icon",
};

export const LeftIcon = {
  render: () => (
    <Button
      iconLeft={<KibaIcon iconId="ion-aperture" />}
      text="Button With Left Icon"
    />
  ),

  name: "Left Icon",
};

export const Disabled = {
  render: () => <Button isEnabled={false} text="Button Disabled" />,
  name: "Disabled",
};

export const FullWidth = {
  render: () => (
    <Button
      text="Full width"
      iconLeft={<KibaIcon iconId="ion-aperture" />}
      iconRight={<KibaIcon iconId="ion-aperture" />}
      isFullWidth={true}
    />
  ),

  name: "Full width",
};

export const EndAligned = {
  render: () => (
    <Button
      text="End-aligned"
      iconLeft={<KibaIcon iconId="ion-aperture" />}
      iconRight={<KibaIcon iconId="ion-aperture" />}
      isFullWidth={true}
      theme={{
        normal: {
          default: {
            text: {
              "text-align": "end",
            },
          },
        },
      }}
    />
  ),

  name: "End-aligned",
};

export const CompTestBlock = {
  render: () => <ButtonThemeExample />,
  name: "compTestBlock",
};
