import type { ReactNode } from 'react';

export type TextFieldSize = 'sm' | 'md' | 'lg';
export type TextFieldVariant = 'outlined' | 'filled' | 'text';
export type TextFieldColor = 'primary' | 'info';

export type TextFieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type TextFieldShellProps = {
  label?: ReactNode;
  labelIcon?: ReactNode;
  labelAction?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  color?: TextFieldColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
};
