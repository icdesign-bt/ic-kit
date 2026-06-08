import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, type SelectionSize } from '../../src/components/Checkbox';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Checkbox. Figma: [2103:4149](${FIGMA_COMPONENT}?node-id=2103-4149), docs: [126:168244](${FIGMA_DOCS}?node-id=126-168244).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'lg',
    defaultChecked: true,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Checkbox key={size} label={size} size={size} defaultChecked />
      ))}
    </div>
  ),
};
