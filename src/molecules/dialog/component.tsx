import React from 'react';

import { ISingleAnyChildProps, useEventListener } from '@kibalabs/core-react';
import styled from 'styled-components';

import { Box } from '../../particles/box';

const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
`;

interface IDialogProps extends ISingleAnyChildProps {
  isOpen: boolean;
  maxHeight?: string;
  maxWidth?: string;
  isScrollableVertically?: boolean;
  isScrollableHorizontally?: boolean;
  onCloseClicked: () => void;
}

export const Dialog = (props: IDialogProps): React.ReactElement | null => {
  const dialogRef = React.useRef();
  const maxWidth = props.maxWidth || '400px';
  const maxHeight = props.maxHeight || '400px';
  const isScrollableHorizontally = props.isScrollableHorizontally || true;
  const isScrollableVertically = props.isScrollableVertically || true;


  const onBackdropClicked = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if (event.target === dialogRef.current) {
      props.onCloseClicked();
    }
  };

  // NOTE(krishan711): this doesn't pass the dependencies in as it should
  useEventListener(document, 'keydown', (event: Event): void => {
    if (props.isOpen && event.key === 'Escape') {
      props.onCloseClicked();
    }
  });

  return props.isOpen ? (
    <StyledBackdrop id='backdrop' ref={dialogRef} onClick={onBackdropClicked}>
      <Box variant='card' width='90%' maxWidth={maxWidth} maxHeight={maxHeight} isScrollableVertically={isScrollableVertically} isScrollableHorizontally={isScrollableHorizontally}>
        {props.children}
      </Box>
    </StyledBackdrop>
  ) : null;
};
