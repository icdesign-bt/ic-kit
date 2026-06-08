import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { SwitchColor, SwitchSize } from './types';
import styles from './Switch.module.css';

const SIZE_CLASS: Record<SwitchSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const COLOR_CLASS: Record<SwitchColor, string> = {
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
};

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'children'
> & {
  label?: ReactNode;
  size?: SwitchSize;
  color?: SwitchColor;
};

export function Switch({
  label,
  size = 'lg',
  color = 'primary',
  className,
  id,
  disabled,
  checked,
  defaultChecked,
  ...rest
}: SwitchProps) {
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
        type="checkbox"
        role="switch"
        className={styles.input}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        {...rest}
      />
      <span className={styles.control} aria-hidden>
        <span className={[styles.track, COLOR_CLASS[color]].join(' ')}>
          <span className={styles.handle} />
        </span>
      </span>
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}
