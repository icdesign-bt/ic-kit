import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/Button';
import { Dialog, type DialogWidth } from '../../src/components/Dialog';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const WIDTHS = ['sm', 'md', 'lg', 'xlg', 'full'];

const dialogDefaults = {
  title: 'Title',
  subtitle: 'Subtitle',
  textButtonLabel: 'Action',
  secondaryButtonLabel: 'Action',
  mainButtonLabel: 'Button',
  onTextButton: () => undefined,
  onSecondaryButton: () => undefined,
  onMainButton: () => undefined,
};

const slotStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 64,
  padding: 20,
  borderRadius: 12,
  border: '1px dashed var(--palette-primary-700, #5814ab)',
  background: 'var(--palette-primary-200, #ebdefc)',
  color: 'var(--palette-primary-700, #5814ab)',
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-body-md)',
  lineHeight: 'var(--line-height-body-md)',
  textAlign: 'center',
};

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `KURS v2 Dialog. Figma: [2293:43919](${FIGMA_COMPONENT}?node-id=2293-43919), docs: [156:24466](${FIGMA_DOCS}?node-id=156-24466).`,
      },
    },
  },
  argTypes: {
    width: {
      control: 'select',
      options: WIDTHS,
    },
  },
} as Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof Dialog>;

const WIDTH_PX: Record<DialogWidth, number> = {
  sm: 360,
  md: 480,
  lg: 600,
  xlg: 720,
  full: 840,
};

function DialogDemo({
  openButtonLabel = 'Открыть Dialog',
  ...props
}: Partial<React.ComponentProps<typeof Dialog>> & { openButtonLabel?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ padding: 24 }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          {openButtonLabel}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        width="sm"
        {...dialogDefaults}
        {...props}
      >
        <div style={slotStyle}>Place your block here</div>
      </Dialog>
    </>
  );
}

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const Widths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Пять ширин из Figma: sm → full. На кнопке указаны token и ширина в px.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      {WIDTHS.map((width) => (
        <DialogDemo
          key={width}
          width={width}
          title={`Width: ${width}`}
          openButtonLabel={`Открыть Dialog — ${width} (${WIDTH_PX[width]}px)`}
        />
      ))}
    </div>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without Icon',
  render: () => <DialogDemo icon={false} />,
};

export const WithoutSubtitle: Story = {
  name: 'Without Subtitle',
  render: () => <DialogDemo subtitle={undefined} />,
};

export const FooterVariants: Story = {
  name: 'Footer Variants',
  parameters: {
    docs: {
      description: {
        story:
          'Комбинации кнопок в footer (пропсы `textButtonLabel`, `secondaryButtonLabel`, `mainButtonLabel`). В Figma это toggles mainButton / secondaryButton / textButton.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <DialogDemo
        title="All actions"
        openButtonLabel="Все три кнопки (text + outlined + contained)"
        textButtonLabel="Action"
        secondaryButtonLabel="Action"
        mainButtonLabel="Button"
      />
      <DialogDemo
        title="Main only"
        openButtonLabel="Только primary-кнопка"
        textButtonLabel={undefined}
        secondaryButtonLabel={undefined}
        mainButtonLabel="Confirm"
      />
      <DialogDemo
        title="Secondary + main"
        openButtonLabel="Outlined + contained (типичное подтверждение)"
        textButtonLabel={undefined}
        secondaryButtonLabel="Cancel"
        mainButtonLabel="Confirm"
      />
    </div>
  ),
};

export const ContentOnly: Story = {
  name: 'Content Only',
  parameters: {
    docs: {
      description: {
        story:
          'Минимальный footer: без title/subtitle/icon в header, только slot и одна кнопка OK. Пример простого alert-подобного диалога.',
      },
    },
  },
  render: () => (
    <DialogDemo
      openButtonLabel="Диалог без заголовка, только контент + OK"
      title={undefined}
      subtitle={undefined}
      icon={false}
      textButtonLabel={undefined}
      secondaryButtonLabel={undefined}
      mainButtonLabel="OK"
    />
  ),
};
