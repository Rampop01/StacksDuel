import type { Meta, StoryObj } from '@storybook/react';
// import { Select } from '../components/Select';

// Mock component for Storybook visualization
const Select = (props: any) => <div {...props}>{props.children || 'Select Component'}</div>;

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Select',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Select',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Select',
  },
};
