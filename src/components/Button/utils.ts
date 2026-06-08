import type { ButtonColor, ButtonSize, ButtonVariant } from './types';
import styles from './Button.module.css';

const VARIANT_COLOR_MAP: Record<ButtonVariant, Record<ButtonColor, string>> = {
  contained: {
    primary: styles.containedPrimary,
    secondary: styles.containedSecondary,
    neutral: styles.containedNeutral,
    success: styles.containedSuccess,
    warning: styles.containedWarning,
    error: styles.containedError,
  },
  tonal: {
    primary: styles.tonalPrimary,
    secondary: styles.tonalSecondary,
    neutral: styles.tonalNeutral,
    success: styles.tonalSuccess,
    warning: styles.tonalWarning,
    error: styles.tonalError,
  },
  outlined: {
    primary: styles.outlinedPrimary,
    secondary: styles.outlinedSecondary,
    neutral: styles.outlinedNeutral,
    success: styles.outlinedSuccess,
    warning: styles.outlinedWarning,
    error: styles.outlinedError,
  },
  text: {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    neutral: styles.textNeutral,
    success: styles.textSuccess,
    warning: styles.textWarning,
    error: styles.textError,
  },
};

const TEXT_SIZE_MAP: Partial<Record<ButtonSize, string>> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xlg: styles.sizeXlg,
};

const ICON_SIZE_MAP: Record<ButtonSize, string> = {
  xsm: styles.iconSizeXsm,
  sm: styles.iconSizeSm,
  md: styles.iconSizeMd,
  lg: styles.iconSizeLg,
  xlg: styles.iconSizeXlg,
};

export function composeVariantClass(variant: ButtonVariant, color: ButtonColor): string {
  return VARIANT_COLOR_MAP[variant][color];
}

export function composeTextSizeClass(size: ButtonSize): string | undefined {
  return TEXT_SIZE_MAP[size];
}

export function composeIconSizeClass(size: ButtonSize): string {
  return ICON_SIZE_MAP[size];
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
