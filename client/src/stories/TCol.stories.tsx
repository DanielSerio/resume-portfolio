import type { Meta, StoryObj } from '@storybook/react';
import { TCol } from '../components/core/Table/subcomponents/TCol';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof TCol> = {
  title: 'Core/Table/TCol',
  component: TCol,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to display in the column',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextContent: Story = {
  args: {
    children: 'Simple text content',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer text content that might wrap to multiple lines depending on the column width',
  },
};

export const WithBadge: Story = {
  args: {
    children: <Badge variant="secondary">Active</Badge>,
  },
};

export const WithMultipleElements: Story = {
  args: {
    children: (
      <div className="flex items-center gap-2">
        <Badge variant="outline">Admin</Badge>
        <span>John Doe</span>
      </div>
    ),
  },
};

export const NumericContent: Story = {
  args: {
    children: <span className="font-mono">$1,234.56</span>,
  },
};

export const EmptyContent: Story = {
  args: {
    children: null,
  },
};

export const ButtonContent: Story = {
  args: {
    children: (
      <button className="text-blue-600 hover:text-blue-800 text-sm">
        Edit
      </button>
    ),
  },
};