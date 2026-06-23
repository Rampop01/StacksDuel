import type { Meta, StoryObj } from '@storybook/react';
// import { TransactionHistory } from '../components/TransactionHistory';

// Mock component for Storybook visualization
const TransactionHistory = (props: any) => <div {...props}>{props.children || 'TransactionHistory Component'}</div>;

const meta = {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'TransactionHistory',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'TransactionHistory',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'TransactionHistory',
  },
};
