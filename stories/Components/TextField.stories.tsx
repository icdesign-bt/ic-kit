import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { Autocomplete, Input, type TextFieldColor, type TextFieldSize, type TextFieldVariant } from '../../src/components/TextField';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';
const FIGMA_MENU = `${FIGMA_COMPONENT}?node-id=6080-5878`;
const CalendarIconSm = <Icon path="Time/CalendarBlank" size={12} />;
const InfoIconSm = <Icon path="Security & Warning/Info" size={12} />;
const InfoIcon = <Icon path="Security & Warning/Info" size={20} />;
const MapPinIcon = <Icon path="Communication/MapPin" size={18} />;

const SELECT_OPTIONS = [
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
  title: 'Components/TextField',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 TextField family (Input, Autocomplete). Select, TextArea, DatePicker, MultiSelect — отдельные story groups. Figma: [TextField](${FIGMA_COMPONENT}?node-id=2169-4977), [Menu](${FIGMA_MENU}), docs: [Input](${FIGMA_DOCS}?node-id=156-19406).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'info'],
    },
  },
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const InputDefault: Story = {
  render: (args) => <Input {...args} labelIcon={CalendarIconSm} />,
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    size: 'lg',
    variant: 'outlined',
    color: 'primary',
    fullWidth: true,
  },
};

export const InputWithIcons: Story = {
  render: (args) => (
    <Input
      {...args}
      labelIcon={InfoIconSm}
      startIcon={InfoIcon}
    />
  ),
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    size: 'lg',
    variant: 'outlined',
    fullWidth: true,
  },
};

export const InputStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input label="Default" labelIcon={CalendarIconSm} placeholder="Placeholder" fullWidth />
      <Input label="With value" labelIcon={CalendarIconSm} defaultValue="Value" fullWidth />
      <Input label="Error" labelIcon={CalendarIconSm} placeholder="Placeholder" error helperText="HelperText" fullWidth />
      <Input label="Disabled" labelIcon={CalendarIconSm} placeholder="Placeholder" disabled fullWidth />
      <Input label="Read only" labelIcon={CalendarIconSm} defaultValue="Value" readOnly fullWidth />
    </div>
  ),
};

export const InputVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      {(['outlined', 'filled', 'text'] as const).map((variant) => (
        <Input
          key={variant}
          label={variant}
          labelIcon={CalendarIconSm}
          placeholder="Placeholder"
          variant={variant}
          fullWidth
        />
      ))}
    </div>
  ),
};

export const InputSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Input
          key={size}
          label={size}
          labelIcon={CalendarIconSm}
          placeholder="Placeholder"
          size={size}
          fullWidth
        />
      ))}
    </div>
  ),
};

function AutocompleteDemo() {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  return (
    <Autocomplete
      label="Город"
      labelIcon={MapPinIcon}
      placeholder="Начните вводить"
      options={SELECT_OPTIONS}
      value={value}
      inputValue={inputValue}
      onChange={setValue}
      onInputChange={setInputValue}
      fullWidth
    />
  );
}

export const AutocompleteDefault: Story = {
  render: () => <AutocompleteDemo />,
};

export const AutocompleteWithValue: Story = {
  render: () => {
    const [value, setValue] = useState('moscow');
    const [inputValue, setInputValue] = useState('Москва');
    return (
      <Autocomplete
        label="Город"
        placeholder="Начните вводить"
        options={SELECT_OPTIONS}
        value={value}
        inputValue={inputValue}
        onChange={setValue}
        onInputChange={setInputValue}
        fullWidth
      />
    );
  },
};
