import type { HTMLAttributes } from 'react';
import type { ProgressColor, ProgressSize } from './types';
import styles from './Progress.module.css';

type SharedProps = {
  /** 0–100. Omit for indeterminate linear bar. */
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  'aria-label'?: string;
};

export type ProgressProps = Omit<HTMLAttributes<HTMLProgressElement>, 'value'> & SharedProps;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  className,
  'aria-label': ariaLabel,
  ...rest
}: ProgressProps) {
  const isIndeterminate = value === undefined;

  if (isIndeterminate) {
    const { id, style, title } = rest;
    return (
      <span
        id={id}
        style={style}
        title={title}
        className={[styles.indeterminate, className].filter(Boolean).join(' ')}
        data-size={size}
        data-color={color}
        role="progressbar"
        aria-busy="true"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel ?? 'Загрузка'}
      >
        <span className={styles.bar} aria-hidden />
      </span>
    );
  }

  const safeValue = clamp(value, 0, max);

  return (
    <progress
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-size={size}
      data-color={color}
      value={safeValue}
      max={max}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
