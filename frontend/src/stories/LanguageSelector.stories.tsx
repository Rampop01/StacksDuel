import type { Meta, StoryObj } from '@storybook/react';
// import { LanguageSelector } from '../components/LanguageSelector';

// Mock component for Storybook visualization
const LanguageSelector = (props: any) => <div {...props}>{props.children || 'LanguageSelector Component'}</div>;

const meta = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'LanguageSelector',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'LanguageSelector',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'LanguageSelector',
  },
};
