import { useMemo, useState } from 'react';
import { Icon } from '../Icon';
import {
  formatMonthYear,
  getMonthGrid,
  isSameDay,
  WEEKDAYS_RU,
  type CalendarCell,
} from './date-utils';
import styles from './TextField.module.css';

export type DatePickerCalendarProps = {
  value?: Date | null;
  onSelect: (date: Date) => void;
};

export function DatePickerCalendar({ value, onSelect }: DatePickerCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => value ?? today);

  const cells = useMemo(
    () => getMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate],
  );

  const goMonth = (delta: number) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  return (
    <div className={styles.calendar} role="dialog" aria-label="Выбор даты">
      <div className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.calendarNav}
          aria-label="Предыдущий месяц"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => goMonth(-1)}
        >
          <Icon path="Arrows & Directions/CaretLeft" size={16} weight="bold" />
        </button>
        <span className={styles.calendarTitle}>{formatMonthYear(viewDate)}</span>
        <button
          type="button"
          className={styles.calendarNav}
          aria-label="Следующий месяц"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => goMonth(1)}
        >
          <Icon path="Arrows & Directions/CaretRight" size={16} weight="bold" />
        </button>
      </div>

      <div className={styles.calendarWeekdays}>
        {WEEKDAYS_RU.map((label, index) => (
          <span
            key={label}
            className={styles.calendarWeekday}
            data-weekend={index >= 5 ? 'true' : undefined}
          >
            {label}
          </span>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {cells.map((cell: CalendarCell) => {
          if (cell.type === 'empty') {
            return <span key={cell.key} className={styles.calendarDayEmpty} aria-hidden />;
          }

          const selected = value ? isSameDay(cell.date, value) : false;
          const isToday = isSameDay(cell.date, today);

          return (
            <button
              key={cell.key}
              type="button"
              className={styles.calendarDay}
              data-selected={selected ? 'true' : undefined}
              data-today={isToday && !selected ? 'true' : undefined}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect(cell.date)}
            >
              <span>{cell.day}</span>
              {isToday && !selected ? <span className={styles.calendarTodayDot} aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
