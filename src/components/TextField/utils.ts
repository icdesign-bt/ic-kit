import type { TextFieldColor, TextFieldSize, TextFieldVariant } from './types';
import styles from './TextField.module.css';

const SIZE_MAP: Record<TextFieldSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const VARIANT_MAP: Record<TextFieldVariant, string> = {
  outlined: styles.variantOutlined,
  filled: styles.variantFilled,
  text: styles.variantText,
};

const COLOR_MAP: Record<TextFieldColor, string> = {
  primary: styles.colorPrimary,
  info: styles.colorInfo,
};

export function composeSizeClass(size: TextFieldSize): string {
  return SIZE_MAP[size];
}

export function composeVariantClass(variant: TextFieldVariant): string {
  return VARIANT_MAP[variant];
}

export function composeColorClass(color: TextFieldColor): string {
  return COLOR_MAP[color];
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
