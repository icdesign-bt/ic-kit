import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular';
export type SkeletonAnimation = 'pulse' | 'none';

export type SkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
};

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...rest
}: SkeletonProps) {
  const resolvedStyle: CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height:
      height ??
      (variant === 'text' ? '1em' : variant === 'circular' ? width : undefined),
    ...style,
  };

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-animation={animation}
      style={resolvedStyle}
      aria-hidden={ariaHidden}
      {...rest}
    />
  );
}
