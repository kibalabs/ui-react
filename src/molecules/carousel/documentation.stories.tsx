import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from '.';
import { Box, Image, Text } from '../../particles';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Molecules/Carousel',
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      <Box variant="padded-transparent" isFullWidth={false}>
        <Image
          source="https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
          isLazyLoadable={false}
          isFullHeight={true}
          isFullWidth={true}
        />
      </Box>
      <Box variant="padded-transparent" isFullWidth={false}>
        <Image
          source="https://upload.wikimedia.org/wikipedia/commons/0/0d/Alouatta_guariba.jpg"
          isLazyLoadable={false}
          isFullHeight={true}
          isFullWidth={true}
        />
      </Box>
      <Box variant="padded-transparent" isFullWidth={false}>
        <Image
          source="https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
          isLazyLoadable={false}
          isFullHeight={true}
          isFullWidth={true}
        />
      </Box>
    </Carousel>
  ),
  args: {
    slidesPerPage: 2,
  },
};

export const SingleSlide: Story = {
  render: () => (
    <Carousel slidesPerPage={1}>
      <Box variant="card">
        <Text>Slide 1</Text>
      </Box>
      <Box variant="card">
        <Text>Slide 2</Text>
      </Box>
      <Box variant="card">
        <Text>Slide 3</Text>
      </Box>
    </Carousel>
  ),
};

export const ManySlides: Story = {
  render: () => (
    <Carousel slidesPerPage={3}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <Box key={num} variant="card">
          <Text>Slide {num}</Text>
        </Box>
      ))}
    </Carousel>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Carousel slidesPerPage={2}>
      <Image
        source="https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
        isLazyLoadable={false}
      />
      <Image
        source="https://upload.wikimedia.org/wikipedia/commons/0/0d/Alouatta_guariba.jpg"
        isLazyLoadable={false}
      />
      <Image
        source="https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
        isLazyLoadable={false}
      />
    </Carousel>
  ),
};
