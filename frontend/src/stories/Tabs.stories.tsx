import type { Meta, StoryObj } from '@storybook/react';
// import { Tabs } from '../components/Tabs';

// Mock component for Storybook visualization
const Tabs = (props: any) => <div {...props}>{props.children || 'Tabs Component'}</div>;

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Tabs',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Tabs',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Tabs',
  },
};
