import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components/Badge';
import { Icon } from '../../src/components/Icon';
import { IconButton } from '../../src/components/Button/IconButton';

const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Badge / Status. Docs: [126:170724](${FIGMA_DOCS}?node-id=126-170724).`,
      },
    },
  },
} as Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Standalone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge content={4} />
      <Badge content="+99" color="error" />
      <Badge content="New" color="primary" />
      <Badge variant="dot" color="error" />
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Badge content={4} status color="success">
      <IconButton
        variant="text"
        color="neutral"
        aria-label="Уведомления"
        icon={<Icon path="System Devices/BellSimple" size={12} weight="bold" />}
      />
    </Badge>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['primary', 'secondary', 'error', 'success', 'warning', 'neutral'] as const).map(
        (color) => (
          <Badge key={color} content={3} color={color}>
            <IconButton
              variant="text"
              color="neutral"
              aria-label={color}
              icon={<Icon path="System Devices/BellSimple" size={12} weight="bold" />}
            />
          </Badge>
        ),
      )}
    </div>
  ),
};
