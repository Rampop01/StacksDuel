import type { Meta, StoryObj } from '@storybook/react';
// import { CommentList } from '../components/CommentList';

// Mock component for Storybook visualization
const CommentList = (props: any) => <div {...props}>{props.children || 'CommentList Component'}</div>;

const meta = {
  title: 'Components/CommentList',
  component: CommentList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'CommentList',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'CommentList',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'CommentList',
  },
};
