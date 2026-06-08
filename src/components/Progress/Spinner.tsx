import type { HTMLAttributes } from 'react';
import type { ProgressColor, ProgressSize } from './types';
import styles from './Spinner.module.css';

export type SpinnerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  size?: ProgressSize;
  color?: ProgressColor;
  'aria-label'?: string;
};

export function Spinner({
  size = 'md',
  color = 'primary',
  className,
  'aria-label': ariaLabel = 'Загрузка',
  ...rest
}: SpinnerProps) {
  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-size={size}
      data-color={color}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={ariaLabel}
      {...rest}
    >
      <svg className={styles.svg} viewBox="0 0 20 20" aria-hidden>
        <circle className={styles.track} cx="10" cy="10" r="8" />
        <circle className={styles.indicator} cx="10" cy="10" r="8" />
      </svg>
    </span>
  );
}
