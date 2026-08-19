import type { ReactNode } from 'react';
import type { TextFieldOption } from './types';
import type { DropdownPlacement } from './useDropdown';
import styles from './TextField.module.css';

export type TextFieldMenuProps = {
  options: TextFieldOption[];
  value?: string;
  activeIndex?: number;
  onSelect: (option: TextFieldOption) => void;
  footer?: ReactNode;
  id?: string;
  /** Where the menu opens relative to the field. Default: bottom. */
  placement?: DropdownPlacement;
};

export function TextFieldMenu({
  options,
  value,
  activeIndex = -1,
  onSelect,
  footer,
  id,
  placement = 'bottom',
}: TextFieldMenuProps) {
  return (
    <div className={styles.menu} data-name="menu" data-placement={placement}>
      <div className={styles.menuBody}>
        <ul className={styles.menuList} role="listbox" id={id}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              data-selected={option.value === value ? 'true' : undefined}
              data-active={index === activeIndex ? 'true' : undefined}
              data-disabled={option.disabled ? 'true' : undefined}
              className={styles.menuItem}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                if (!option.disabled) onSelect(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
      {footer ? <div className={styles.menuFooter}>{footer}</div> : null}
    </div>
  );
}
