import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import { BadgeIndicator } from './BadgeIndicator';
import type { BadgeColor, BadgeOverlap, BadgeVariant } from './types';
import styles from './Badge.module.css';

function formatBadgeContent(content: ReactNode, max: number): ReactNode {
  if (typeof content === 'number' && content > max) {
    return `+${max}`;
  }
  return content;
}

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'content'> & {
  /** Badge label or counter. `false` hides the badge. */
  content?: ReactNode | false;
  variant?: BadgeVariant;
  color?: BadgeColor;
  overlap?: BadgeOverlap;
  showZero?: boolean;
  max?: number;
  /** Status indicator at bottom-right; `true` — check icon; `false` hides. */
  status?: ReactNode | boolean;
  statusColor?: BadgeColor;
  children?: ReactNode;
};

export function Badge({
  content,
  variant = 'text',
  color = 'primary',
  overlap = 'circular',
  showZero = false,
  max = 99,
  status,
  statusColor = 'success',
  children,
  className,
  ...rest
}: BadgeProps) {
  const hasContent = content !== false && content !== undefined && content !== null;
  const hideNumericZero = typeof content === 'number' && content === 0 && !showZero;
  const showBadge = hasContent && !hideNumericZero && (variant === 'dot' || content !== '');

  const showStatus = status !== undefined && status !== false;

  const indicator = showBadge ? (
    <BadgeIndicator variant={variant} color={color}>
      {variant === 'text' ? formatBadgeContent(content, max) : null}
    </BadgeIndicator>
  ) : null;

  if (!children) {
    return (
      <span className={[styles.standalone, className].filter(Boolean).join(' ')} {...rest}>
        {indicator}
      </span>
    );
  }

  return (
    <span className={[styles.anchor, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {showBadge ? (
        <span className={styles.badge} data-overlap={overlap}>
          {indicator}
        </span>
      ) : null}
      {showStatus ? (
        <span className={styles.status} data-color={statusColor}>
          <span className={styles.statusIcon} aria-hidden>
            {status === true ? (
              <Icon path="System Devices/Check" size={10} weight="regular" />
            ) : (
              status
            )}
          </span>
        </span>
      ) : null}
    </span>
  );
}
