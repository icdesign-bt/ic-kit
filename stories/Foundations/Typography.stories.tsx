import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../src/components/Text';
import {
  TYPOGRAPHY_GROUPS,
  TYPOGRAPHY_SAMPLE_TEXT,
  TYPOGRAPHY_SURFACE_TOKENS,
  TYPOGRAPHY_TEXT_COLORS,
  pxToRem,
  type TypographyVariant,
} from '../../src/typography/catalog';

const FIGMA_SCALE =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components?node-id=6181-16002';
const FIGMA_SURFACES =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components?node-id=6181-16620';

const ALL_VARIANTS = TYPOGRAPHY_GROUPS.flatMap((g) =>
  g.styles.map((s) => s.slug),
) as TypographyVariant[];

const meta = {
  title: 'Foundations/Typography',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `Шкала типографики KURS v2 ([Figma ${FIGMA_SCALE.split('node-id=')[1]}](${FIGMA_SCALE})). Шрифт Moscow Sans W, 25 text styles, CSS-утилиты \`text-*\` и компонент \`Text\`.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ALL_VARIANTS,
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'inverse', 'inherit'],
    },
  },
} as Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <Text variant="heading-h1" as="h1">
          Текст
        </Text>
        <Text variant="body-md" color="secondary" style={{ marginTop: 8 }}>
          Шкала KURS v2 Components. Токены — CSS-переменные <code>--font-size-*</code>,{' '}
          <code>--line-height-*</code>; классы — <code>text-{'{category}-{name}'}</code>.
        </Text>
      </div>

      {TYPOGRAPHY_GROUPS.map((group) => (
        <section key={group.id}>
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              border: '1px solid var(--outlines-border)',
              background: 'var(--surfaces-surface-1)',
              marginBottom: 16,
            }}
          >
            <Text variant="heading-h4" as="h2">
              {group.title}
            </Text>
            {group.description.map((line) => (
              <Text key={line} variant="body-lg" color="secondary" style={{ marginTop: 8 }}>
                {line}
              </Text>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 120px 180px 1fr',
              gap: '8px 16px',
              alignItems: 'center',
            }}
          >
            <Text variant="label-sm" color="secondary">
              font size
            </Text>
            <Text variant="label-sm" color="secondary">
              line height
            </Text>
            <Text variant="label-sm" color="secondary">
              style name
            </Text>
            <Text variant="label-sm" color="secondary">
              example
            </Text>

            {group.styles.map((style, index) => {
              const rowStyle = {
                padding: '12px 0',
                borderTop: index > 0 ? '1px solid var(--divider)' : undefined,
              } as const;
              return (
                <div key={style.slug} style={{ display: 'contents' }}>
                  <div style={rowStyle}>
                    <Text variant="label-md">
                      {style.sizePx}
                      <span style={{ opacity: 0.6 }}> px</span>
                    </Text>
                    <Text variant="label-sm" color="secondary">
                      {pxToRem(style.sizePx)} rem
                    </Text>
                  </div>
                  <div style={rowStyle}>
                    <Text variant="label-md">
                      {style.linePx}
                      <span style={{ opacity: 0.6 }}> px</span>
                    </Text>
                    <Text variant="label-sm" color="secondary">
                      {pxToRem(style.linePx)} rem
                    </Text>
                  </div>
                  <div style={rowStyle}>
                    <Text variant="label-md" className={`text-${style.slug}`}>
                      {style.name}
                    </Text>
                  </div>
                  <div style={rowStyle}>
                    <Text variant={style.slug}>
                      {style.mono ? '0123456789' : TYPOGRAPHY_SAMPLE_TEXT}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const TextColors: Story = {
  name: 'Text colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      {TYPOGRAPHY_TEXT_COLORS.map((row) => (
        <div
          key={row.token}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: '12px 0',
            borderBottom: '1px solid var(--divider)',
          }}
        >
          <Text variant="label-lg-bold">{row.token}</Text>
          <code style={{ fontSize: 12, color: 'var(--text-secondary-on-surface)' }}>{row.cssVar}</code>
          <Text variant="body-md" style={{ color: `var(${row.cssVar})` }}>
            {row.description}. {TYPOGRAPHY_SAMPLE_TEXT}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const SurfaceColors: Story = {
  name: 'Surface colors (project)',
  parameters: {
    docs: {
      description: {
        story: `Цвета проекта из [Figma 6181:16620](${FIGMA_SURFACES}). Значения зависят от Brand/Theme в toolbar.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Text variant="heading-h4" as="h2">
        Цвета проекта
      </Text>
      <Text variant="body-md" color="secondary">
        Поверхности и фоны, используемые вместе с типографикой. Переключите Brand и Theme в toolbar.
      </Text>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 80px 1fr',
          gap: '12px 16px',
          alignItems: 'center',
        }}
      >
        <Text variant="label-sm" color="secondary">
          Token
        </Text>
        <Text variant="label-sm" color="secondary">
          Swatch
        </Text>
        <Text variant="label-sm" color="secondary">
          Description
        </Text>

        {TYPOGRAPHY_SURFACE_TOKENS.map((row, index) => (
          <div key={row.token} style={{ display: 'contents' }}>
            <Text
              variant="label-lg-bold"
              style={{ paddingTop: index > 0 ? 12 : 0, borderTop: index > 0 ? '1px solid var(--divider)' : undefined }}
            >
              {row.token}
            </Text>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: `var(${row.cssVar})`,
                border: '1px solid var(--outlines-border)',
                marginTop: index > 0 ? 12 : 0,
                paddingTop: index > 0 ? 0 : undefined,
              }}
            />
            <Text
              variant="body-md"
              color="secondary"
              style={{ paddingTop: index > 0 ? 12 : 0, borderTop: index > 0 ? '1px solid var(--divider)' : undefined }}
            >
              <code>{row.cssVar}</code>
              <br />
              {row.description}
            </Text>
          </div>
        ))}
      </div>
    </div>
  ),
};
