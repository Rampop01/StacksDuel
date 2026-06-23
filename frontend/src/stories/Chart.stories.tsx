import type { Meta, StoryObj } from '@storybook/react';
// import { Chart } from '../components/Chart';

// Mock component for Storybook visualization
const Chart = (props: any) => <div {...props}>{props.children || 'Chart Component'}</div>;

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Chart',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Chart',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Chart',
  },
};
