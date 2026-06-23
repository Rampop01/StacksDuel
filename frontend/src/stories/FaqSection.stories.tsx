import type { Meta, StoryObj } from '@storybook/react';
// import { FaqSection } from '../components/FaqSection';

// Mock component for Storybook visualization
const FaqSection = (props: any) => <div {...props}>{props.children || 'FaqSection Component'}</div>;

const meta = {
  title: 'Components/FaqSection',
  component: FaqSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'FaqSection',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'FaqSection',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'FaqSection',
  },
};
