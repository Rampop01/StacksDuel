import type { Meta, StoryObj } from '@storybook/react';
// import { Skeleton } from '../components/Skeleton';

// Mock component for Storybook visualization
const Skeleton = (props: any) => <div {...props}>{props.children || 'Skeleton Component'}</div>;

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Skeleton',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Skeleton',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Skeleton',
  },
};
