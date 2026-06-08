import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonProcessingDots } from './ButtonProcessingDots';
import type { ButtonColor, ButtonSize, ButtonVariant } from './types';
import { cn, composeIconSizeClass, composeVariantClass } from './utils';
import styles from './Button.module.css';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  icon: ReactNode;
  'aria-label': string;
};

export function IconButton({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  type = 'button',
  ...rest
}: IconButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  const classes = cn(
    styles.root,
    composeVariantClass(variant, color),
    composeIconSizeClass(size),
    loading && styles.loading,
    loading && styles.loadingCenter,
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={styles.label} aria-hidden={loading}>
        <span className={styles.icon}>{icon}</span>
      </span>
      {loading ? (
        <span className={styles.processing} aria-hidden>
          <ButtonProcessingDots />
        </span>
      ) : null}
    </button>
  );
}
