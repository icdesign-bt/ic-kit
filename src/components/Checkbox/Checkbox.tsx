import { useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { CheckboxCheck } from './CheckboxCheck';
import type { SelectionSize } from './types';
import styles from './Checkbox.module.css';

const SIZE_CLASS: Record<SelectionSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'children'
> & {
  label?: ReactNode;
  size?: SelectionSize;
  indeterminate?: boolean;
};

export function Checkbox({
  label,
  size = 'lg',
  indeterminate = false,
  className,
  id,
  disabled,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={[styles.root, SIZE_CLASS[size], className].filter(Boolean).join(' ')}
      data-disabled={disabled ? 'true' : undefined}
      htmlFor={fieldId}
    >
      <input
        ref={inputRef}
        id={fieldId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : rest.checked}
        {...rest}
      />
      <span className={styles.control}>
        <span className={styles.box} aria-hidden>
          <span className={styles.icon}>
            <CheckboxCheck size={size} />
          </span>
          <span className={styles.indeterminate} />
        </span>
      </span>
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}
