import type { Meta, StoryObj } from '@storybook/react';
// import { CommentItem } from '../components/CommentItem';

// Mock component for Storybook visualization
const CommentItem = (props: any) => <div {...props}>{props.children || 'CommentItem Component'}</div>;

const meta = {
  title: 'Components/CommentItem',
  component: CommentItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'CommentItem',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'CommentItem',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'CommentItem',
  },
};
