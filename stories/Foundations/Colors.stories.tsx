import type { Meta, StoryObj } from '@storybook/react';

const SWATCHES = [
  { label: 'Primary', varName: '--primary-main' },
  { label: 'Primary hover', varName: '--primary-main-hover' },
  { label: 'Secondary', varName: '--secondary-main' },
  { label: 'Background', varName: '--surfaces-background' },
  { label: 'Surface 1', varName: '--surfaces-surface-1' },
  { label: 'Surface 2', varName: '--surfaces-surface-2' },
  { label: 'Text', varName: '--text-main-on-surface' },
  { label: 'Text secondary', varName: '--text-secondary-on-surface' },
  { label: 'Border', varName: '--outlines-border' },
  { label: 'Error', varName: '--error-main' },
  { label: 'Success', varName: '--success-main' },
  { label: 'Warning', varName: '--warning-main' },
] as const;

function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
      <div
        style={{
          height: 56,
          borderRadius: 8,
          background: `var(${varName})`,
          border: '1px solid var(--outlines-border)',
        }}
      />
      <div style={{ fontSize: 12, lineHeight: '14px', color: 'var(--text-secondary-on-surface)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-main-on-surface)' }}>{label}</div>
        <code>{varName}</code>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'Семантические цвета из Figma (4 палитры: ИЦ/ЦОДД × light/dark). Переключайте Brand и Theme в тулбаре Storybook. Полная таблица токенов — в разделе **Palette**.',
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj;

export const Semantic: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 24,
        padding: 16,
        background: 'var(--surfaces-background)',
        borderRadius: 12,
      }}
    >
      {SWATCHES.map((s) => (
        <Swatch key={s.varName} {...s} />
      ))}
    </div>
  ),
};
