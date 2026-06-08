import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { Tab, Tabs } from '../../src/components/Tabs';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const calculatorIcon = (
  <Icon path="Math & Finances/Calculator" size={16} />
);

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Tabs. Figma: [2129:21173](${FIGMA_COMPONENT}?node-id=2129-21173), docs: [161:24054](${FIGMA_DOCS}?node-id=161-24054).`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'filled'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xlg'],
    },
  },
} as Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

const textItems = [
  { value: 'a', label: 'Вкладка 1', panel: <p>Контент первой вкладки</p> },
  { value: 'b', label: 'Вкладка 2', panel: <p>Контент второй вкладки</p> },
  { value: 'c', label: 'Вкладка 3', panel: <p>Контент третьей вкладки</p> },
];

function TextTabsDemo() {
  const [value, setValue] = useState('a');
  return (
    <Tabs
      items={textItems}
      value={value}
      onChange={setValue}
      variant="text"
      size="md"
      aria-label="Текстовые вкладки"
    />
  );
}

export const TextHorizontal: Story = {
  render: () => <TextTabsDemo />,
};

function FilledTabsDemo() {
  const [value, setValue] = useState('a');
  return (
    <Tabs
      items={[
        { value: 'a', label: 'Label', subLabel: 'Sublabel', panel: <p>Панель с подзаголовком</p> },
        { value: 'b', label: 'Label', subLabel: 'Sublabel', panel: <p>Вторая панель</p> },
        { value: 'c', label: 'Label', panel: <p>Без подзаголовка</p> },
      ]}
      value={value}
      onChange={setValue}
      variant="filled"
      size="md"
      aria-label="Filled вкладки"
    />
  );
}

export const FilledHorizontal: Story = {
  render: () => <FilledTabsDemo />,
};

function VerticalTabsDemo() {
  const [value, setValue] = useState('a');
  return (
    <Tabs
      items={textItems}
      value={value}
      onChange={setValue}
      variant="text"
      orientation="vertical"
      size="md"
      aria-label="Вертикальные вкладки"
    />
  );
}

export const TextVertical: Story = {
  render: () => <VerticalTabsDemo />,
};

export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <Tabs
        items={[
          {
            value: 'a',
            label: 'Калькулятор',
            icon: calculatorIcon,
            panel: <p>Вкладка с иконкой</p>,
          },
          { value: 'b', label: 'Вкладка 2', panel: <p>Без иконки</p> },
        ]}
        value={value}
        onChange={setValue}
        variant="text"
        size="lg"
        aria-label="Вкладки с иконкой"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['xlg', 'lg', 'md', 'sm'] as const).map((size) => (
        <Tabs
          key={size}
          items={[
            { value: 'a', label: 'Selected', panel: null },
            { value: 'b', label: 'Tab', panel: null },
          ]}
          value="a"
          onChange={() => undefined}
          variant="text"
          size={size}
          aria-label={`Размер ${size}`}
        />
      ))}
    </div>
  ),
};

export const TabStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tab label="Selected" selected variant="text" size="md" />
      <Tab label="Default" variant="text" size="md" />
      <Tab label="Disabled" disabled variant="text" size="md" />
      <Tab label="Disabled selected" selected disabled variant="text" size="md" />
      <Tab label="Filled" selected variant="filled" size="md" />
      <Tab label="Filled" variant="filled" size="md" />
      <Tab
        label="Label"
        subLabel="Sublabel"
        selected
        variant="filled"
        size="md"
        icon={calculatorIcon}
      />
    </div>
  ),
};

export const DisabledTab: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <Tabs
        items={[
          { value: 'a', label: 'Активная', panel: <p>Доступна</p> },
          { value: 'b', label: 'Заблокирована', disabled: true, panel: <p>Недоступна</p> },
          { value: 'c', label: 'Третья', panel: <p>Доступна</p> },
        ]}
        value={value}
        onChange={setValue}
        variant="text"
        aria-label="С disabled вкладкой"
      />
    );
  },
};
