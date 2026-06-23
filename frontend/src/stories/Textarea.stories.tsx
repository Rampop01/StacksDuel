import type { Meta, StoryObj } from '@storybook/react';
// import { Textarea } from '../components/Textarea';

// Mock component for Storybook visualization
const Textarea = (props: any) => <div {...props}>{props.children || 'Textarea Component'}</div>;

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Textarea',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Textarea',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Textarea',
  },
};
