import { Children, isValidElement, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import type { BreadcrumbItemData } from './types';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> & {
  href?: string;
  onClick?: () => void;
  current?: boolean;
  children?: ReactNode;
};

export function BreadcrumbItem({
  href,
  onClick,
  current = false,
  children,
  className,
  ...rest
}: BreadcrumbItemProps) {
  const content =
    current || (!href && !onClick) ? (
      <span className={styles.current} aria-current={current ? 'page' : undefined}>
        {children}
      </span>
    ) : href ? (
      <a className={styles.link} href={href}>
        {children}
      </a>
    ) : (
      <button type="button" className={styles.link} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <li className={[styles.item, className].filter(Boolean).join(' ')} {...rest}>
      {content}
    </li>
  );
}

export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items?: BreadcrumbItemData[];
  children?: ReactNode;
  separator?: ReactNode;
  'aria-label'?: string;
};

function DefaultSeparator() {
  return (
    <span className={styles.separator} aria-hidden>
      <Icon path="Arrows & Directions/CaretRight" size={12} weight="bold" />
    </span>
  );
}

function renderFromItems(items: BreadcrumbItemData[], separator: ReactNode) {
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    const current = item.current ?? isLast;

    return (
      <li key={index} className={styles.item}>
        {current || (!item.href && !item.onClick) ? (
          <span className={styles.current} aria-current="page">
            {item.label}
          </span>
        ) : item.href ? (
          <a className={styles.link} href={item.href}>
            {item.label}
          </a>
        ) : (
          <button type="button" className={styles.link} onClick={item.onClick}>
            {item.label}
          </button>
        )}
        {!isLast ? separator : null}
      </li>
    );
  });
}

export function Breadcrumbs({
  items,
  children,
  separator = <DefaultSeparator />,
  className,
  'aria-label': ariaLabel = 'Навигационная цепочка',
  ...rest
}: BreadcrumbsProps) {
  const childItems = Children.toArray(children).filter(isValidElement);

  return (
    <nav
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...rest}
    >
      <ol className={styles.list}>
        {items
          ? renderFromItems(items, separator)
          : childItems.map((child, index) => {
              const isLast = index === childItems.length - 1;
              return (
                <li key={child.key ?? index} className={styles.item}>
                  {child}
                  {!isLast ? separator : null}
                </li>
              );
            })}
      </ol>
    </nav>
  );
}
