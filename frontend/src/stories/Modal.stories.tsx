import type { Meta, StoryObj } from '@storybook/react';
// import { Modal } from '../components/Modal';

// Mock component for Storybook visualization
const Modal = (props: any) => <div {...props}>{props.children || 'Modal Component'}</div>;

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Modal',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Modal',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Modal',
  },
};
