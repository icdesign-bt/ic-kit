import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonColor, ButtonSize, ButtonVariant } from './types';
import { cn, composeTextSizeClass, composeVariantClass } from './utils';
import styles from './Button.module.css';

type SplitVariant = Extract<ButtonVariant, 'contained' | 'outlined' | 'tonal'>;

export type SplitButtonProps = Omit<ButtonHTMLAttributes<HTMLDivElement>, 'color'> & {
  label: ReactNode;
  variant?: SplitVariant;
  color?: ButtonColor;
  size?: Exclude<ButtonSize, 'xsm' | 'xlg'>;
  startIcon?: ReactNode;
  disabled?: boolean;
  onActionClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  onMenuClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  menuIcon?: ReactNode;
  menuAriaLabel?: string;
};

export function SplitButton({
  label,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  startIcon,
  disabled = false,
  onActionClick,
  onMenuClick,
  menuIcon,
  menuAriaLabel = 'Open menu',
  className,
  ...rest
}: SplitButtonProps) {
  const variantClass = composeVariantClass(variant, color);
  const sizeClass = composeTextSizeClass(size);

  const splitClasses = cn(
    styles.split,
    size === 'sm' && styles.splitSizeSm,
    size === 'lg' && styles.splitSizeLg,
    variant === 'outlined' && styles.splitOutlined,
    variant === 'tonal' && styles.splitTonal,
    className,
  );

  return (
    <div className={splitClasses} {...rest}>
      <button
        type="button"
        className={cn(styles.splitAction, variantClass, sizeClass)}
        disabled={disabled}
        onClick={onActionClick}
      >
        {startIcon ? <span className={styles.icon}>{startIcon}</span> : null}
        <span className={styles.label}>{label}</span>
      </button>
      <button
        type="button"
        className={cn(styles.splitTrigger, variantClass, sizeClass)}
        disabled={disabled}
        aria-label={menuAriaLabel}
        onClick={onMenuClick}
      >
        <span className={styles.icon}>{menuIcon}</span>
      </button>
    </div>
  );
}
