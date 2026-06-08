import type { SliderValue } from './types';

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function toPercent(value: number, min: number, max: number) {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
}

export function snapToStep(value: number, min: number, max: number, step: number) {
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
}

export function valueFromPointer(
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
  step: number,
) {
  const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
  return snapToStep(min + ratio * (max - min), min, max, step);
}

export function isRangeValue(value: SliderValue): value is [number, number] {
  return Array.isArray(value);
}

export function normalizeRange(value: [number, number]): [number, number] {
  return value[0] <= value[1] ? value : [value[1], value[0]];
}
