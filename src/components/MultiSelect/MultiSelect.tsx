import {
  useCallback,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import { TextFieldControl } from '../TextField/TextFieldControl';
import { TextFieldRoot } from '../TextField/TextFieldRoot';
import type { TextFieldOption, TextFieldShellProps } from '../TextField/types';
import { useDropdown } from '../TextField/useDropdown';
import { useFieldIds } from '../TextField/useFieldIds';
import { MultiSelectMenu } from './MultiSelectMenu';
import tfStyles from '../TextField/TextField.module.css';
import styles from './MultiSelect.module.css';

export type MultiSelectProps = Omit<TextFieldShellProps, 'endIcon' | 'startIcon'> & {
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  options: TextFieldOption[];
  onChange?: (value: string[]) => void;
  name?: string;
  menuFooter?: ReactNode;
  clearable?: boolean;
  /** Сколько чипов показывать до счётчика «+N». По макету — 1. */
  maxVisibleTags?: number;
};

export function MultiSelect({
  label,
  labelIcon,
  labelAction,
  helperText,
  error,
  size = 'md',
  variant = 'outlined',
  color = 'primary',
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
  clearable = true,
  maxVisibleTags = 1,
}: MultiSelectProps) {
  const { fieldId, labelId, helperId } = useFieldIds(id);
  const { open, toggle, close, rootRef, placement } = useDropdown(disabled || readOnly);
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(defaultValue ?? []);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value],
  );

  const visibleTags = selectedOptions.slice(0, maxVisibleTags);
  const hiddenCount = Math.max(0, selectedOptions.length - maxVisibleTags);

  const toggleOption = useCallback(
    (option: TextFieldOption) => {
      const exists = value.includes(option.value);
      const next = exists
        ? value.filter((item) => item !== option.value)
        : [...value, option.value];
      setValue(next);
    },
    [setValue, value],
  );

  const removeOption = useCallback(
    (optionValue: string) => {
      setValue(value.filter((item) => item !== optionValue));
    },
    [setValue, value],
  );

  const handleClear = useCallback(() => {
    setValue([]);
    setActiveIndex(-1);
  }, [setValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;

    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (!open) {
        toggle();
        return;
      }
      if (activeIndex >= 0) {
        const option = options[activeIndex];
        if (option && !option.disabled) toggleOption(option);
      }
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
        return options[next]?.disabled ? (next + 1) % options.length : next;
      });
    }

    if (event.key === 'ArrowUp') {
      setActiveIndex((index) => {
        const next = index > 0 ? index - 1 : options.length - 1;
        return options[next]?.disabled ? (next - 1 + options.length) % options.length : next;
      });
    }
  };

  const showClear = clearable && value.length > 0 && !disabled && !readOnly;
  const hasValue = value.length > 0;

  const endActions = (
    <span className={styles.endActions}>
      {error ? (
        <span className={styles.errorIcon} aria-hidden>
          <Icon path="Security & Warning/WarningCircle" size={16} weight="fill" />
        </span>
      ) : null}
      {showClear ? (
        <button
          type="button"
          className={tfStyles.iconAction}
          aria-label="Очистить"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => {
            event.stopPropagation();
            handleClear();
          }}
        >
          <Icon path="Math & Finances/X" size={12} weight="bold" />
        </button>
      ) : null}
      <button
        type="button"
        className={tfStyles.iconAction}
        aria-label={open ? 'Свернуть список' : 'Развернуть список'}
        tabIndex={-1}
        disabled={disabled || readOnly}
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
      >
        <span className={[styles.caret, open && styles.caretUp].filter(Boolean).join(' ')} aria-hidden>
          <Icon path="Arrows & Directions/CaretDown" size={12} weight="bold" />
        </span>
      </button>
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
        focused={open}
      >
        <div className={styles.inner}>
          <button
            type="button"
            id={fieldId}
            name={name}
            className={styles.trigger}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={helperText ? helperId : undefined}
            aria-invalid={error || undefined}
            onClick={toggle}
            onKeyDown={handleKeyDown}
          >
            <span className={styles.content}>
              {visibleTags.map((option) => (
                <span
                  key={option.value}
                  onClick={(event) => event.stopPropagation()}
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <Chip
                    size="sm"
                    variant="tonal"
                    color="neutral"
                    shape="square"
                    startIcon={false}
                    label={option.label}
                    disabled={disabled}
                    onClose={
                      disabled || readOnly
                        ? undefined
                        : () => removeOption(option.value)
                    }
                  />
                </span>
              ))}
              {hiddenCount > 0 ? (
                <span className={styles.overflowCount}>+{hiddenCount}</span>
              ) : null}
              {!hasValue ? <span className={styles.placeholder}>{placeholder}</span> : null}
            </span>
          </button>
          {endActions}
        </div>
      </TextFieldControl>
      {open ? (
        <MultiSelectMenu
          id={`${fieldId}-listbox`}
          options={options}
          value={value}
          activeIndex={activeIndex}
          onToggle={toggleOption}
          footer={menuFooter}
          placement={placement}
        />
      ) : null}
    </TextFieldRoot>
  );
}
