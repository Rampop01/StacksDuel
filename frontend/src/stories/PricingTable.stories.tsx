import type { Meta, StoryObj } from '@storybook/react';
// import { PricingTable } from '../components/PricingTable';

// Mock component for Storybook visualization
const PricingTable = (props: any) => <div {...props}>{props.children || 'PricingTable Component'}</div>;

const meta = {
  title: 'Components/PricingTable',
  component: PricingTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'PricingTable',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'PricingTable',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'PricingTable',
  },
};
