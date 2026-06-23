import type { Meta, StoryObj } from '@storybook/react';
// import { Switch } from '../components/Switch';

// Mock component for Storybook visualization
const Switch = (props: any) => <div {...props}>{props.children || 'Switch Component'}</div>;

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Switch',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Switch',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Switch',
  },
};
