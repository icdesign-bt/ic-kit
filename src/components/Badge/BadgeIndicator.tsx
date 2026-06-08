import type { HTMLAttributes, ReactNode } from 'react';
import type { BadgeColor, BadgeVariant } from './types';
import styles from './Badge.module.css';

export type BadgeIndicatorProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  variant?: BadgeVariant;
  color?: BadgeColor;
  children?: ReactNode;
};

export function BadgeIndicator({
  variant = 'text',
  color = 'primary',
  children,
  className,
  ...rest
}: BadgeIndicatorProps) {
  return (
    <span
      className={[styles.indicator, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-color={color}
      {...rest}
    >
      {variant === 'dot' ? <span className={styles.dot} aria-hidden /> : children}
    </span>
  );
}
