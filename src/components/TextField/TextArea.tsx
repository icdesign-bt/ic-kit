import type { TextareaHTMLAttributes } from 'react';
import type { TextFieldShellProps } from './types';
import { TextFieldControl } from './TextFieldControl';
import { TextFieldRoot } from './TextFieldRoot';
import { useFieldIds } from './useFieldIds';
import styles from './TextField.module.css';

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'> &
  TextFieldShellProps & {
    resizable?: boolean;
  };

export function TextArea({
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
  resizable = true,
  rows = 4,
  ...rest
}: TextAreaProps) {
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
        multiline
      >
        <textarea
          id={fieldId}
          rows={rows}
          className={[styles.input, styles.textarea, !resizable && styles.textareaNoResize]
            .filter(Boolean)
            .join(' ')}
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
