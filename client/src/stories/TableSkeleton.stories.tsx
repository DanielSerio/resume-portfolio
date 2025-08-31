import type { Meta, StoryObj } from '@storybook/react';
import { TableSkeleton } from '../components/core/Table/subcomponents/TableSkeleton';

const meta: Meta<typeof TableSkeleton> = {
  title: 'Core/Table/TableSkeleton',
  component: TableSkeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gridTemplateColumns: {
      control: 'text',
      description: 'CSS grid template columns string',
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of skeleton rows to display',
    },
    columns: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of skeleton columns per row',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr 1fr',
    rows: 5,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    gridTemplateColumns: '2fr 1fr',
    rows: 3,
    columns: 2,
  },
};

export const ManyRows: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    rows: 10,
    columns: 4,
  },
};

export const WideTable: Story = {
  args: {
    gridTemplateColumns: '1fr 2fr 1fr 1fr 3fr',
    rows: 4,
    columns: 5,
  },
};

export const SingleColumn: Story = {
  args: {
    gridTemplateColumns: '1fr',
    rows: 8,
    columns: 1,
  },
};