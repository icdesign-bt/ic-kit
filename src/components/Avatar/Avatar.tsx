import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import type { AvatarColor, AvatarSize, AvatarVariant } from './types';
import styles from './Avatar.module.css';

function formatInitials(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export type AvatarProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'color'> & {
  size?: AvatarSize;
  variant?: AvatarVariant;
  color?: AvatarColor;
  /** Photo URL — when set, renders image avatar (object-fit: cover). */
  src?: string;
  alt?: string;
  /** Initials for text avatar; falls back to icon when omitted. */
  initials?: string;
  icon?: ReactNode | false;
};

export function Avatar({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  src,
  alt = '',
  initials,
  icon,
  className,
  onClick,
  ...rest
}: AvatarProps) {
  const isPhoto = Boolean(src);
  const text = initials ? formatInitials(initials) : '';
  const isText = Boolean(text) && !isPhoto;
  const avatarType = isPhoto ? 'photo' : isText ? 'text' : 'icon';
  const isInteractive = Boolean(onClick);
  const iconSize = size === 'sm' ? 12 : 16;

  const classes = [
    styles.root,
    isInteractive ? styles.interactive : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = isPhoto ? (
    <>
      <img className={styles.photo} src={src} alt={alt} />
      <span className={styles.photoOverlay} aria-hidden />
    </>
  ) : isText ? (
    <span className={styles.initials} aria-hidden={Boolean(alt)}>
      {text}
    </span>
  ) : (
    <span className={styles.icon} aria-hidden>
      {icon === false ? null : icon ?? <Icon path="People/User" size={iconSize} weight="fill" />}
    </span>
  );

  const sharedProps = {
    className: classes,
    'data-size': size,
    'data-variant': isPhoto ? undefined : variant,
    'data-color': isPhoto ? undefined : color,
    'data-type': avatarType,
    onClick,
  };

  if (isInteractive) {
    return (
      <button
        type="button"
        {...sharedProps}
        aria-label={alt || (isText ? text : 'Аватар')}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      role="img"
      aria-label={alt || (isText ? text : undefined)}
      {...sharedProps}
      {...rest}
    >
      {content}
    </span>
  );
}
