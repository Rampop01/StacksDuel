import type { Meta, StoryObj } from '@storybook/react';
// import { Pagination } from '../components/Pagination';

// Mock component for Storybook visualization
const Pagination = (props: any) => <div {...props}>{props.children || 'Pagination Component'}</div>;

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Pagination',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Pagination',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Pagination',
  },
};
