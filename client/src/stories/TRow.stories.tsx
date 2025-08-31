import type { Meta, StoryObj } from '@storybook/react';
import { TRow } from '../components/core/Table/subcomponents/TRow';
import { TCol } from '../components/core/Table/subcomponents/TCol';

const meta: Meta<typeof TRow> = {
  title: 'Core/Table/TRow',
  component: TRow,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'boolean',
      description: 'Whether this is a header row',
    },
    gridTemplateColumns: {
      control: 'text',
      description: 'CSS grid template columns string',
    },
    children: {
      control: false,
      description: 'TCol components',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr 1fr',
    header: false,
    children: (
      <>
        <TCol>John Doe</TCol>
        <TCol>john@example.com</TCol>
        <TCol>Developer</TCol>
      </>
    ),
  },
};

export const HeaderRow: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr 1fr',
    header: true,
    children: (
      <>
        <TCol>Name</TCol>
        <TCol>Email</TCol>
        <TCol>Role</TCol>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    gridTemplateColumns: '2fr 1fr',
    header: false,
    children: (
      <>
        <TCol>Long Product Name That Wraps</TCol>
        <TCol>$99.99</TCol>
      </>
    ),
  },
};

export const ManyColumns: Story = {
  args: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    header: false,
    children: (
      <>
        <TCol>ID</TCol>
        <TCol>Name</TCol>
        <TCol>Email</TCol>
        <TCol>Role</TCol>
        <TCol>Status</TCol>
      </>
    ),
  },
};

export const CustomWidths: Story = {
  args: {
    gridTemplateColumns: '50px 2fr 1fr 80px',
    header: true,
    children: (
      <>
        <TCol>#</TCol>
        <TCol>Description</TCol>
        <TCol>Category</TCol>
        <TCol>Actions</TCol>
      </>
    ),
  },
};