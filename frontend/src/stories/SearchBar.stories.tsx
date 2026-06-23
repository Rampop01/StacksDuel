import type { Meta, StoryObj } from '@storybook/react';
// import { SearchBar } from '../components/SearchBar';

// Mock component for Storybook visualization
const SearchBar = (props: any) => <div {...props}>{props.children || 'SearchBar Component'}</div>;

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'SearchBar',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'SearchBar',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'SearchBar',
  },
};
