import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { Icon } from '../Icon';
import type { ChipColor, ChipShape, ChipSize, ChipVariant } from './types';
import styles from './Chip.module.css';

const SIZE_CLASS: Record<ChipSize, string> = {
  xsm: styles.sizeXsm,
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

const SHAPE_CLASS: Record<ChipShape, string> = {
  rounded: styles.shapeRounded,
  square: styles.shapeSquare,
};

const VARIANT_CLASS: Record<ChipVariant, string> = {
  contained: styles.variantContained,
  outlined: styles.variantOutlined,
  text: styles.variantText,
  tonal: styles.variantTonal,
};

const COLOR_CLASS: Record<ChipColor, string> = {
  primary: styles.colorPrimary,
  neutral: styles.colorNeutral,
  success: styles.colorSuccess,
  error: styles.colorError,
};

const START_ICON_SIZE: Record<ChipSize, number> = {
  xsm: 12,
  sm: 16,
  md: 20,
};

export type ChipProps = Omit<HTMLAttributes<HTMLElement>, 'color' | 'children'> & {
  size?: ChipSize;
  variant?: ChipVariant;
  color?: ChipColor;
  shape?: ChipShape;
  label?: ReactNode;
  children?: ReactNode;
  startIcon?: ReactNode | false;
  onClose?: () => void;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

function ChipContent({
  size,
  startIcon,
  content,
}: {
  size: ChipSize;
  startIcon?: ReactNode | false;
  content: ReactNode;
}) {
  const showStartIcon = startIcon !== false;
  const startIconSize = START_ICON_SIZE[size];

  return (
    <>
      {showStartIcon ? (
        <span className={styles.startIcon} aria-hidden>
          {startIcon ?? <Icon path="Arrows & Directions/CaretDown" size={startIconSize} weight="fill" />}
        </span>
      ) : null}
      <span className={styles.label}>{content}</span>
    </>
  );
}

export function Chip({
  size = 'md',
  variant = 'tonal',
  color = 'primary',
  shape = 'rounded',
  label,
  children,
  startIcon,
  onClose,
  onClick,
  className,
  disabled,
  ...rest
}: ChipProps) {
  const content = children ?? label ?? 'Label';

  const classes = [
    styles.root,
    SIZE_CLASS[size],
    SHAPE_CLASS[shape],
    VARIANT_CLASS[variant],
    COLOR_CLASS[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClose) {
    return (
      <span
        className={classes}
        data-disabled={disabled ? 'true' : undefined}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            className={styles.body}
            disabled={disabled}
            onClick={onClick}
          >
            <ChipContent size={size} startIcon={startIcon} content={content} />
          </button>
        ) : (
          <span className={styles.body}>
            <ChipContent size={size} startIcon={startIcon} content={content} />
          </span>
        )}
        <button
          type="button"
          className={styles.close}
          disabled={disabled}
          aria-label="Удалить"
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) onClose();
          }}
        >
          <Icon path="Math & Finances/X" size={12} weight="bold" />
        </button>
      </span>
    );
  }

  const interactive = Boolean(onClick);

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        disabled={disabled}
        data-disabled={disabled ? 'true' : undefined}
        onClick={onClick}
        {...(rest as HTMLAttributes<HTMLButtonElement>)}
      >
        <ChipContent size={size} startIcon={startIcon} content={content} />
      </button>
    );
  }

  return (
    <span
      className={classes}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <ChipContent size={size} startIcon={startIcon} content={content} />
    </span>
  );
}
