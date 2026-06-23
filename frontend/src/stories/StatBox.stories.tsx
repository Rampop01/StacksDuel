import type { Meta, StoryObj } from '@storybook/react';
// import { StatBox } from '../components/StatBox';

// Mock component for Storybook visualization
const StatBox = (props: any) => <div {...props}>{props.children || 'StatBox Component'}</div>;

const meta = {
  title: 'Components/StatBox',
  component: StatBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'StatBox',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'StatBox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'StatBox',
  },
};
