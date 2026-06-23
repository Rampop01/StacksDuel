import type { Meta, StoryObj } from '@storybook/react';
// import { Avatar } from '../components/Avatar';

// Mock component for Storybook visualization
const Avatar = (props: any) => <div {...props}>{props.children || 'Avatar Component'}</div>;

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Avatar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Avatar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Avatar',
  },
};
