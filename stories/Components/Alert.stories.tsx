import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, type AlertType, type AlertVariant } from '../../src/components/Alert';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const TYPES = ['primary', 'secondary', 'success', 'error', 'warning'];

const alertDefaults = {
  title: 'Title',
  description: 'Info text alert',
  actionLabel: 'Button',
  onAction: () => undefined,
  onClose: () => undefined,
};

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Alert. Figma: [2292:41417](${FIGMA_COMPONENT}?node-id=2292-41417), docs: [126:171618](${FIGMA_DOCS}?node-id=126-171618).`,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: TYPES,
    },
    variant: {
      control: 'select',
      options: ['tonal', 'outlined'],
    },
  },
} as Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    ...alertDefaults,
    type: 'primary',
    variant: 'tonal',
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {TYPES.map((type) => (
        <Alert key={type} type={type} variant="tonal" {...alertDefaults} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {TYPES.flatMap((type) =>
        (['tonal', 'outlined'] as const).map((variant) => (
          <Alert key={`${type}-${variant}`} type={type} variant={variant} {...alertDefaults} />
        )),
      )}
    </div>
  ),
};

function DismissibleDemo() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)}>
        Показать Alert
      </button>
    );
  }
  return (
    <Alert
      type="success"
      variant="tonal"
      title="Готово"
      description="Данные успешно сохранены"
      actionLabel="Подробнее"
      onAction={() => undefined}
      onClose={() => setOpen(false)}
    />
  );
}

export const Dismissible: Story = {
  render: () => <DismissibleDemo />,
};
