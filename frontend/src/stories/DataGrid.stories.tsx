import type { Meta, StoryObj } from '@storybook/react';
// import { DataGrid } from '../components/DataGrid';

// Mock component for Storybook visualization
const DataGrid = (props: any) => <div {...props}>{props.children || 'DataGrid Component'}</div>;

const meta = {
  title: 'Components/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'DataGrid',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'DataGrid',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'DataGrid',
  },
};
