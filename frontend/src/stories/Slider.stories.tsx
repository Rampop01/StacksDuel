import type { Meta, StoryObj } from '@storybook/react';
// import { Slider } from '../components/Slider';

// Mock component for Storybook visualization
const Slider = (props: any) => <div {...props}>{props.children || 'Slider Component'}</div>;

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Slider',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Slider',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Slider',
  },
};
