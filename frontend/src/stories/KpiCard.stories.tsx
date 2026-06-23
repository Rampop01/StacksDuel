import type { Meta, StoryObj } from '@storybook/react';
// import { KpiCard } from '../components/KpiCard';

// Mock component for Storybook visualization
const KpiCard = (props: any) => <div {...props}>{props.children || 'KpiCard Component'}</div>;

const meta = {
  title: 'Components/KpiCard',
  component: KpiCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'KpiCard',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'KpiCard',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'KpiCard',
  },
};
