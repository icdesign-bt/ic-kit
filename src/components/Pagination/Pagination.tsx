import type { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import styles from './Pagination.module.css';

function range(start: number, end: number) {
  const result: number[] = [];
  for (let i = start; i <= end; i += 1) result.push(i);
  return result;
}

function getVisiblePages(
  page: number,
  count: number,
  siblingCount: number,
  boundaryCount: number,
): Array<number | 'ellipsis'> {
  const total = Math.max(1, count);
  const pages = new Set<number>();

  range(1, Math.min(boundaryCount, total)).forEach((n) => pages.add(n));
  range(Math.max(total - boundaryCount + 1, 1), total).forEach((n) => pages.add(n));
  range(page - siblingCount, page + siblingCount).forEach((n) => {
    if (n >= 1 && n <= total) pages.add(n);
  });

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | 'ellipsis'> = [];

  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(value);
  });

  return result;
}

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
  /** 1-based current page. */
  page: number;
  count: number;
  onChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  'aria-label'?: string;
};

export function Pagination({
  page,
  count,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
  showFirstButton = false,
  showLastButton = false,
  className,
  'aria-label': ariaLabel = 'Пагинация',
  ...rest
}: PaginationProps) {
  const total = Math.max(1, count);
  const current = Math.min(Math.max(page, 1), total);
  const pages = getVisiblePages(current, total, siblingCount, boundaryCount);

  const go = (next: number) => {
    if (disabled || next < 1 || next > total || next === current) return;
    onChange?.(next);
  };

  return (
    <nav
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...rest}
    >
      {showFirstButton ? (
        <button
          type="button"
          className={styles.nav}
          aria-label="Первая страница"
          disabled={disabled || current <= 1}
          onClick={() => go(1)}
        >
          <Icon path="Arrows & Directions/CaretDoubleLeft" size={16} weight="bold" />
        </button>
      ) : null}

      <button
        type="button"
        className={styles.nav}
        aria-label="Предыдущая страница"
        disabled={disabled || current <= 1}
        onClick={() => go(current - 1)}
      >
        <Icon path="Arrows & Directions/CaretLeft" size={16} weight="bold" />
      </button>

      {pages.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={styles.page}
            data-selected={item === current ? 'true' : undefined}
            aria-label={`Страница ${item}`}
            aria-current={item === current ? 'page' : undefined}
            disabled={disabled}
            onClick={() => go(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.nav}
        aria-label="Следующая страница"
        disabled={disabled || current >= total}
        onClick={() => go(current + 1)}
      >
        <Icon path="Arrows & Directions/CaretRight" size={16} weight="bold" />
      </button>

      {showLastButton ? (
        <button
          type="button"
          className={styles.nav}
          aria-label="Последняя страница"
          disabled={disabled || current >= total}
          onClick={() => go(total)}
        >
          <Icon path="Arrows & Directions/CaretDoubleRight" size={16} weight="bold" />
        </button>
      ) : null}
    </nav>
  );
}
