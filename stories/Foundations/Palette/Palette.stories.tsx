import type { Meta, StoryObj } from '@storybook/react';
import {
  BRAND_PALETTE_GROUPS,
  CHART_PALETTE_GROUPS,
  INTERFACE_PALETTE_GROUPS,
} from './palette-catalog';
import { PaletteSection } from './PaletteTable';

const meta = {
  title: 'Foundations/Palette',
  parameters: {
    docs: {
      description: {
        component:
          'Полная палитра KURS v2: семантические группы цветов из CSS variables. Переключайте **Brand** (ИЦ / ЦОДД) и **Theme** (light / dark) в toolbar — значения в таблице обновляются.',
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj;

export const Brand: Story = {
  name: 'Brand colors',
  render: () => (
    <PaletteSection
      title="Брендовые цвета"
      description="Primary, secondary и статусные палитры. Primary меняется между ИЦ и ЦОДД."
      groups={BRAND_PALETTE_GROUPS}
    />
  ),
};

export const Interface: Story = {
  name: 'Interface colors',
  render: () => (
    <PaletteSection
      title="Интерфейс"
      description="Поверхности, текст, action-состояния, обводки, status и базовые токены."
      groups={INTERFACE_PALETTE_GROUPS}
    />
  ),
};

export const Chart: Story = {
  name: 'Chart colors',
  render: () => (
    <PaletteSection
      title="Диаграммы"
      description="Палитры для графиков: monochromatic data 1–5, categorised active/hover/disabled."
      groups={CHART_PALETTE_GROUPS}
    />
  ),
};

export const All: Story = {
  name: 'All palettes',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        padding: '8px 0 32px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: '20px',
          color: 'var(--text-secondary-on-surface)',
          maxWidth: 720,
        }}
      >
        Все цветовые токены дизайн-системы. Значения зависят от Brand и Theme в toolbar Storybook.
      </p>
      <PaletteSection title="Брендовые цвета" groups={BRAND_PALETTE_GROUPS} />
      <PaletteSection title="Интерфейс" groups={INTERFACE_PALETTE_GROUPS} />
      <PaletteSection title="Диаграммы" groups={CHART_PALETTE_GROUPS} />
    </div>
  ),
};
