import { Text, ITextProps } from ".";

const Template = (args) => <Text {...args}>Every word tells a story</Text>;

export default {
  component: Text,
  title: "Particles/Text",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};

export const Paragraph = {
  render: () => <Text variant="paragraph">Every word tells a story</Text>,
  name: "paragraph",
};

export const Inline = {
  render: () => <Text variant="inline">Every word tells a story</Text>,
  name: "inline",
};

export const Bold = {
  render: () => <Text variant="bold">Every word tells a story</Text>,
  name: "bold",
};

export const Strong = {
  render: () => <Text variant="strong">Every word tells a story</Text>,
  name: "strong",
};

export const Italic = {
  render: () => <Text variant="italic">Every word tells a story</Text>,
  name: "italic",
};

export const Emphasis = {
  render: () => <Text variant="emphasis">Every word tells a story</Text>,
  name: "emphasis",
};

export const Underline = {
  render: () => <Text variant="underline">Every word tells a story</Text>,
  name: "underline",
};

export const Mark = {
  render: () => <Text variant="mark">Every word tells a story</Text>,
  name: "mark",
};

export const Small = {
  render: () => <Text variant="small">Every word tells a story</Text>,
  name: "small",
};

export const Deleted = {
  render: () => <Text variant="deleted">Every word tells a story</Text>,
  name: "deleted",
};

export const Inserted = {
  render: () => <Text variant="inserted">Every word tells a story</Text>,
  name: "inserted",
};

export const Subscript = {
  render: () => <Text variant="subscript">Every word tells a story</Text>,
  name: "subscript",
};

export const Superscript = {
  render: () => <Text variant="superscript">Every word tells a story</Text>,
  name: "superscript",
};

export const Header = {
  render: () => <Text variant="header">Every word tells a story</Text>,
  name: "header",
};

export const Title = {
  render: () => <Text variant="title">Every word tells a story</Text>,
  name: "title",
};

export const Subtitle = {
  render: () => <Text variant="subtitle">Every word tells a story</Text>,
  name: "subtitle",
};

export const Header1 = {
  render: () => <Text variant="header1">Every word tells a story</Text>,
  name: "header1",
};

export const Header2 = {
  render: () => <Text variant="header2">Every word tells a story</Text>,
  name: "header2",
};

export const Header3 = {
  render: () => <Text variant="header3">Every word tells a story</Text>,
  name: "header3",
};

export const Header4 = {
  render: () => <Text variant="header4">Every word tells a story</Text>,
  name: "header4",
};

export const Header5 = {
  render: () => <Text variant="header5">Every word tells a story</Text>,
  name: "header5",
};

export const Header6 = {
  render: () => <Text variant="header6">Every word tells a story</Text>,
  name: "header6",
};

export const Note = {
  render: () => <Text variant="note">Every word tells a story</Text>,
  name: "note",
};

export const Supersize = {
  render: () => <Text variant="supersize">Every word tells a story</Text>,
  name: "supersize",
};

export const Unmargined = {
  render: () => <Text variant="unmargined">Every word tells a story</Text>,
  name: "unmargined",
};

export const Margined = {
  render: () => <Text variant="margined">Every word tells a story</Text>,
  name: "margined",
};

export const Colored = {
  render: () => <Text variant="colored">Every word tells a story</Text>,
  name: "colored",
};

export const SingleLineTextView = {
  render: () => (
    <Text lineLimit={1}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Text>
  ),
  name: "Single Line Text View",
};

export const MultipleLineTextView = {
  render: () => (
    <Text lineLimit={3}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Text>
  ),
  name: "Multiple Line Text View",
};
