import type { Meta, StoryObj } from '@storybook/react';
// import { ThemeToggle } from '../components/ThemeToggle';

// Mock component for Storybook visualization
const ThemeToggle = (props: any) => <div {...props}>{props.children || 'ThemeToggle Component'}</div>;

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'ThemeToggle',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'ThemeToggle',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'ThemeToggle',
  },
};
