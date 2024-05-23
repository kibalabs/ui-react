import { WebView, IWebViewProps } from ".";

const Template = (args) => (
  <div style={{ height: "300px" }}>
    <WebView {...args} />
  </div>
);

export default {
  component: WebView,
  title: "Atoms/WebView",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    url: "https://www.kibalabs.com",
  },
};

export const WithError = {
  render: () => (
    <div
      style={{
        height: "300px",
      }}
    >
      <WebView url={"https://www.google.com"} />
    </div>
  ),

  name: "With Error",
};

export const WithAspectRatio = {
  render: () => (
    <WebView
      url={"https://www.youtube.com/embed/_tUCouKc4Ek"}
      aspectRatio={0.5625}
    />
  ),
  name: "With Aspect Ratio",
};

export const WithLazyLoading = {
  render: () => (
    <WebView
      url={"https://www.kibalabs.com"}
      aspectRatio={0.5625}
      isLazyLoadable={true}
    />
  ),

  name: "With Lazy Loading",
};
