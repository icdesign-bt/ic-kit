import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import type { SnackbarColor, SnackbarOrientation } from './types';
import styles from './Snackbar.module.css';

export type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  color?: SnackbarColor;
  orientation?: SnackbarOrientation;
  /** Figma `end` — показывать кнопки действия. */
  showActions?: boolean;
  message: ReactNode;
  icon?: ReactNode | false;
  actionLabel?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  role?: 'status' | 'alert';
};

export function Snackbar({
  color = 'light',
  orientation = 'horizontal',
  showActions = true,
  message,
  icon,
  actionLabel,
  onAction,
  onClose,
  children,
  className,
  role = 'status',
  ...rest
}: SnackbarProps) {
  const showStartIcon = icon !== false;
  const isHorizontal = orientation === 'horizontal';
  const showHeaderActions =
    isHorizontal && showActions && Boolean(actionLabel || onClose);
  const showFooterAction =
    !isHorizontal && showActions && Boolean(actionLabel);
  const closeIconPath =
    color === 'dark'
      ? 'Arrows & Directions/CaretRight'
      : 'Math & Finances/X';

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-color={color}
      data-orientation={orientation}
      role={role}
      aria-live="polite"
      {...rest}
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {showStartIcon ? (
            <span className={styles.icon} aria-hidden>
              {icon ?? <Icon path="Security & Warning/Info" size={16} weight="bold" />}
            </span>
          ) : null}
          <p className={styles.message}>{message}</p>
        </div>

        {showHeaderActions ? (
          <div className={styles.actions}>
            {actionLabel ? (
              <button type="button" className={styles.action} onClick={onAction}>
                <span className={styles.actionLabel}>{actionLabel}</span>
              </button>
            ) : null}
            {onClose ? (
              <button
                type="button"
                className={styles.close}
                aria-label="Закрыть"
                onClick={onClose}
              >
                <Icon path={closeIconPath} size={16} weight="bold" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {children ? <div className={styles.slot}>{children}</div> : null}

      {showFooterAction ? (
        <div className={styles.footer}>
          <button type="button" className={styles.action} onClick={onAction}>
            <span className={styles.actionLabel}>{actionLabel}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
