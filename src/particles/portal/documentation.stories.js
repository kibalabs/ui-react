import React from 'react';

import { Box, Text } from '../../particles';
import { Portal } from '.';

const Template = (args) => <Portal {...args} />;

export default {
  component: Portal,
  title: 'Particles/Portal',
};

export const Default = {
  render: Template.bind({}),
  name: 'Default',
  args: {},
};

export const PlacedAtBottomRight = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='bottom-right'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the bottom-right</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at bottom-right',
};

export const PlacedAtBottomLeft = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='bottom-left'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the bottom-left</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at bottom-left',
};

export const PlacedAtBottomCenter = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='bottom-center'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the bottom-center</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at bottom-center',
};

export const PlacedAtTopRight = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='top-right'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the top-right</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at top-right',
};

export const PlacedAtTopLeft = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='top-left'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the top-left</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at top-left',
};

export const PlacedAtTopCenter = {
  render: () => {
    const ref = React.createRef();

    return (
      <React.Fragment>
        <button ref={ref}>Open Portal</button>
        <Portal anchorElement={ref} placement='top-center'>
          <Box width='200px'>
            <Text>I&apos;m anchored at the top-center</Text>
          </Box>
        </Portal>
      </React.Fragment>
    );
  },

  name: 'Placed at top-center',
};
