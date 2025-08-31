import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/core/Table/Table';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const meta: Meta<typeof Table> = {
  title: 'Core/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    table: {
      control: false,
      description: 'TanStack React Table instance',
    },
    gridTemplateColumns: {
      control: 'text',
      description: 'CSS grid template columns string',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: false,
      description: 'Error object for error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for stories
type MockData = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const mockData: MockData[] = [
  { id: 'John%20Doe', name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 'Jane%20Smith', name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 'Bob%20Johnson', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  { id: 'Alice%20Brown', name: 'Alice Brown', email: 'alice@example.com', role: 'Analyst' },
];

const columnHelper = createColumnHelper<MockData>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => info.getValue(),
  }),
];

// Story wrapper to create table instance
const TableWrapper = (args: any) => {
  const table = useReactTable({
    data: args.data || mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      table={table}
      gridTemplateColumns={args.gridTemplateColumns}
      isLoading={args.isLoading}
      error={args.error}
    />
  );
};

export const Default: Story = {
  render: () => <TableWrapper gridTemplateColumns="1fr 1fr 1fr" />,
};

export const Loading: Story = {
  render: () => (
    <TableWrapper 
      gridTemplateColumns="1fr 1fr 1fr" 
      isLoading={true} 
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <TableWrapper 
      gridTemplateColumns="1fr 1fr 1fr" 
      error={new Error('Failed to load data')} 
    />
  ),
};

export const EmptyData: Story = {
  render: () => (
    <TableWrapper 
      gridTemplateColumns="1fr 1fr 1fr" 
      data={[]} 
    />
  ),
};

export const CustomGridLayout: Story = {
  render: () => (
    <TableWrapper 
      gridTemplateColumns="2fr 3fr 1fr" 
    />
  ),
};