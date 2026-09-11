import type { ReactNode } from 'react';
import { Checkbox } from '../Checkbox';
import type { TextFieldOption } from '../TextField/types';
import type { DropdownPlacement } from '../TextField/useDropdown';
import tfStyles from '../TextField/TextField.module.css';
import styles from './MultiSelect.module.css';

export type MultiSelectMenuProps = {
  options: TextFieldOption[];
  value: string[];
  activeIndex?: number;
  onToggle: (option: TextFieldOption) => void;
  footer?: ReactNode;
  id?: string;
  placement?: DropdownPlacement;
};

/**
 * Menu rows use the kit Checkbox as the only toggle surface.
 * Do not put onClick on the <li> — it double-fires with Checkbox onChange and cancels the toggle.
 */
export function MultiSelectMenu({
  options,
  value,
  activeIndex = -1,
  onToggle,
  footer,
  id,
  placement = 'bottom',
}: MultiSelectMenuProps) {
  return (
    <div className={tfStyles.menu} data-name="menu" data-placement={placement}>
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
                aria-disabled={option.disabled || undefined}
                data-active={index === activeIndex ? 'true' : undefined}
                data-disabled={option.disabled ? 'true' : undefined}
                className={styles.menuCheckboxItem}
                onMouseDown={(event) => {
                  // Keep focus on the trigger; avoid closing via blur.
                  event.preventDefault();
                }}
              >
                <Checkbox
                  className={styles.menuCheckbox}
                  size="sm"
                  label={option.label}
                  checked={selected}
                  disabled={option.disabled}
                  tabIndex={-1}
                  onChange={() => {
                    if (!option.disabled) onToggle(option);
                  }}
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
