import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Menu} from './Menu';

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {args: {}};
