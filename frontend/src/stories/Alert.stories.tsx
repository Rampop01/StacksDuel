import type { Meta, StoryObj } from '@storybook/react';
// import { Alert } from '../components/Alert';

// Mock component for Storybook visualization
const Alert = (props: any) => <div {...props}>{props.children || 'Alert Component'}</div>;

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Alert',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Alert',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Alert',
  },
};
