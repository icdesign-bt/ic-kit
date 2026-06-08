import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import catalog from '../../tokens/icon-catalog.json';
import { Icon } from '../../src/components/Icon';
import { ICON_WEIGHTS, type IconWeight } from '../../src/icons/types';
import { exportedIconCount } from '../../src/icons/manifest';

const categories = [...new Set(catalog.icons.map((i) => i.category))].sort();

const meta = {
  title: 'Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: `Галерея KURS icon 24 (${catalog.meta.count} в каталоге, ${exportedIconCount} SVG в репо). Поиск по имени или категории.`,
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj;

function Gallery() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [weight, setWeight] = useState<IconWeight>('regular');

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.icons.filter((icon) => {
      if (category !== 'all' && icon.category !== category) return false;
      if (!q) return true;
      return (
        icon.name.toLowerCase().includes(q) ||
        icon.category.toLowerCase().includes(q) ||
        icon.path.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск…"
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--outlines-border)',
            background: 'var(--surfaces-surface-1)',
            color: 'var(--text-main-on-surface)',
            minWidth: 220,
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--outlines-border)',
            background: 'var(--surfaces-surface-1)',
            color: 'var(--text-main-on-surface)',
          }}
        >
          <option value="all">Все категории</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={weight}
          onChange={(e) => setWeight(e.target.value as IconWeight)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--outlines-border)',
            background: 'var(--surfaces-surface-1)',
            color: 'var(--text-main-on-surface)',
          }}
        >
          {ICON_WEIGHTS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        <span style={{ color: 'var(--text-secondary-on-surface)', fontSize: 14 }}>
          {items.length} / {catalog.icons.length}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 12,
        }}
      >
        {items.map((icon) => (
          <div
            key={icon.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 12,
              borderRadius: 10,
              border: '1px solid var(--outlines-border)',
              background: 'var(--surfaces-surface-1)',
            }}
          >
            <Icon path={icon.path} weight={weight} size={24} />
            <span
              style={{
                fontSize: 11,
                lineHeight: '14px',
                textAlign: 'center',
                color: 'var(--text-secondary-on-surface)',
                wordBreak: 'break-word',
              }}
            >
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const GalleryStory: Story = {
  name: 'Gallery',
  render: () => <Gallery />,
};
