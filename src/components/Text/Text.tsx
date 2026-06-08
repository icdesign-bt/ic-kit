import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  typographyClassFor,
  type TypographyVariant,
} from '../../typography/catalog';

export type TextColor = 'primary' | 'secondary' | 'disabled' | 'inverse' | 'inherit';

export type TextProps<T extends ElementType = 'span'> = {
  as?: T;
  variant?: TypographyVariant;
  color?: TextColor;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'color'>;

const COLOR_CLASS: Record<Exclude<TextColor, 'inherit'>, string> = {
  primary: 'text-color-primary',
  secondary: 'text-color-secondary',
  disabled: 'text-color-disabled',
  inverse: 'text-color-inverse',
};

export function Text<T extends ElementType = 'span'>({
  as,
  variant = 'body-md',
  color = 'primary',
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? 'span') as ElementType;
  const classes = [
    typographyClassFor(variant),
    color !== 'inherit' ? COLOR_CLASS[color] : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
