import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Pagination} from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {args: {}};
