import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import { Icon } from '../Icon';
import type { TextFieldShellProps } from './types';
import { DatePickerCalendar } from './DatePickerCalendar';
import { formatRuDate, fromIsoDate, parseRuDate, toIsoDate } from './date-utils';
import { TextFieldControl } from './TextFieldControl';
import { TextFieldRoot } from './TextFieldRoot';
import { useDropdown } from './useDropdown';
import { useFieldIds } from './useFieldIds';
import styles from './TextField.module.css';

export type DatePickerProps = Omit<TextFieldShellProps, 'endIcon' | 'startIcon'> & {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  clearable?: boolean;
};

export function DatePicker({
  label,
  labelIcon,
  labelAction,
  helperText,
  error,
  size = 'lg',
  variant = 'outlined',
  color = 'primary',
  fullWidth,
  className,
  id,
  disabled,
  readOnly,
  value: valueProp,
  defaultValue,
  placeholder = 'дд.мм.гггг',
  onChange,
  name,
  clearable = true,
}: DatePickerProps) {
  const { fieldId, labelId, helperId } = useFieldIds(id);
  const { open, setOpen, close, rootRef } = useDropdown(disabled || readOnly);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [inputText, setInputText] = useState(() => {
    const initial = valueProp ?? defaultValue ?? '';
    const date = fromIsoDate(initial);
    return date ? formatRuDate(date) : '';
  });
  const [focused, setFocused] = useState(false);

  const isControlled = valueProp !== undefined;
  const isoValue = isControlled ? valueProp : uncontrolledValue;
  const selectedDate = fromIsoDate(isoValue);

  useEffect(() => {
    const date = fromIsoDate(isoValue);
    setInputText(date ? formatRuDate(date) : '');
  }, [isoValue]);

  const setIsoValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const commitDate = useCallback(
    (date: Date | null) => {
      if (!date) {
        setIsoValue('');
        setInputText('');
        return;
      }
      setIsoValue(toIsoDate(date));
      setInputText(formatRuDate(date));
    },
    [setIsoValue],
  );

  const handleSelect = (date: Date) => {
    commitDate(date);
    close();
  };

  const handleClear = () => {
    commitDate(null);
    close();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const parsed = parseRuDate(inputText);
    if (parsed) {
      commitDate(parsed);
    } else if (!inputText.trim()) {
      commitDate(null);
    } else if (selectedDate) {
      setInputText(formatRuDate(selectedDate));
    }
    setFocused(false);
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      close();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') close();
    if (event.key === 'Enter') {
      const parsed = parseRuDate(inputText);
      if (parsed) {
        commitDate(parsed);
        close();
      }
    }
  };

  const showClear = clearable && Boolean(isoValue) && !disabled && !readOnly;

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
        endAction={
          showClear ? (
            <button
              type="button"
              className={styles.iconAction}
              aria-label="Очистить дату"
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
            >
              <Icon path="Math & Finances/X" size={16} weight="bold" />
            </button>
          ) : undefined
        }
      >
        <input
          id={fieldId}
          name={name}
          className={styles.input}
          value={inputText}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          inputMode="numeric"
          aria-invalid={error || undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          aria-expanded={open}
          onChange={handleInputChange}
          onFocus={() => {
            setFocused(true);
            if (!disabled && !readOnly) setOpen(true);
          }}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      </TextFieldControl>
      {open ? (
        <div
          className={styles.calendarPopover}
          onMouseDown={(event) => event.preventDefault()}
        >
          <DatePickerCalendar value={selectedDate} onSelect={handleSelect} />
        </div>
      ) : null}
    </TextFieldRoot>
  );
}
