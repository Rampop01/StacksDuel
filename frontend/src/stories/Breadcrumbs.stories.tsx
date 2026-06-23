import type { Meta, StoryObj } from '@storybook/react';
// import { Breadcrumbs } from '../components/Breadcrumbs';

// Mock component for Storybook visualization
const Breadcrumbs = (props: any) => <div {...props}>{props.children || 'Breadcrumbs Component'}</div>;

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Breadcrumbs',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Breadcrumbs',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Breadcrumbs',
  },
};
