import { useSyncExternalStore } from 'react';
import type { PaletteGroup } from './palette-catalog';

function subscribeTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-brand', 'data-theme'],
  });
  return () => observer.disconnect();
}

function resolveTokenValue(cssVar: string): string {
  if (typeof window === 'undefined') return '—';
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return value || '—';
}

function useThemeSnapshot() {
  return useSyncExternalStore(
    subscribeTheme,
    () =>
      `${document.documentElement.dataset.brand ?? 'ic'}:${document.documentElement.dataset.theme ?? 'light'}`,
    () => 'ic:light',
  );
}

function Swatch({ cssVar }: { cssVar: string }) {
  return (
    <div
      style={{
        width: 48,
        height: 32,
        borderRadius: 6,
        background: `var(${cssVar})`,
        border: '1px solid var(--outlines-border)',
        boxSizing: 'border-box',
      }}
      title={cssVar}
    />
  );
}

function PaletteGroupTable({ group }: { group: PaletteGroup }) {
  useThemeSnapshot();

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: '20px',
            fontWeight: 700,
            color: 'var(--text-main-on-surface)',
          }}
        >
          {group.title}
        </h3>
        {group.description ? (
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 13,
              lineHeight: '18px',
              color: 'var(--text-secondary-on-surface)',
            }}
          >
            {group.description}
          </p>
        ) : null}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 1.2fr) 56px minmax(200px, 1.4fr) minmax(88px, 0.8fr)',
          gap: '8px 12px',
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid var(--outlines-border)',
          background: 'var(--surfaces-surface-1)',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary-on-surface)',
          }}
        >
          Token
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary-on-surface)',
          }}
        >
          Swatch
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary-on-surface)',
          }}
        >
          CSS variable
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary-on-surface)',
          }}
        >
          Value
        </span>

        {group.tokens.map((token, index) => {
          const value = resolveTokenValue(token.cssVar);

          return (
            <div key={token.cssVar} style={{ display: 'contents' }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-main-on-surface)',
                  paddingTop: index > 0 ? 8 : 0,
                  borderTop: index > 0 ? '1px solid var(--divider)' : undefined,
                }}
              >
                {token.label}
              </span>
              <div
                style={{
                  paddingTop: index > 0 ? 8 : 0,
                  borderTop: index > 0 ? '1px solid var(--divider)' : undefined,
                }}
              >
                <Swatch cssVar={token.cssVar} />
              </div>
              <code
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary-on-surface)',
                  paddingTop: index > 0 ? 8 : 0,
                  borderTop: index > 0 ? '1px solid var(--divider)' : undefined,
                }}
              >
                {token.cssVar}
              </code>
              <code
                style={{
                  fontSize: 12,
                  color: 'var(--text-main-on-surface)',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  paddingTop: index > 0 ? 8 : 0,
                  borderTop: index > 0 ? '1px solid var(--divider)' : undefined,
                }}
              >
                {value}
              </code>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PaletteSection({
  title,
  description,
  groups,
}: {
  title: string;
  description?: string;
  groups: PaletteGroup[];
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            lineHeight: '24px',
            fontWeight: 700,
            color: 'var(--text-main-on-surface)',
          }}
        >
          {title}
        </h2>
        {description ? (
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--text-secondary-on-surface)',
              maxWidth: 720,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {groups.map((group) => (
        <PaletteGroupTable key={group.id} group={group} />
      ))}
    </div>
  );
}
