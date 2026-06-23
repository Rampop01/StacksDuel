import type { Meta, StoryObj } from '@storybook/react';
// import { NetworkSwitcher } from '../components/NetworkSwitcher';

// Mock component for Storybook visualization
const NetworkSwitcher = (props: any) => <div {...props}>{props.children || 'NetworkSwitcher Component'}</div>;

const meta = {
  title: 'Components/NetworkSwitcher',
  component: NetworkSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NetworkSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'NetworkSwitcher',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'NetworkSwitcher',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'NetworkSwitcher',
  },
};
