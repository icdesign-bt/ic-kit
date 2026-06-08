import type { ReactNode } from 'react';
import { Radio } from './Radio';
import type { SelectionSize } from '../Checkbox/types';
import styles from './Radio.module.css';

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  size?: SelectionSize;
  legend?: ReactNode;
  direction?: 'column' | 'row';
  className?: string;
  disabled?: boolean;
};

export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  options,
  size = 'lg',
  legend,
  direction = 'column',
  className,
  disabled,
}: RadioGroupProps) {
  return (
    <fieldset
      className={[styles.group, className].filter(Boolean).join(' ')}
      disabled={disabled}
      role="radiogroup"
    >
      {legend ? <legend className={styles.groupLegend}>{legend}</legend> : null}
      <div className={direction === 'row' ? styles.groupRow : undefined}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            size={size}
            disabled={disabled || option.disabled}
            checked={value !== undefined ? value === option.value : undefined}
            defaultChecked={value === undefined ? defaultValue === option.value : undefined}
            onChange={(event) => {
              if (event.target.checked) onChange?.(option.value);
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}
