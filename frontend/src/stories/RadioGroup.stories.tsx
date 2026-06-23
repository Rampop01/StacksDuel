import type { Meta, StoryObj } from '@storybook/react';
// import { RadioGroup } from '../components/RadioGroup';

// Mock component for Storybook visualization
const RadioGroup = (props: any) => <div {...props}>{props.children || 'RadioGroup Component'}</div>;

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'RadioGroup',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'RadioGroup',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'RadioGroup',
  },
};
