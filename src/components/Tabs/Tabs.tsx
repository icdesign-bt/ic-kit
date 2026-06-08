import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Tab } from './Tab';
import type { TabOrientation, TabSize, TabVariant } from './types';
import styles from './Tabs.module.css';

export type TabItem = {
  value: string;
  label: ReactNode;
  subLabel?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  panel?: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: TabVariant;
  orientation?: TabOrientation;
  size?: TabSize;
  className?: string;
  'aria-label'?: string;
};

function getNextEnabledIndex(items: TabItem[], start: number, step: 1 | -1): number {
  const len = items.length;
  for (let i = 0; i < len; i += 1) {
    const index = (start + step * (i + 1) + len) % len;
    if (!items[index]?.disabled) return index;
  }
  return start;
}

export function Tabs({
  items,
  value,
  onChange,
  variant = 'text',
  orientation = 'horizontal',
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const focusTabByIndex = (index: number) => {
    const tab = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index];
    tab?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = items.findIndex((item) => item.value === value);
    if (currentIndex < 0) return;

    const isHorizontal = orientation === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    let nextIndex: number | null = null;

    switch (event.key) {
      case prevKey:
        nextIndex = getNextEnabledIndex(items, currentIndex, -1);
        break;
      case nextKey:
        nextIndex = getNextEnabledIndex(items, currentIndex, 1);
        break;
      case 'Home':
        nextIndex = items.findIndex((item) => !item.disabled);
        break;
      case 'End':
        nextIndex = items.length - 1 - [...items].reverse().findIndex((item) => !item.disabled);
        break;
      default:
        return;
    }

    if (nextIndex === null || nextIndex < 0 || nextIndex === currentIndex) return;

    event.preventDefault();
    const nextValue = items[nextIndex]?.value;
    if (nextValue) {
      onChange(nextValue);
      focusTabByIndex(nextIndex);
    }
  };

  const listClass = [
    styles.list,
    orientation === 'horizontal' ? styles.listHorizontal : styles.listVertical,
    variant === 'filled' ? styles.listFilled : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-orientation={orientation}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={listClass}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const selected = item.value === value;
          const tabId = `${baseId}-tab-${item.value}`;
          const panelId = `${baseId}-panel-${item.value}`;

          return (
            <Tab
              key={item.value}
              id={tabId}
              label={item.label}
              subLabel={item.subLabel}
              icon={item.icon}
              selected={selected}
              disabled={item.disabled}
              variant={variant}
              orientation={orientation}
              size={size}
              tabIndex={selected ? 0 : -1}
              aria-controls={item.panel !== undefined ? panelId : undefined}
              onClick={() => {
                if (!item.disabled) onChange(item.value);
              }}
            />
          );
        })}
      </div>
      {items.map((item) => {
        if (item.panel === undefined) return null;
        const selected = item.value === value;
        const tabId = `${baseId}-tab-${item.value}`;
        const panelId = `${baseId}-panel-${item.value}`;

        return (
          <div
            key={item.value}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className={styles.panel}
          >
            {selected ? item.panel : null}
          </div>
        );
      })}
    </div>
  );
}
