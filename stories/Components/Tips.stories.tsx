import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tips } from '../../src/components/Tips';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Tips',
  component: Tips,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Tips — сворачиваемый информационный баннер. Figma: [6169:5561](${FIGMA_COMPONENT}?node-id=6169-5561), docs: [161:17782](${FIGMA_DOCS}?node-id=161-17782).`,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['error', 'warning', 'neutral'],
    },
    defaultOpen: { control: 'boolean' },
  },
} as Meta<typeof Tips>;

export default meta;

type Story = StoryObj<typeof Tips>;

export const Default: Story = {
  args: {
    color: 'error',
    title: 'Title',
    text: 'Text',
    defaultOpen: true,
    onClose: () => undefined,
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 352 }}>
      <Tips
        color="error"
        title="Ошибка"
        text="Краткая подсказка по исправлению."
        onClose={() => undefined}
      />
      <Tips
        color="warning"
        title="Предупреждение"
        text="Рекомендация перед действием."
        onClose={() => undefined}
      />
      <Tips
        color="neutral"
        title="Подсказка"
        text="Нейтральная справка по интерфейсу."
        onClose={() => undefined}
      />
    </div>
  ),
};

export const Collapsed: Story = {
  args: {
    color: 'warning',
    title: 'Title',
    text: 'Text',
    defaultOpen: false,
    onClose: () => undefined,
  },
};

function ControlledDemo() {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button type="button" onClick={() => setVisible(true)}>
        Показать Tips
      </button>
    );
  }

  return (
    <Tips
      color="neutral"
      title="Совет"
      text="Разверните или сверните блок. Закройте крестиком."
      open={open}
      onOpenChange={setOpen}
      onClose={() => setVisible(false)}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const TitleOnly: Story = {
  args: {
    color: 'neutral',
    title: 'Только заголовок',
    onClose: () => undefined,
  },
};

export const WithoutIcon: Story = {
  args: {
    color: 'error',
    title: 'Без иконки',
    text: 'Текст подсказки без стартовой иконки.',
    icon: false,
    onClose: () => undefined,
  },
};
