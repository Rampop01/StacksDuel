import type { Meta, StoryObj } from '@storybook/react';
// import { DuelCard } from '../components/DuelCard';

// Mock component for Storybook visualization
const DuelCard = (props: any) => <div {...props}>{props.children || 'DuelCard Component'}</div>;

const meta = {
  title: 'Components/DuelCard',
  component: DuelCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DuelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'DuelCard',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'DuelCard',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'DuelCard',
  },
};
