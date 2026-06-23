import type { Meta, StoryObj } from '@storybook/react';
// import { MobileMenu } from '../components/MobileMenu';

// Mock component for Storybook visualization
const MobileMenu = (props: any) => <div {...props}>{props.children || 'MobileMenu Component'}</div>;

const meta = {
  title: 'Components/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'MobileMenu',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'MobileMenu',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'MobileMenu',
  },
};
