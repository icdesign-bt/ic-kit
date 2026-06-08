import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../src/components/Chip';
import { Snackbar } from '../../src/components/Snackbar';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Snackbar. Figma: [6155:13982](${FIGMA_COMPONENT}?node-id=6155-13982), docs: [157:42072](${FIGMA_DOCS}?node-id=157-42072).`,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['light', 'dark'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showActions: { control: 'boolean' },
  },
} as Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    color: 'light',
    orientation: 'horizontal',
    message: 'Info text alert',
    actionLabel: 'Button',
    onClose: () => undefined,
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 286 }}>
      <Snackbar
        color="light"
        message="Светлый snackbar"
        actionLabel="Действие"
        onClose={() => undefined}
      />
      <Snackbar
        color="dark"
        message="Тёмный snackbar"
        actionLabel="Действие"
        onClose={() => undefined}
      />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    color: 'light',
    orientation: 'vertical',
    message: 'Info text alert',
    actionLabel: 'Button',
    children: <Chip label="Слот" size="sm" color="primary" variant="tonal" />,
  },
};

export const WithSlot: Story = {
  args: {
    message: 'Изменения сохранены',
    actionLabel: 'Отменить',
    onClose: () => undefined,
    children: <Chip label="Доп. контент" size="sm" color="neutral" variant="tonal" />,
  },
};

export const MessageOnly: Story = {
  args: {
    message: 'Краткое уведомление без кнопок',
    showActions: false,
  },
};

function DismissibleDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button type="button" onClick={() => setVisible(true)}>
        Показать Snackbar
      </button>
    );
  }

  return (
    <Snackbar
      color="light"
      message="Действие выполнено"
      actionLabel="Подробнее"
      onAction={() => undefined}
      onClose={() => setVisible(false)}
    />
  );
}

export const Dismissible: Story = {
  render: () => <DismissibleDemo />,
};
