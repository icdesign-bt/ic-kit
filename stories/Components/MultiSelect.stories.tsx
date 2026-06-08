import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { MultiSelect } from '../../src/components/MultiSelect';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const MapPinIcon = <Icon path="Communication/MapPin" size={18} />;

const OPTIONS = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'kazan', label: 'Казань' },
  { value: 'novosibirsk', label: 'Новосибирск' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nn', label: 'Нижний Новгород' },
];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 MultiSelect. Figma: [3390:30343](${FIGMA_COMPONENT}?node-id=3390-30343), docs: [159:19773](${FIGMA_DOCS}?node-id=159-19773).`,
      },
    },
  },
} as Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof MultiSelect>;

function MultiSelectDemo(props: Partial<ComponentProps<typeof MultiSelect>>) {
  const [value, setValue] = useState<string[]>(['moscow', 'spb']);
  return (
    <MultiSelect
      label="Города"
      labelIcon={MapPinIcon}
      placeholder="Выберите города"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      helperText="Можно выбрать несколько значений"
      fullWidth
      {...props}
    />
  );
}

export const Default: Story = {
  render: () => <MultiSelectDemo />,
};

export const Empty: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        label="Города"
        placeholder="Placeholder"
        options={OPTIONS}
        value={value}
        onChange={setValue}
        fullWidth
      />
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <MultiSelectDemo />
      <MultiSelectDemo error helperText="Выберите хотя бы один город" />
      <MultiSelectDemo disabled />
    </div>
  ),
};
