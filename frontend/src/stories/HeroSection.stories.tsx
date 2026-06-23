import type { Meta, StoryObj } from '@storybook/react';
// import { HeroSection } from '../components/HeroSection';

// Mock component for Storybook visualization
const HeroSection = (props: any) => <div {...props}>{props.children || 'HeroSection Component'}</div>;

const meta = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'HeroSection',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'HeroSection',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'HeroSection',
  },
};
