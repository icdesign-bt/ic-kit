import type { AnchorHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
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
  /** When set, chip renders as a link and is interactive (hover/focus). */
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
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

function buildClassName({
  size,
  shape,
  variant,
  color,
  className,
}: {
  size: ChipSize;
  shape: ChipShape;
  variant: ChipVariant;
  color: ChipColor;
  className?: string;
}) {
  return [
    styles.root,
    SIZE_CLASS[size],
    SHAPE_CLASS[shape],
    VARIANT_CLASS[variant],
    COLOR_CLASS[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');
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
  href,
  target,
  rel,
  className,
  disabled,
  ...rest
}: ChipProps) {
  const content = children ?? label ?? 'Label';
  // Like Material chips: hover only when the chip itself is an action/link.
  const interactive = Boolean(onClick || href);
  const classes = buildClassName({ size, shape, variant, color, className });
  const rootState = {
    className: classes,
    'data-disabled': disabled ? 'true' : undefined,
    'data-interactive': interactive ? 'true' : undefined,
  } as const;

  if (onClose) {
    return (
      <span {...rootState} {...rest}>
        {onClick ? (
          <button type="button" className={styles.body} disabled={disabled} onClick={onClick}>
            <ChipContent startIcon={startIcon} content={content} />
          </button>
        ) : href && !disabled ? (
          <a className={styles.body} href={href} target={target} rel={rel}>
            <ChipContent startIcon={startIcon} content={content} />
          </a>
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

  if (href && !disabled) {
    return (
      <a
        {...rootState}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <ChipContent startIcon={startIcon} content={content} />
      </a>
    );
  }

  if (interactive) {
    return (
      <button
        type="button"
        {...rootState}
        disabled={disabled}
        onClick={onClick}
        {...(rest as HTMLAttributes<HTMLButtonElement>)}
      >
        <ChipContent startIcon={startIcon} content={content} />
      </button>
    );
  }

  return (
    <span {...rootState} {...rest}>
      <ChipContent startIcon={startIcon} content={content} />
    </span>
  );
}
