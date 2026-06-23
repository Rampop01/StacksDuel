import type { Meta, StoryObj } from '@storybook/react';
// import { NotificationList } from '../components/NotificationList';

// Mock component for Storybook visualization
const NotificationList = (props: any) => <div {...props}>{props.children || 'NotificationList Component'}</div>;

const meta = {
  title: 'Components/NotificationList',
  component: NotificationList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'NotificationList',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'NotificationList',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'NotificationList',
  },
};
