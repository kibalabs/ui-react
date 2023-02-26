import React from 'react';

import { Box, Button, PaddingSize, Spacing, Text } from '@kibalabs/ui-react';

export const HomePage = (): React.ReactElement => {
  return (
    <Box variant='card-bordered' width='200px'>
      <Text>hello world it's me, can you hear me and see me?</Text>
      <Spacing variant={PaddingSize.Wide2} />
      <Button variant='primary-large' text='click me' target='/' theme={{normal:{default:{text:{color:'green'}}}}} />
    </Box>
  );
};
