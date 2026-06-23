import type { Meta, StoryObj } from '@storybook/react';
// import { FilterBar } from '../components/FilterBar';

// Mock component for Storybook visualization
const FilterBar = (props: any) => <div {...props}>{props.children || 'FilterBar Component'}</div>;

const meta = {
  title: 'Components/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'FilterBar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'FilterBar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'FilterBar',
  },
};
