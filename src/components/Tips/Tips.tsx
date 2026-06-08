import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import type { TipsColor } from './types';
import styles from './Tips.module.css';

export type TipsProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  color?: TipsColor;
  title: ReactNode;
  text?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: ReactNode | false;
  onClose?: () => void;
};

export function Tips({
  color = 'error',
  title,
  text,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  icon,
  onClose,
  className,
  ...rest
}: TipsProps) {
  const titleId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const collapsible = text !== undefined && text !== null && text !== false;
  const showStartIcon = icon !== false;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-color={color}
      data-open={open && collapsible ? 'true' : 'false'}
      role="region"
      aria-labelledby={titleId}
      {...rest}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {showStartIcon ? (
            <span className={styles.startIcon} aria-hidden>
              {icon ?? <Icon path="System Devices/Lightbulb" size={16} weight="regular" />}
            </span>
          ) : null}
          <p id={titleId} className={styles.title}>
            {title}
          </p>
        </div>

        <div className={styles.actions}>
          {collapsible ? (
            <button
              type="button"
              className={styles.action}
              aria-label={open ? 'Свернуть' : 'Развернуть'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <Icon
                path={open ? 'Arrows & Directions/CaretUp' : 'Arrows & Directions/CaretDown'}
                size={12}
                weight="bold"
              />
            </button>
          ) : null}
          {onClose ? (
            <button type="button" className={styles.action} aria-label="Закрыть" onClick={onClose}>
              <Icon path="Math & Finances/X" size={12} weight="bold" />
            </button>
          ) : null}
        </div>
      </div>

      {open && collapsible ? (
        <div className={styles.body}>
          <p className={styles.text}>{text}</p>
        </div>
      ) : null}
    </div>
  );
}
