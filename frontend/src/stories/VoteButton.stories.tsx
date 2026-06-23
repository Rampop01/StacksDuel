import type { Meta, StoryObj } from '@storybook/react';
// import { VoteButton } from '../components/VoteButton';

// Mock component for Storybook visualization
const VoteButton = (props: any) => <div {...props}>{props.children || 'VoteButton Component'}</div>;

const meta = {
  title: 'Components/VoteButton',
  component: VoteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VoteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'VoteButton',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'VoteButton',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'VoteButton',
  },
};
