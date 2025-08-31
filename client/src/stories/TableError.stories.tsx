import type { Meta, StoryObj } from '@storybook/react';
import { TableError } from '../components/core/Table/subcomponents/TableError';

const meta: Meta<typeof TableError> = {
  title: 'Core/Table/TableError',
  component: TableError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: false,
      description: 'Error object to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error('Failed to load data'),
  },
};

export const NetworkError: Story = {
  args: {
    error: new Error('Network request failed. Please check your connection.'),
  },
};

export const ValidationError: Story = {
  args: {
    error: new Error('Invalid data format received from server'),
  },
};

export const LongErrorMessage: Story = {
  args: {
    error: new Error('This is a very long error message that demonstrates how the component handles extensive error descriptions that might wrap to multiple lines and still remain readable and well-formatted.'),
  },
};