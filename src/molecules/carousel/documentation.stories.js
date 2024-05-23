import { Box, Image } from "../../particles";
import { Carousel, ICarouselProps } from ".";

const Template = (args) => (
  <Carousel {...args}>
    <Box variant="padded-transparent" isFullWidth={false}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
        }
        isLazyLoadable={false}
        isFullHeight={true}
        isFullWidth={true}
      />
    </Box>
    <Box variant="padded-transparent" isFullWidth={false}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/Alouatta_guariba.jpg"
        }
        isLazyLoadable={false}
        isFullHeight={true}
        isFullWidth={true}
      />
    </Box>
    <Box variant="padded-transparent" isFullWidth={false}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
        }
        isLazyLoadable={false}
        isFullHeight={true}
        isFullWidth={true}
      />
    </Box>
    <Box variant="padded-transparent" isFullWidth={false}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/Alouatta_guariba.jpg"
        }
        isLazyLoadable={false}
        isFullHeight={true}
        isFullWidth={true}
      />
    </Box>
    <Box variant="padded-transparent" isFullWidth={false}>
      <Image
        source={
          "https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg"
        }
        isLazyLoadable={false}
        isFullHeight={true}
        isFullWidth={true}
      />
    </Box>
  </Carousel>
);

export default {
  component: Carousel,
  title: "Molecules/Carousel",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",

  args: {
    slidesPerPage: 3,
  },
};
