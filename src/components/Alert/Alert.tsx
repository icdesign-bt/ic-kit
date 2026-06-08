import type { AriaRole, HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import type { IconPath } from '../../icons/types';
import type { AlertType, AlertVariant } from './types';
import styles from './Alert.module.css';

const TYPE_ICONS: Record<AlertType, IconPath> = {
  primary: 'Security & Warning/Info',
  secondary: 'Security & Warning/Info',
  success: 'System Devices/CheckCircle',
  error: 'Security & Warning/WarningCircle',
  warning: 'Security & Warning/Warning',
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  type?: AlertType;
  variant?: AlertVariant;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode | false;
  actionLabel?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
  slot?: ReactNode;
  role?: AriaRole;
};

export function Alert({
  type = 'primary',
  variant = 'tonal',
  title,
  description,
  children,
  icon,
  actionLabel,
  onAction,
  onClose,
  slot,
  className,
  role = 'alert',
  ...rest
}: AlertProps) {
  const body = description ?? children;
  const showIcon = icon !== false;
  const showEnd = Boolean(actionLabel || onClose);
  const resolvedIcon =
    icon === undefined ? (
      <Icon path={TYPE_ICONS[type]} size={20} weight="fill" />
    ) : (
      icon
    );

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-type={type}
      data-variant={variant}
      role={role}
      {...rest}
    >
      {showIcon ? <span className={styles.icon}>{resolvedIcon}</span> : null}

      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {body ? <p className={styles.description}>{body}</p> : null}
        {slot ? <div className={styles.slot}>{slot}</div> : null}
      </div>

      {showEnd ? (
        <div className={styles.end}>
          {actionLabel ? (
            <button type="button" className={styles.action} onClick={onAction}>
              <span className={styles.actionLabel}>{actionLabel}</span>
            </button>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Закрыть"
            >
              <Icon path="Math & Finances/X" size={16} weight="bold" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
