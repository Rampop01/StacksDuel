import type { Meta, StoryObj } from '@storybook/react';
// import { Badge } from '../components/Badge';

// Mock component for Storybook visualization
const Badge = (props: any) => <div {...props}>{props.children || 'Badge Component'}</div>;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Badge',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Badge',
  },
};
