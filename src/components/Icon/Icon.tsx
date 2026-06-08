import type { CSSProperties, SVGAttributes } from 'react';
import { resolveIconModule } from '../../icons/manifest';
import type { IconPath, IconWeight } from '../../icons/types';
import styles from './Icon.module.css';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  /** Figma path, e.g. `Arrows & Directions/ArrowArcLeft` */
  path: IconPath;
  weight?: IconWeight;
  size?: number;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

function withSvgAttrs(
  markup: string,
  { size, className, title, style }: { size: number; className?: string; title?: string; style?: CSSProperties },
): string {
  const classes = [styles.root, className].filter(Boolean).join(' ');
  const aria = title
    ? `role="img" aria-label="${title.replace(/"/g, '&quot;')}"`
    : 'aria-hidden="true" focusable="false"';
  const styleAttr = style
    ? ` style="${Object.entries(style)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`)
        .join(';')}"`
    : '';
  return markup.replace(
    /<svg\b/i,
    `<svg class="${classes}" width="${size}" height="${size}" ${aria}${styleAttr}`,
  );
}

export function Icon({
  path,
  weight = 'regular',
  size = 24,
  title,
  className,
  style,
}: IconProps) {
  const markup = resolveIconModule(path, weight);

  if (!markup) {
    if (import.meta.env?.DEV) {
      return (
        <span
          className={[styles.missing, className].filter(Boolean).join(' ')}
          style={{ width: size, height: size, ...style }}
          title={`Missing icon: ${path} (${weight})`}
          aria-hidden
        />
      );
    }
    return null;
  }

  return (
    <span
      className={styles.wrap}
      style={{ width: size, height: size, ...style }}
      dangerouslySetInnerHTML={{ __html: withSvgAttrs(markup, { size, className, title, style }) }}
    />
  );
}
