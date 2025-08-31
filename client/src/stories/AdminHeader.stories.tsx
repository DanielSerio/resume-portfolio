import type { Meta, StoryObj } from '@storybook/react';
import { AdminHeader } from '../components/layout/admin/AdminHeader';

const meta: Meta<typeof AdminHeader> = {
  title: 'Layout/AdminHeader',
  component: AdminHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Header content for admin pages',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="px-4 py-2">Admin Panel</div>,
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
    ),
  },
};

export const WithBreadcrumb: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <nav className="text-sm text-muted-foreground mb-1">
          Admin / Dashboard
        </nav>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
    ),
  },
};

export const WithPageActions: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <nav className="text-sm text-muted-foreground mb-1">
            Admin / Users
          </nav>
          <h1 className="text-xl font-semibold">User Management</h1>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
          Add User
        </button>
      </div>
    ),
  },
};

export const WithStats: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold mb-3">System Overview</h1>
        <div className="flex space-x-6 text-sm">
          <div>
            <span className="text-muted-foreground">Users: </span>
            <span className="font-medium">1,234</span>
          </div>
          <div>
            <span className="text-muted-foreground">Active Sessions: </span>
            <span className="font-medium">89</span>
          </div>
          <div>
            <span className="text-muted-foreground">System Status: </span>
            <span className="font-medium text-green-600">Healthy</span>
          </div>
        </div>
      </div>
    ),
  },
};