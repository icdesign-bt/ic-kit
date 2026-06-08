import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { SelectionSize } from '../Checkbox/types';
import styles from './Radio.module.css';

const SIZE_CLASS: Record<SelectionSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> & {
  label?: ReactNode;
  size?: SelectionSize;
};

export function Radio({
  label,
  size = 'lg',
  className,
  id,
  disabled,
  ...rest
}: RadioProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <label
      className={[styles.root, SIZE_CLASS[size], className].filter(Boolean).join(' ')}
      data-disabled={disabled ? 'true' : undefined}
      htmlFor={fieldId}
    >
      <input
        id={fieldId}
        type="radio"
        className={styles.input}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.control}>
        <span className={styles.ring} aria-hidden>
          <span className={styles.dot} />
        </span>
      </span>
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}
