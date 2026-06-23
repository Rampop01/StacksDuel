import type { Meta, StoryObj } from '@storybook/react';
// import { Navbar } from '../components/Navbar';

// Mock component for Storybook visualization
const Navbar = (props: any) => <div {...props}>{props.children || 'Navbar Component'}</div>;

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Navbar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Navbar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Navbar',
  },
};
