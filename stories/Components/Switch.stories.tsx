import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../src/components/Switch';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Switch. Figma: [6255:7636](${FIGMA_COMPONENT}?node-id=6255-7636), docs: [126:166817](${FIGMA_DOCS}?node-id=126-166817).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success'],
    },
  },
} as Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'lg',
    color: 'primary',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch label="Large" size="lg" defaultChecked />
      <Switch label="Medium" size="md" defaultChecked />
      <Switch label="Small" size="sm" defaultChecked />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch label="Primary" color="primary" defaultChecked />
      <Switch label="Success (ЦОДД)" color="success" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

function ControlledDemo() {
  const [on, setOn] = useState(true);
  return (
    <Switch
      label={on ? 'Включено' : 'Выключено'}
      checked={on}
      onChange={(event) => setOn(event.target.checked)}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
