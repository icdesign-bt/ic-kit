import type { SelectionSize } from './types';

const CHECK_SIZE: Record<SelectionSize, { width: number; height: number }> = {
  sm: { width: 8.889, height: 6.667 },
  md: { width: 11.111, height: 8.333 },
  lg: { width: 13.333, height: 10 },
};

/** Figma checkbox tick (node 6208:5135) — plain checkmark, not System Devices/Check icon. */
export function CheckboxCheck({ size }: { size: SelectionSize }) {
  const { width, height } = CHECK_SIZE[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13.3333 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0079 0.325437C13.4418 0.759353 13.4418 1.46287 13.0079 1.89679L5.23012 9.67456C4.7962 10.1085 4.09269 10.1085 3.65877 9.67456L0.325437 6.34123C-0.108479 5.90731 -0.108479 5.2038 0.325437 4.76988C0.759353 4.33597 1.46287 4.33597 1.89679 4.76988L4.44444 7.31754L11.4365 0.325437C11.8705 -0.108479 12.574 -0.108479 13.0079 0.325437Z"
        fill="currentColor"
      />
    </svg>
  );
}
