import type { Meta, StoryObj } from '@storybook/react';
// import { TokenBalance } from '../components/TokenBalance';

// Mock component for Storybook visualization
const TokenBalance = (props: any) => <div {...props}>{props.children || 'TokenBalance Component'}</div>;

const meta = {
  title: 'Components/TokenBalance',
  component: TokenBalance,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenBalance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'TokenBalance',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'TokenBalance',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'TokenBalance',
  },
};
