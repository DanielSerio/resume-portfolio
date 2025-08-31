import type { Meta, StoryObj } from '@storybook/react';
import { ResumeHeader } from '../components/layout/resume/ResumeHeader';

const meta: Meta<typeof ResumeHeader> = {
  title: 'Layout/ResumeHeader',
  component: ResumeHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};