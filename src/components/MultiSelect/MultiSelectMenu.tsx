import type { ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import type { TextFieldOption } from '../TextField/types';
import tfStyles from '../TextField/TextField.module.css';
import styles from './MultiSelect.module.css';

export type MultiSelectMenuProps = {
  options: TextFieldOption[];
  value: string[];
  activeIndex?: number;
  onToggle: (option: TextFieldOption) => void;
  footer?: ReactNode;
  id?: string;
};

export function MultiSelectMenu({
  options,
  value,
  activeIndex = -1,
  onToggle,
  footer,
  id,
}: MultiSelectMenuProps) {
  return (
    <div className={tfStyles.menu} data-name="menu">
      <div className={tfStyles.menuBody}>
        <ul
          className={tfStyles.menuList}
          role="listbox"
          aria-multiselectable="true"
          id={id}
        >
          {options.map((option, index) => {
            const selected = value.includes(option.value);
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={selected}
                data-active={index === activeIndex ? 'true' : undefined}
                data-disabled={option.disabled ? 'true' : undefined}
                className={styles.menuCheckboxItem}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  if (!option.disabled) onToggle(option);
                }}
              >
                <Checkbox
                  size="sm"
                  label={option.label}
                  checked={selected}
                  disabled={option.disabled}
                  tabIndex={-1}
                  onChange={() => onToggle(option)}
                />
              </li>
            );
          })}
        </ul>
      </div>
      {footer ? <div className={tfStyles.menuFooter}>{footer}</div> : null}
    </div>
  );
}
