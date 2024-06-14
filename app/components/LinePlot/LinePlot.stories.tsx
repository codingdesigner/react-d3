import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {LinePlot} from './LinePlot';

const meta: Meta<typeof LinePlot> = {
  component: LinePlot,
};

export default meta;

type Story = StoryObj<typeof LinePlot>;

export const Basic: Story = {args: {}};
