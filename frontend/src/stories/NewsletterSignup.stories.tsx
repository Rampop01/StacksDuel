import type { Meta, StoryObj } from '@storybook/react';
// import { NewsletterSignup } from '../components/NewsletterSignup';

// Mock component for Storybook visualization
const NewsletterSignup = (props: any) => <div {...props}>{props.children || 'NewsletterSignup Component'}</div>;

const meta = {
  title: 'Components/NewsletterSignup',
  component: NewsletterSignup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'NewsletterSignup',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'NewsletterSignup',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'NewsletterSignup',
  },
};
