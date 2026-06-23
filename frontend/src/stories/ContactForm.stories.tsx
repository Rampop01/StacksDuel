import type { Meta, StoryObj } from '@storybook/react';
// import { ContactForm } from '../components/ContactForm';

// Mock component for Storybook visualization
const ContactForm = (props: any) => <div {...props}>{props.children || 'ContactForm Component'}</div>;

const meta = {
  title: 'Components/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'ContactForm',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'ContactForm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'ContactForm',
  },
};
