import type { Meta, StoryObj } from '@storybook/react';
// import { Footer } from '../components/Footer';

// Mock component for Storybook visualization
const Footer = (props: any) => <div {...props}>{props.children || 'Footer Component'}</div>;

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Footer',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Footer',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Footer',
  },
};
