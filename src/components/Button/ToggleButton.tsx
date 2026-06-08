import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonColor, ButtonSize } from './types';
import { cn, composeIconSizeClass } from './utils';
import styles from './Button.module.css';

export type ToggleButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  color?: Extract<ButtonColor, 'primary' | 'neutral'>;
  size?: Exclude<ButtonSize, 'xsm'>;
  selected?: boolean;
  icon: ReactNode;
  'aria-label': string;
};

export function ToggleButton({
  color = 'primary',
  size = 'md',
  selected = false,
  icon,
  className,
  disabled,
  type = 'button',
  ...rest
}: ToggleButtonProps) {
  const classes = cn(
    styles.toggle,
    color === 'neutral' ? styles.toggleNeutral : styles.textPrimary,
    composeIconSizeClass(size),
    selected && (color === 'neutral' ? styles.toggleSelectedNeutral : styles.toggleSelected),
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
}
