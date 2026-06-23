import type { Meta, StoryObj } from '@storybook/react';
// import { Input } from '../components/Input';

// Mock component for Storybook visualization
const Input = (props: any) => <div {...props}>{props.children || 'Input Component'}</div>;

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Input',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Input',
  },
};
