import type { ReactNode } from 'react';
import type { ButtonColor, ButtonSize, ButtonVariant } from './types';
import { cn } from './utils';
import styles from './Button.module.css';

export type ButtonGroupVariant = Extract<ButtonVariant, 'contained' | 'tonal' | 'outlined'>;

export type ButtonGroupOption = {
  value: string;
  label: ReactNode;
  ariaLabel?: string;
};

export type ButtonGroupProps = {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  /** All segments share the same variant (Figma default: contained). */
  variant?: ButtonGroupVariant;
  color?: Extract<ButtonColor, 'primary' | 'secondary' | 'neutral'>;
  size?: Exclude<ButtonSize, 'xsm'>;
  className?: string;
  'aria-label'?: string;
};

const GROUP_SIZE_CLASS: Partial<Record<ButtonSize, string>> = {
  sm: styles.groupSizeSm,
  md: styles.groupSizeMd,
  lg: styles.groupSizeLg,
  xlg: styles.groupSizeXlg,
};

export function ButtonGroup({
  options,
  value,
  onChange,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: ButtonGroupProps) {
  const groupClasses = cn(styles.group, GROUP_SIZE_CLASS[size], className);

  return (
    <div
      role="group"
      className={groupClasses}
      data-variant={variant}
      data-color={color}
      aria-label={ariaLabel}
    >
      {options.map((option, index) => {
        const selected = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        const segmentClasses = cn(
          styles.groupSegment,
          selected && styles.groupSegmentSelected,
          isFirst && styles.groupSegmentFirst,
          isLast && styles.groupSegmentLast,
        );

        return (
          <button
            key={option.value}
            type="button"
            className={segmentClasses}
            aria-pressed={selected}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
          >
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
