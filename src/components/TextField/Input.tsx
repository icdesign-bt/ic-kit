import type { InputHTMLAttributes } from 'react';
import type { TextFieldShellProps } from './types';
import { TextFieldControl } from './TextFieldControl';
import { TextFieldRoot } from './TextFieldRoot';
import { useFieldIds } from './useFieldIds';
import styles from './TextField.module.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> &
  TextFieldShellProps;

export function Input({
  label,
  labelIcon,
  labelAction,
  helperText,
  error,
  size = 'lg',
  variant = 'outlined',
  color = 'primary',
  startIcon,
  endIcon,
  fullWidth,
  className,
  id,
  disabled,
  readOnly,
  ...rest
}: InputProps) {
  const { fieldId, labelId, helperId } = useFieldIds(id);

  return (
    <TextFieldRoot
      label={label}
      labelIcon={labelIcon}
      labelAction={labelAction}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
      className={className}
      id={fieldId}
    >
      <TextFieldControl
        size={size}
        variant={variant}
        color={color}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        <input
          id={fieldId}
          className={styles.input}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error || undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...rest}
        />
      </TextFieldControl>
    </TextFieldRoot>
  );
}
