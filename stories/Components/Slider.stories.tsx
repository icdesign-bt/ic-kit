import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../../src/components/Slider';
import type { SliderValue } from '../../src/components/Slider';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Slider. Figma: [6600:18818](${FIGMA_COMPONENT}?node-id=6600-18818), docs: [142:16255](${FIGMA_DOCS}?node-id=142-16255).`,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['continuous', 'range'],
    },
  },
} as Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof Slider>;

function ContinuousDemo(props: Partial<ComponentProps<typeof Slider>>) {
  const [value, setValue] = useState<SliderValue>(30);
  return (
    <Slider
      type="continuous"
      min={0}
      max={100}
      value={value}
      onChange={setValue}
      aria-label="Громкость"
      {...props}
    />
  );
}

function RangeDemo(props: Partial<ComponentProps<typeof Slider>>) {
  const [value, setValue] = useState<SliderValue>([20, 70]);
  return (
    <Slider
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={setValue}
      aria-label="Диапазон цен"
      {...props}
    />
  );
}

export const Continuous: Story = {
  render: () => <ContinuousDemo />,
};

export const Range: Story = {
  render: () => <RangeDemo />,
};

export const WithValueLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 280, paddingTop: 8 }}>
      <ContinuousDemo showValueLabel />
      <RangeDemo showValueLabel />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 280 }}>
      <ContinuousDemo />
      <ContinuousDemo disabled />
      <RangeDemo />
      <RangeDemo disabled />
    </div>
  ),
};
