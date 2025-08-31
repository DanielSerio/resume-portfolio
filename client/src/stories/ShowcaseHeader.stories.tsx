import type { Meta, StoryObj } from '@storybook/react';
import { ShowcaseHeader } from '../components/layout/showcase/ShowcaseHeader';

const meta: Meta<typeof ShowcaseHeader> = {
  title: 'Layout/ShowcaseHeader',
  component: ShowcaseHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Header content for showcase pages',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="px-4 py-2">Showcase</div>,
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <h1 className="text-2xl font-light">Portfolio Showcase</h1>
      </div>
    ),
  },
};

export const WithProjectTitle: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <nav className="text-sm text-muted-foreground mb-1">
          Portfolio / Projects
        </nav>
        <h1 className="text-2xl font-light">E-Commerce Platform</h1>
        <p className="text-muted-foreground">Full-stack web application</p>
      </div>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <h1 className="text-2xl font-light">Dan Serio</h1>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li><a href="#" className="text-primary hover:underline">Projects</a></li>
            <li><a href="#" className="text-primary hover:underline">About</a></li>
            <li><a href="#" className="text-primary hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    ),
  },
};

export const WithProjectMetadata: Story = {
  args: {
    children: (
      <div className="px-4 py-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-light mb-1">React Dashboard</h1>
            <p className="text-muted-foreground mb-2">Modern admin interface built with React and TypeScript</p>
            <div className="flex space-x-4 text-xs">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">TypeScript</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">TailwindCSS</span>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Last updated: Mar 2024</div>
            <div>Status: Active</div>
          </div>
        </div>
      </div>
    ),
  },
};