import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { DatePicker } from '../../src/components/DatePicker';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DATEPICKER = `${FIGMA_COMPONENT}?node-id=12167-17321`;

const CalendarIconSm = <Icon path="Time/CalendarBlank" size={12} />;

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 DatePicker. Figma: [DatePicker](${FIGMA_DATEPICKER}).`,
      },
    },
  },
} as Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

function DatePickerDemo() {
  const [value, setValue] = useState('2024-09-27');
  return (
    <DatePicker
      label="Дата"
      labelIcon={CalendarIconSm}
      value={value}
      onChange={setValue}
      helperText="Формат: дд.мм.гггг"
      fullWidth
    />
  );
}

export const Default: Story = {
  render: () => <DatePickerDemo />,
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <DatePicker label="Default" labelIcon={CalendarIconSm} fullWidth />
      <DatePicker label="Error" labelIcon={CalendarIconSm} error helperText="Некорректная дата" fullWidth />
      <DatePicker label="Disabled" labelIcon={CalendarIconSm} disabled fullWidth />
    </div>
  ),
};
