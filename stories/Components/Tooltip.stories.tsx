import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/Button';
import { IconButton } from '../../src/components/Button/IconButton';
import { Icon } from '../../src/components/Icon';
import { Tooltip } from '../../src/components/Tooltip';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Tooltip — контекстная подсказка по hover/focus. Docs: [161:23177](${FIGMA_DOCS}?node-id=161-23177).`,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    alignment: {
      control: 'select',
      options: ['start', 'middle', 'end'],
    },
  },
} as Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Lorem shorem ipsum deep some',
    position: 'top',
    alignment: 'middle',
  },
  render: (args) => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button variant="outlined" color="primary">
          Наведи курсор
        </Button>
      </Tooltip>
    </div>
  ),
};

export const IconButtonTrigger: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Сохранить изменения" position="top" alignment="middle">
        <IconButton
          variant="tonal"
          color="primary"
          aria-label="Сохранить"
          icon={<Icon path="Office & Editing/FloppyDisk" size={18} weight="bold" />}
        />
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div
      style={{
        padding: 120,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip content="Сверху" position="top" alignment="middle">
        <Button size="sm" variant="tonal" color="neutral">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Снизу" position="bottom" alignment="middle">
        <Button size="sm" variant="tonal" color="neutral">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Слева" position="left" alignment="middle">
        <Button size="sm" variant="tonal" color="neutral">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="Справа" position="right" alignment="middle">
        <Button size="sm" variant="tonal" color="neutral">
          Right
        </Button>
      </Tooltip>
    </div>
  ),
};

export const WithSlot: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 10, lineHeight: '12px' }}>Заголовок подсказки</span>
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                border: '1px dashed var(--primary-main)',
                background: 'var(--primary-tonal)',
                fontSize: 12,
              }}
            >
              Custom slot
            </div>
          </div>
        }
        position="top"
        alignment="start"
      >
        <Button variant="contained" color="primary">
          С блоком контента
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `Figma \`swapSlot\` — передайте \`ReactNode\` в \`content\`. Component set: [${FIGMA_COMPONENT}](${FIGMA_COMPONENT}).`,
      },
    },
  },
};
