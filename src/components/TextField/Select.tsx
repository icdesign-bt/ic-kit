import { useCallback, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../Icon';
import type { TextFieldShellProps, TextFieldOption } from './types';
import { TextFieldControl } from './TextFieldControl';
import { TextFieldMenu } from './TextFieldMenu';
import { TextFieldRoot } from './TextFieldRoot';
import { useDropdown } from './useDropdown';
import { useFieldIds } from './useFieldIds';
import { cn } from './utils';
import styles from './TextField.module.css';

export type SelectProps = Omit<TextFieldShellProps, 'endIcon'> & {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  options: TextFieldOption[];
  onChange?: (value: string) => void;
  name?: string;
  menuFooter?: ReactNode;
};

export function Select({
  label,
  labelIcon,
  labelAction,
  helperText,
  error,
  size = 'lg',
  variant = 'outlined',
  color = 'primary',
  startIcon,
  fullWidth,
  className,
  id,
  disabled,
  readOnly,
  value: valueProp,
  defaultValue,
  placeholder = 'Placeholder',
  options,
  onChange,
  name,
  menuFooter,
}: SelectProps) {
  const { fieldId, labelId, helperId } = useFieldIds(id);
  const { open, toggle, close, rootRef } = useDropdown(disabled || readOnly);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const selected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleSelect = useCallback(
    (option: TextFieldOption) => {
      setValue(option.value);
      close();
      setActiveIndex(-1);
    },
    [close, setValue],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      toggle();
      return;
    }

    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      toggle();
      setActiveIndex(event.key === 'ArrowDown' ? 0 : options.length - 1);
      return;
    }

    if (!open) return;

    if (event.key === 'ArrowDown') {
      setActiveIndex((index) => {
        const next = index < options.length - 1 ? index + 1 : 0;
        return options[next]?.disabled ? next + 1 : next;
      });
    }

    if (event.key === 'ArrowUp') {
      setActiveIndex((index) => {
        const next = index > 0 ? index - 1 : options.length - 1;
        return options[next]?.disabled ? next - 1 : next;
      });
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      const option = options[activeIndex];
      if (option && !option.disabled) handleSelect(option);
    }
  };

  const caretIcon = (
    <span className={cn(styles.selectCaret, open && styles.selectCaretUp)} aria-hidden>
      <Icon path="Arrows & Directions/CaretDown" size={16} />
    </span>
  );

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
      controlRef={rootRef}
    >
      <TextFieldControl
        size={size}
        variant={variant}
        color={color}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        focused={open || focused}
        startIcon={startIcon}
        endAction={caretIcon}
      >
        <button
          type="button"
          id={fieldId}
          name={name}
          className={styles.selectTrigger}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          aria-invalid={error || undefined}
          onClick={toggle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
        >
          <span className={selected ? undefined : styles.selectPlaceholder}>
            {selected?.label ?? placeholder}
          </span>
        </button>
      </TextFieldControl>
      {open ? (
        <TextFieldMenu
          options={options}
          value={value}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          footer={menuFooter}
        />
      ) : null}
    </TextFieldRoot>
  );
}
