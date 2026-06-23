import type { Meta, StoryObj } from '@storybook/react';
// import { NotificationItem } from '../components/NotificationItem';

// Mock component for Storybook visualization
const NotificationItem = (props: any) => <div {...props}>{props.children || 'NotificationItem Component'}</div>;

const meta = {
  title: 'Components/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'NotificationItem',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'NotificationItem',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'NotificationItem',
  },
};
