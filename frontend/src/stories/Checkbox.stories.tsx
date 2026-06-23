import type { Meta, StoryObj } from '@storybook/react';
// import { Checkbox } from '../components/Checkbox';

// Mock component for Storybook visualization
const Checkbox = (props: any) => <div {...props}>{props.children || 'Checkbox Component'}</div>;

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Checkbox',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
  },
};
