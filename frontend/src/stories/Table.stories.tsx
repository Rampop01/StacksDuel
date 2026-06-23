import type { Meta, StoryObj } from '@storybook/react';
// import { Table } from '../components/Table';

// Mock component for Storybook visualization
const Table = (props: any) => <div {...props}>{props.children || 'Table Component'}</div>;

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Table',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Table',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Table',
  },
};
