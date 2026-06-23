import type { Meta, StoryObj } from '@storybook/react';
// import { Header } from '../components/Header';

// Mock component for Storybook visualization
const Header = (props: any) => <div {...props}>{props.children || 'Header Component'}</div>;

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Header',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Header',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Header',
  },
};
