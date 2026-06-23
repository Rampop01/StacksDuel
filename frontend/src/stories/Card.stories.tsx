import type { Meta, StoryObj } from '@storybook/react';
// import { Card } from '../components/Card';

// Mock component for Storybook visualization
const Card = (props: any) => <div {...props}>{props.children || 'Card Component'}</div>;

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Card',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Card',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Card',
  },
};
