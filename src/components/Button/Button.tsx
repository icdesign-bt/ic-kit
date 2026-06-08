import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonProcessingDots } from './ButtonProcessingDots';
import type { ButtonColor, ButtonSize, ButtonVariant, LoadingPosition } from './types';
import { cn, composeTextSizeClass, composeVariantClass } from './utils';
import styles from './Button.module.css';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: Exclude<ButtonSize, 'xsm'>;
  loading?: boolean;
  loadingPosition?: LoadingPosition;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
};

export function Button({
  variant = 'contained',
  color = 'primary',
  size = 'md',
  loading = false,
  loadingPosition = 'center',
  startIcon,
  endIcon,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const showCenterLoader = loading && loadingPosition === 'center';
  const showInlineLoader =
    loading && (loadingPosition === 'left' || loadingPosition === 'right');

  const classes = cn(
    styles.root,
    composeVariantClass(variant, color),
    composeTextSizeClass(size),
    loading && styles.loading,
    showCenterLoader && styles.loadingCenter,
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
      {showInlineLoader && loadingPosition === 'left' ? (
        <span className={styles.icon}>
          <ButtonProcessingDots />
        </span>
      ) : null}
      {!showCenterLoader && startIcon ? (
        <span className={styles.icon} aria-hidden>
          {startIcon}
        </span>
      ) : null}
      {children ? (
        <span className={styles.label} aria-hidden={showCenterLoader}>
          {children}
        </span>
      ) : null}
      {!showCenterLoader && endIcon ? (
        <span className={styles.icon} aria-hidden>
          {endIcon}
        </span>
      ) : null}
      {showInlineLoader && loadingPosition === 'right' ? (
        <span className={styles.icon}>
          <ButtonProcessingDots />
        </span>
      ) : null}
      {showCenterLoader ? (
        <span className={styles.processing} aria-hidden>
          <ButtonProcessingDots />
        </span>
      ) : null}
    </button>
  );
}
