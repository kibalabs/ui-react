import { Markdown, IMarkdownProps } from ".";

const Template = (args) => <Markdown {...args} />;

export default {
  component: Markdown,
  title: "Molecules/Markdown",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    source:
      "this is an **example**\n\nIt's got [links](https://www.kibalabs.com)\n\n![cool image](https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg)",
  },
};

export const MarkdownWithEmbeddedStrong = {
  render: () => (
    <Markdown
      source={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. **Praesent gravida** ante elit, eu ullamcorper lacus posuere fermentum. \n\n**Proin** convallis rhoncus lacus, vitae faucibus dolor sodales quis. Praesent dapibus **ante nec erat** pretium tempor non non elit. Integer dapibus tortor et lacus laoreet, sit amet lacinia neque accumsan. "
      }
    />
  ),

  name: "Markdown with embedded strong",
};

export const MarkdownWithJustStrong = {
  render: () => (
    <Markdown
      source={
        "**Lorem ipsum dolor sit amet, consectetur adipiscing elit**\n\n*Lorem ipsum dolor sit amet, consectetur adipiscing elit*"
      }
    />
  ),

  name: "Markdown with just strong",
};

export const MarkdownWithImageCaption = {
  render: () => (
    <Markdown
      source={
        "![cool icon](https://www.kibalabs.com/_bh20211208082922411123/assets/_generated/favicon-48.png)\nwith caption\n\nThis part is not a caption"
      }
    />
  ),

  name: "Markdown with image caption",
};

export const MarkdownWithTitles = {
  render: () => (
    <Markdown
      source={
        "# H1 \n\n ## H2 \n\n ### H3 \n\n #### H4 \n\n ##### H5 \n\n ###### H6"
      }
    />
  ),

  name: "Markdown with titles",
};

export const MarkdownWithBulletPoints = {
  render: () => (
    <Markdown
      source={"Why UI-React is awesome:\n\n* it just is\n* i told you so"}
    />
  ),
  name: "Markdown with bullet points",
};

export const MarkdownWithBulletPointsAndBolding = {
  render: () => (
    <Markdown
      source={
        "Why UI-React is awesome:\n\n* **something long it just is blah blah blah blah blah** something something something something: \n* i told you so"
      }
    />
  ),

  name: "Markdown with bullet points and bolding",
};

export const MarkdownWithBulletPointsAndTrailingText = {
  render: () => (
    <Markdown
      source={
        "Why UI-React is awesome:\n\n* something something something something: \n* i told you so\n\nSomething else to talk about."
      }
    />
  ),

  name: "Markdown with bullet points and trailing text",
};

export const MarkdownWithBulletPointsAndTrailingHtml = {
  render: () => (
    <Markdown
      source={
        "Why UI-React is awesome:\n\n* something something something something: \n* i told you so\n\n<p><u>Our recommendations</u></p>"
      }
    />
  ),

  name: "Markdown with bullet points and trailing html",
};
