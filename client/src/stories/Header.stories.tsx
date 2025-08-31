import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Header content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="px-4 py-2">Header Content</div>,
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">Application Title</h1>
      </div>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <nav className="px-4 py-2">
        <ul className="flex space-x-6">
          <li><a href="#" className="text-primary hover:underline">Home</a></li>
          <li><a href="#" className="text-primary hover:underline">About</a></li>
          <li><a href="#" className="text-primary hover:underline">Contact</a></li>
        </ul>
      </nav>
    ),
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">Main Title</h1>
        <p className="text-sm text-muted-foreground">Subtitle or description</p>
      </div>
    ),
  },
};

export const WithComplexLayout: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back!</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-primary hover:underline">Settings</button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    ),
  },
};