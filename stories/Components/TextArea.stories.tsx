import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { TextArea } from '../../src/components/TextArea';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const NoteIconSm = <Icon path="Office & Editing/NoteBlank" size={12} />;

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 TextArea. Figma: [TextField](${FIGMA_COMPONENT}?node-id=2169-4977), docs: [Input](${FIGMA_DOCS}?node-id=156-19406).`,
      },
    },
  },
} as Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: (args) => <TextArea {...args} labelIcon={NoteIconSm} />,
  args: {
    label: 'Комментарий',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    rows: 4,
    fullWidth: true,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <TextArea label="Default" labelIcon={NoteIconSm} placeholder="Placeholder" rows={3} fullWidth />
      <TextArea label="Error" labelIcon={NoteIconSm} placeholder="Placeholder" error helperText="HelperText" rows={3} fullWidth />
      <TextArea label="Disabled" labelIcon={NoteIconSm} placeholder="Placeholder" disabled rows={3} fullWidth />
    </div>
  ),
};
