import type { Meta, StoryObj } from '@storybook/react';
// import { Sidebar } from '../components/Sidebar';

// Mock component for Storybook visualization
const Sidebar = (props: any) => <div {...props}>{props.children || 'Sidebar Component'}</div>;

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Sidebar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Sidebar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Sidebar',
  },
};
