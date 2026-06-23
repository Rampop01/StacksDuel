import type { Meta, StoryObj } from '@storybook/react';
// import { Accordion } from '../components/Accordion';

// Mock component for Storybook visualization
const Accordion = (props: any) => <div {...props}>{props.children || 'Accordion Component'}</div>;

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Accordion',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Accordion',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Accordion',
  },
};
