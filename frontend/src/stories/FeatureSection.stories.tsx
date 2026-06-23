import type { Meta, StoryObj } from '@storybook/react';
// import { FeatureSection } from '../components/FeatureSection';

// Mock component for Storybook visualization
const FeatureSection = (props: any) => <div {...props}>{props.children || 'FeatureSection Component'}</div>;

const meta = {
  title: 'Components/FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'FeatureSection',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'FeatureSection',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'FeatureSection',
  },
};
