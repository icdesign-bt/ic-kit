import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../Icon';
import type { TextFieldShellProps, TextFieldOption } from './types';
import { TextFieldControl } from './TextFieldControl';
import { TextFieldMenu } from './TextFieldMenu';
import { TextFieldRoot } from './TextFieldRoot';
import { useDropdown } from './useDropdown';
import { useFieldIds } from './useFieldIds';
import styles from './TextField.module.css';

export type AutocompleteProps = Omit<TextFieldShellProps, 'endIcon'> & {
  value?: string;
  defaultValue?: string;
  inputValue?: string;
  defaultInputValue?: string;
  placeholder?: string;
  options: TextFieldOption[];
  onChange?: (value: string) => void;
  onInputChange?: (inputValue: string) => void;
  freeSolo?: boolean;
  name?: string;
  menuFooter?: ReactNode;
  clearable?: boolean;
};

export function Autocomplete({
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
  inputValue: inputValueProp,
  defaultInputValue = '',
  placeholder = 'Placeholder',
  options,
  onChange,
  onInputChange,
  freeSolo = false,
  name,
  menuFooter,
  clearable = true,
}: AutocompleteProps) {
  const { fieldId, labelId, helperId } = useFieldIds(id);
  const { open, setOpen, close, rootRef, placement } = useDropdown(disabled || readOnly);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [uncontrolledInput, setUncontrolledInput] = useState(defaultInputValue);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isValueControlled = valueProp !== undefined;
  const isInputControlled = inputValueProp !== undefined;
  const value = isValueControlled ? valueProp : uncontrolledValue;
  const inputValue = isInputControlled ? inputValueProp : uncontrolledInput;

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [inputValue, options]);

  const setValue = useCallback(
    (next: string) => {
      if (!isValueControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isValueControlled, onChange],
  );

  const setInput = useCallback(
    (next: string) => {
      if (!isInputControlled) setUncontrolledInput(next);
      onInputChange?.(next);
    },
    [isInputControlled, onInputChange],
  );

  const handleSelect = useCallback(
    (option: TextFieldOption) => {
      setValue(option.value);
      setInput(option.label);
      close();
      setActiveIndex(-1);
    },
    [close, setInput, setValue],
  );

  const handleClear = useCallback(() => {
    setInput('');
    setValue('');
    setActiveIndex(-1);
    setOpen(false);
  }, [setInput, setOpen, setValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setInput(next);
    setOpen(true);
    setActiveIndex(-1);

    if (freeSolo) {
      setValue(next);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) setOpen(true);
    }

    if (event.key === 'ArrowDown') {
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    }

    if (event.key === 'ArrowUp') {
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option && !option.disabled) handleSelect(option);
    }

    if (event.key === 'Escape') {
      close();
    }
  };

  const showClear = clearable && Boolean(inputValue) && !disabled && !readOnly;

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
        startIcon={startIcon}
        endAction={
          showClear ? (
            <button
              type="button"
              className={styles.iconAction}
              aria-label="Очистить"
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
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={`${fieldId}-listbox`}
          aria-activedescendant={
            activeIndex >= 0 ? `${fieldId}-option-${activeIndex}` : undefined
          }
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          aria-invalid={error || undefined}
          onChange={handleInputChange}
          onFocus={() => !disabled && !readOnly && setOpen(true)}
          onKeyDown={handleKeyDown}
        />
      </TextFieldControl>
      {open && filteredOptions.length > 0 ? (
        <TextFieldMenu
          id={`${fieldId}-listbox`}
          options={filteredOptions}
          value={value}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          footer={menuFooter}
          placement={placement}
        />
      ) : null}
    </TextFieldRoot>
  );
}
