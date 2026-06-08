import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { SliderType, SliderValue } from './types';
import {
  clamp,
  isRangeValue,
  normalizeRange,
  snapToStep,
  toPercent,
  valueFromPointer,
} from './utils';
import styles from './Slider.module.css';

type ThumbIndex = 0 | 1;

export type SliderProps = {
  type?: SliderType;
  min?: number;
  max?: number;
  step?: number;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  disabled?: boolean;
  /** Подписи значений под ползунками (Figma: hasCounter). */
  showValueLabel?: boolean;
  name?: string;
  id?: string;
  'aria-label'?: string;
  className?: string;
};

function getDefaultValue(type: SliderType, min: number, max: number): SliderValue {
  if (type === 'range') {
    const quarter = min + (max - min) * 0.25;
    const threeQuarter = min + (max - min) * 0.75;
    return [quarter, threeQuarter];
  }
  return min + (max - min) * 0.5;
}

export function Slider({
  type = 'continuous',
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  onChange,
  disabled = false,
  showValueLabel = false,
  name,
  id,
  'aria-label': ariaLabel,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<ThumbIndex | null>(null);

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<SliderValue>(
    () => defaultValue ?? getDefaultValue(type, min, max),
  );
  const rawValue = isControlled ? valueProp : uncontrolledValue;

  const setValue = useCallback(
    (next: SliderValue) => {
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const continuousValue = isRangeValue(rawValue)
    ? clamp(rawValue[0], min, max)
    : clamp(rawValue, min, max);

  const rangeValue: [number, number] = isRangeValue(rawValue)
    ? normalizeRange([
        clamp(rawValue[0], min, max),
        clamp(rawValue[1], min, max),
      ])
    : [continuousValue, continuousValue];

  const updateContinuous = useCallback(
    (next: number) => setValue(snapToStep(next, min, max, step)),
    [max, min, setValue, step],
  );

  const updateRangeThumb = useCallback(
    (index: ThumbIndex, next: number) => {
      const snapped = snapToStep(next, min, max, step);
      const current = rangeValue;
      const nextRange: [number, number] =
        index === 0
          ? [Math.min(snapped, current[1]), current[1]]
          : [current[0], Math.max(snapped, current[0])];
      setValue(normalizeRange(nextRange));
    },
    [max, min, rangeValue, setValue, step],
  );

  const pickRangeThumb = useCallback(
    (pointerValue: number): ThumbIndex => {
      const distStart = Math.abs(pointerValue - rangeValue[0]);
      const distEnd = Math.abs(pointerValue - rangeValue[1]);
      return distStart <= distEnd ? 0 : 1;
    },
    [rangeValue],
  );

  const handleTrackPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return;
    const pointerValue = valueFromPointer(
      event.clientX,
      trackRef.current.getBoundingClientRect(),
      min,
      max,
      step,
    );

    if (type === 'continuous') {
      updateContinuous(pointerValue);
      setActiveThumb(0);
    } else {
      const thumb = activeThumb ?? pickRangeThumb(pointerValue);
      updateRangeThumb(thumb, pointerValue);
      setActiveThumb(thumb);
    }
  };

  const startThumbDrag = (thumb: ThumbIndex) => (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    setActiveThumb(thumb);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleThumbPointerMove = (thumb: ThumbIndex) => (event: PointerEvent<HTMLButtonElement>) => {
    if (disabled || !trackRef.current || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const pointerValue = valueFromPointer(
      event.clientX,
      trackRef.current.getBoundingClientRect(),
      min,
      max,
      step,
    );

    if (type === 'continuous') {
      updateContinuous(pointerValue);
    } else {
      updateRangeThumb(thumb, pointerValue);
    }
  };

  const endThumbDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setActiveThumb(null);
  };

  const handleContinuousKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    let next = continuousValue;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += step;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= step;
    if (event.key === 'Home') next = min;
    if (event.key === 'End') next = max;

    if (next !== continuousValue) {
      event.preventDefault();
      updateContinuous(next);
    }
  };

  const handleRangeKeyDown =
    (thumb: ThumbIndex) => (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      let next = rangeValue[thumb];
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += step;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= step;
      if (event.key === 'Home') next = min;
      if (event.key === 'End') next = max;

      if (next !== rangeValue[thumb]) {
        event.preventDefault();
        updateRangeThumb(thumb, next);
      }
    };

  const fillStyle =
    type === 'continuous'
      ? {
          left: 0,
          width: `${toPercent(continuousValue, min, max)}%`,
        }
      : {
          left: `${toPercent(rangeValue[0], min, max)}%`,
          width: `${toPercent(rangeValue[1], min, max) - toPercent(rangeValue[0], min, max)}%`,
        };

  const thumbs =
    type === 'continuous'
      ? [{ index: 0 as ThumbIndex, value: continuousValue }]
      : [
          { index: 0 as ThumbIndex, value: rangeValue[0] },
          { index: 1 as ThumbIndex, value: rangeValue[1] },
        ];

  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div id={id} className={rootClass} data-disabled={disabled ? 'true' : undefined}>
      <div
        ref={trackRef}
        className={styles.wrapper}
        onPointerDown={handleTrackPointer}
      >
        <div className={styles.track} aria-hidden />
        <div className={styles.fill} style={fillStyle} aria-hidden />
        {thumbs.map(({ index, value }) => (
          <button
            key={index}
            type="button"
            className={styles.thumb}
            style={{ left: `${toPercent(value, min, max)}%` }}
            role="slider"
            aria-label={
              type === 'range'
                ? index === 0
                  ? `${ariaLabel ?? 'Slider'}: минимум`
                  : `${ariaLabel ?? 'Slider'}: максимум`
                : ariaLabel
            }
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled || undefined}
            disabled={disabled}
            data-active={activeThumb === index ? 'true' : undefined}
            onPointerDown={startThumbDrag(index)}
            onPointerMove={handleThumbPointerMove(index)}
            onPointerUp={endThumbDrag}
            onPointerCancel={endThumbDrag}
            onKeyDown={
              type === 'continuous' ? handleContinuousKeyDown : handleRangeKeyDown(index)
            }
          >
            <span className={styles.thumbDot} />
          </button>
        ))}
      </div>

      {showValueLabel
        ? thumbs.map(({ index, value }) => (
            <span
              key={`counter-${index}`}
              className={styles.counter}
              style={{ left: `${toPercent(value, min, max)}%` }}
              aria-hidden
            >
              {value}
            </span>
          ))
        : null}

      {name && type === 'continuous' ? (
        <input type="hidden" name={name} value={continuousValue} />
      ) : null}
      {name && type === 'range' ? (
        <>
          <input type="hidden" name={`${name}-start`} value={rangeValue[0]} />
          <input type="hidden" name={`${name}-end`} value={rangeValue[1]} />
        </>
      ) : null}
    </div>
  );
}
