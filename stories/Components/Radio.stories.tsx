import type { Meta, StoryObj } from '@storybook/react';
import type { SelectionSize } from '../../src/components/Checkbox';
import { Radio, RadioGroup } from '../../src/components/Radio';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const OPTIONS = [
  { value: 'a', label: 'Вариант A' },
  { value: 'b', label: 'Вариант B' },
  { value: 'c', label: 'Вариант C' },
];

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Radio button. Figma: [2214:3965](${FIGMA_COMPONENT}?node-id=2214-3965), docs: [126:169745](${FIGMA_DOCS}?node-id=126-169745).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Label',
    name: 'radio-default',
    size: 'lg',
    defaultChecked: true,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio name="radio-off" label="Unselected" />
      <Radio name="radio-on" label="Selected" defaultChecked />
      <Radio name="radio-disabled-off" label="Disabled" disabled />
      <Radio name="radio-disabled-on" label="Disabled selected" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Radio key={size} name={`radio-${size}`} label={size} size={size} defaultChecked />
      ))}
    </div>
  ),
};

export const GroupRow: Story = {
  render: () => (
    <RadioGroup
      name="plan-row"
      legend="Горизонтальная группа"
      options={OPTIONS}
      defaultValue="b"
      direction="row"
    />
  ),
};
