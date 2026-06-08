import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { TabOrientation, TabSize, TabVariant } from './types';
import styles from './Tabs.module.css';

const SIZE_CLASS: Record<TabSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xlg: styles.sizeXlg,
};

export type TabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> & {
  label: ReactNode;
  subLabel?: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  variant?: TabVariant;
  orientation?: TabOrientation;
  size?: TabSize;
};

export function Tab({
  label,
  subLabel,
  icon,
  selected = false,
  variant = 'text',
  orientation = 'horizontal',
  size = 'md',
  className,
  disabled,
  ...rest
}: TabProps) {
  const variantClass = variant === 'text' ? styles.tabText : styles.tabFilled;

  return (
    <button
      type="button"
      role="tab"
      className={[styles.tab, variantClass, SIZE_CLASS[size], className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-orientation={orientation}
      data-selected={selected ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : undefined}
      data-sublabel={subLabel ? 'true' : undefined}
      aria-selected={selected}
      disabled={disabled}
      {...rest}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {subLabel ? (
        <span className={[styles.content, styles.contentSublabel].join(' ')}>
          <span>{label}</span>
          <span className={styles.sublabel}>{subLabel}</span>
        </span>
      ) : (
        <span className={styles.content}>{label}</span>
      )}
    </button>
  );
}
