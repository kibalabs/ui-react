import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';

import { IMoleculeProps, defaultMoleculeProps } from '../moleculeProps';
import { ProgressCounterItem, IProgressCounterItemTheme } from '../../atoms';
import { Direction } from '../../model';
import { PaddingSize, Spacing } from '../../subatoms';

export interface IProgressCounterTheme {
  progressCounterItemTheme: IProgressCounterItemTheme;
}

interface IStyledProgressCounterProps {
  theme: IProgressCounterTheme;
}

const StyledProgressCounter = styled.div<IStyledProgressCounterProps>`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: auto;
`;

// TODO(krish): this can probably be abstracted into a tabbar + tab component
export interface IProgressCounterProps extends IMoleculeProps<IProgressCounterTheme> {
  stepCount: number;
  selectedStepIndex: number;
  progressCounterItemMode?: string;
  itemSpacingSize: PaddingSize;
  isSelectable?: (step: number) => boolean;
}

export const ProgressCounter = (props: IProgressCounterProps): React.ReactElement => {
  return (
    <StyledProgressCounter
      id={props.id}
      className={getClassName(ProgressCounter.displayName, props.className)}
    >
      {Array(props.stepCount).fill(null).map((_: any, index: number): React.ReactElement => {
        return (
          <React.Fragment key={index}>
            <ProgressCounterItem
              id={props.id && `${props.id}-item-${index}`}
              theme={props.theme?.progressCounterItemTheme}
              mode={props.progressCounterItemMode}
              text={String(index + 1)}
              isEnabled={props.isSelectable ? props.isSelectable(index) : false}
              isSelected={props.selectedStepIndex === index}
            />
            {index < props.stepCount - 1 && <Spacing direction={Direction.Horizontal} mode={props.itemSpacingSize} />}
          </React.Fragment>
        );
      })}
    </StyledProgressCounter>
  );
};

ProgressCounter.defaultProps = {
  ...defaultMoleculeProps,
  itemSpacingSize: PaddingSize.Default,
};
