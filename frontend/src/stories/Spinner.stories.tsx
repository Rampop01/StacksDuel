import type { Meta, StoryObj } from '@storybook/react';
// import { Spinner } from '../components/Spinner';

// Mock component for Storybook visualization
const Spinner = (props: any) => <div {...props}>{props.children || 'Spinner Component'}</div>;

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Spinner',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Spinner',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Spinner',
  },
};
