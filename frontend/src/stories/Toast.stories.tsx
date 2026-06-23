import type { Meta, StoryObj } from '@storybook/react';
// import { Toast } from '../components/Toast';

// Mock component for Storybook visualization
const Toast = (props: any) => <div {...props}>{props.children || 'Toast Component'}</div>;

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Toast',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Toast',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Toast',
  },
};
