import type { Meta, StoryObj } from '@storybook/react';
// import { Dropdown } from '../components/Dropdown';

// Mock component for Storybook visualization
const Dropdown = (props: any) => <div {...props}>{props.children || 'Dropdown Component'}</div>;

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Dropdown',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Dropdown',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Dropdown',
  },
};
