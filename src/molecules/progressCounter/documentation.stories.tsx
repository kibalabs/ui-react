import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProgressCounter } from '.';
import { PaddingSize } from '../../particles';

const meta: Meta<typeof ProgressCounter> = {
  component: ProgressCounter,
  title: 'Molecules/ProgressCounter',
};

export default meta;
type Story = StoryObj<typeof ProgressCounter>;

export const Default: Story = {
  args: {
    stepCount: 5,
    selectedStepIndex: 2,
    itemSpacingSize: PaddingSize.Default,
  },
};

export const FirstStep: Story = {
  args: {
    stepCount: 5,
    selectedStepIndex: 0,
    itemSpacingSize: PaddingSize.Default,
  },
};

export const LastStep: Story = {
  args: {
    stepCount: 5,
    selectedStepIndex: 4,
    itemSpacingSize: PaddingSize.Default,
  },
};

export const ManySteps: Story = {
  args: {
    stepCount: 10,
    selectedStepIndex: 5,
    itemSpacingSize: PaddingSize.Default,
  },
};

export const Interactive: Story = {
  render: function InteractiveCounter() {
    const [step, setStep] = React.useState(0);
    const stepCount = 5;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <ProgressCounter stepCount={stepCount} selectedStepIndex={step} itemSpacingSize={PaddingSize.Default} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type='button' onClick={() => setStep(Math.max(0, step - 1))}>Previous</button>
          <button type='button' onClick={() => setStep(Math.min(stepCount - 1, step + 1))}>Next</button>
        </div>
      </div>
    );
  },
};
