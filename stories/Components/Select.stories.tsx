import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { Select } from '../../src/components/Select';

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
  { value: 'samara', label: 'Самара' },
  { value: 'omsk', label: 'Омск' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Select. Figma: [12167:17372](${FIGMA_COMPONENT}?node-id=12167-17372), docs: [TextField](${FIGMA_DOCS}?node-id=156-19406).`,
      },
    },
  },
} as Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

function SelectDemo() {
  const [value, setValue] = useState('');
  return (
    <Select
      label="Город"
      labelIcon={MapPinIcon}
      placeholder="Выберите город"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      fullWidth
    />
  );
}

export const Default: Story = {
  render: () => <SelectDemo />,
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Select label="Default" placeholder="Placeholder" options={OPTIONS} fullWidth />
      <Select label="Error" placeholder="Placeholder" options={OPTIONS} error helperText="HelperText" fullWidth />
      <Select label="Disabled" placeholder="Placeholder" options={OPTIONS} disabled fullWidth />
    </div>
  ),
};

export const OpensUpward: Story = {
  name: 'Opens upward (near bottom)',
  parameters: {
    docs: {
      description: {
        story:
          'When there is not enough space below the field, the menu opens upward (`data-placement="top"`).',
      },
    },
  },
  render: () => (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        maxWidth: 320,
      }}
    >
      <SelectDemo />
    </div>
  ),
};
