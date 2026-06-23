import type { Meta, StoryObj } from '@storybook/react';
// import { Tooltip } from '../components/Tooltip';

// Mock component for Storybook visualization
const Tooltip = (props: any) => <div {...props}>{props.children || 'Tooltip Component'}</div>;

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Tooltip',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Tooltip',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Tooltip',
  },
};
