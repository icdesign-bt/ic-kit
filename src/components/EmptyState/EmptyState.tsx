import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import styles from './EmptyState.module.css';

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode | false;
  action?: ReactNode;
  children?: ReactNode;
};

export function EmptyState({
  title = 'Ничего не найдено',
  description,
  icon,
  action,
  children,
  className,
  ...rest
}: EmptyStateProps) {
  const showIcon = icon !== false;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} role="status" {...rest}>
      {showIcon ? (
        <span className={styles.icon} aria-hidden>
          {icon ?? (
            <Icon path="System Devices/MagnifyingGlass" size={48} weight="regular" />
          )}
        </span>
      ) : null}
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
      {action ? <div className={styles.actions}>{action}</div> : null}
    </div>
  );
}
