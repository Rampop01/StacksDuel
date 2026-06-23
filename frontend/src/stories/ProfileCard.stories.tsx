import type { Meta, StoryObj } from '@storybook/react';
// import { ProfileCard } from '../components/ProfileCard';

// Mock component for Storybook visualization
const ProfileCard = (props: any) => <div {...props}>{props.children || 'ProfileCard Component'}</div>;

const meta = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'ProfileCard',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'ProfileCard',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'ProfileCard',
  },
};
