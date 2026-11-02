import { Dropzone } from '.';

function Template(args) {
  return <Dropzone {...args} />;
}

export default {
  component: Dropzone,
  title: 'Extras/Dropzone',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const WithText = {
  render: () => (
    <Dropzone>
      <p>Pick a card</p>
    </Dropzone>
  ),

  name: 'With text',
};
