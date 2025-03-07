import React from 'react';

import { getClassName } from '@kibalabs/core';
import { styled } from 'styled-components';

import { IProgressCounterItemTheme, ProgressCounterItem } from '../../atoms';
import { Direction } from '../../model';
import { PaddingSize, Spacing } from '../../particles';
import { IMoleculeProps } from '../moleculeProps';

export interface IProgressCounterTheme {
  progressCounterItemTheme: IProgressCounterItemTheme;
}

interface IStyledProgressCounterProps {
}

const StyledProgressCounter = styled.div<IStyledProgressCounterProps>`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: auto;
`;

// TODO(krishan711): this can probably be abstracted into a tabbar + tab component
export interface IProgressCounterProps extends IMoleculeProps<IProgressCounterTheme> {
  stepCount: number;
  selectedStepIndex: number;
  progressCounterItemVariant?: string;
  itemSpacingSize: PaddingSize;
  isSelectable?: (step: number) => boolean;
}

export function ProgressCounter({
  className = '',
  itemSpacingSize = PaddingSize.Default,
  ...props
}: IProgressCounterProps): React.ReactElement {
  return (
    <StyledProgressCounter
      id={props.id}
      className={getClassName(ProgressCounter.displayName, className)}
    >
      {Array(props.stepCount).fill(null).map((_: unknown, index: number): React.ReactElement => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <ProgressCounterItem
              id={props.id && `${props.id}-item-${index}`}
              theme={props.theme?.progressCounterItemTheme}
              variant={props.progressCounterItemVariant}
              text={String(index + 1)}
              isEnabled={props.isSelectable ? props.isSelectable(index) : false}
              isSelected={props.selectedStepIndex === index}
            />
            {index < props.stepCount - 1 && <Spacing direction={Direction.Horizontal} variant={itemSpacingSize} />}
          </React.Fragment>
        );
      })}
    </StyledProgressCounter>
  );
}
ProgressCounter.displayName = 'KibaProgressCounter';
