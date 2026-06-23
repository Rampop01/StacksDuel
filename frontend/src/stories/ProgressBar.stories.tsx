import type { Meta, StoryObj } from '@storybook/react';
// import { ProgressBar } from '../components/ProgressBar';

// Mock component for Storybook visualization
const ProgressBar = (props: any) => <div {...props}>{props.children || 'ProgressBar Component'}</div>;

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProgressBar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'ProgressBar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'ProgressBar',
  },
};
