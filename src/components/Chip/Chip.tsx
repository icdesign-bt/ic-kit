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

export type ChipProps = Omit<HTMLAttributes<HTMLElement>, 'color' | 'children'> & {
  size?: ChipSize;
  variant?: ChipVariant;
  color?: ChipColor;
  shape?: ChipShape;
  label?: ReactNode;
  children?: ReactNode;
  /** Start icon. Omitted/`undefined`/`false` — no icon. Pass a ReactNode (e.g. CaretDown) for filter/select chips. */
  startIcon?: ReactNode | false;
  onClose?: () => void;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

function ChipContent({
  startIcon,
  content,
}: {
  startIcon?: ReactNode | false;
  content: ReactNode;
}) {
  const showStartIcon = Boolean(startIcon);

  return (
    <>
      {showStartIcon ? (
        <span className={styles.startIcon} aria-hidden>
          {startIcon}
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
            <ChipContent startIcon={startIcon} content={content} />
          </button>
        ) : (
          <span className={styles.body}>
            <ChipContent startIcon={startIcon} content={content} />
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
        <ChipContent startIcon={startIcon} content={content} />
      </button>
    );
  }

  return (
    <span
      className={classes}
      data-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <ChipContent startIcon={startIcon} content={content} />
    </span>
  );
}
