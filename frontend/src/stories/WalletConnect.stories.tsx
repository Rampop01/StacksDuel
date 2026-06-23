import type { Meta, StoryObj } from '@storybook/react';
// import { WalletConnect } from '../components/WalletConnect';

// Mock component for Storybook visualization
const WalletConnect = (props: any) => <div {...props}>{props.children || 'WalletConnect Component'}</div>;

const meta = {
  title: 'Components/WalletConnect',
  component: WalletConnect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WalletConnect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'WalletConnect',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'WalletConnect',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'WalletConnect',
  },
};
