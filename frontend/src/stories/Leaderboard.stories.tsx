import type { Meta, StoryObj } from '@storybook/react';
// import { Leaderboard } from '../components/Leaderboard';

// Mock component for Storybook visualization
const Leaderboard = (props: any) => <div {...props}>{props.children || 'Leaderboard Component'}</div>;

const meta = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Leaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Leaderboard',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Leaderboard',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Leaderboard',
  },
};
