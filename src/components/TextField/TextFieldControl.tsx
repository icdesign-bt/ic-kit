import type { ReactNode } from 'react';
import type { TextFieldColor, TextFieldSize, TextFieldVariant } from './types';
import { cn, composeColorClass, composeSizeClass, composeVariantClass } from './utils';
import styles from './TextField.module.css';

export type TextFieldControlProps = {
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  color?: TextFieldColor;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  endAction?: ReactNode;
  focused?: boolean;
  className?: string;
  children: ReactNode;
};

export function TextFieldControl({
  size = 'lg',
  variant = 'outlined',
  color = 'primary',
  error,
  disabled,
  readOnly,
  multiline,
  startIcon,
  endIcon,
  endAction,
  focused,
  className,
  children,
}: TextFieldControlProps) {
  const iconSizeClass =
    size === 'sm' ? styles.iconSlotSm : size === 'md' ? styles.iconSlotMd : styles.iconSlotLg;

  return (
    <div
      className={cn(
        styles.control,
        composeSizeClass(size),
        composeVariantClass(variant),
        composeColorClass(color),
        multiline && styles.controlMultiline,
        className,
      )}
      data-disabled={disabled ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      data-error={error ? 'true' : undefined}
      data-focused={focused ? 'true' : undefined}
    >
      {startIcon ? (
        <span className={cn(styles.iconSlot, iconSizeClass)} aria-hidden>
          {startIcon}
        </span>
      ) : null}
      {children}
      {endAction ? (
        <span className={cn(styles.iconSlot, styles.iconSlotCompact)}>{endAction}</span>
      ) : endIcon ? (
        <span className={cn(styles.iconSlot, iconSizeClass)} aria-hidden>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}
