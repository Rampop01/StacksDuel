import type { Meta, StoryObj } from '@storybook/react';
// import { ActivityFeed } from '../components/ActivityFeed';

// Mock component for Storybook visualization
const ActivityFeed = (props: any) => <div {...props}>{props.children || 'ActivityFeed Component'}</div>;

const meta = {
  title: 'Components/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'ActivityFeed',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'ActivityFeed',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'ActivityFeed',
  },
};
