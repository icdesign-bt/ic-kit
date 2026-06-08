export const ICON_WEIGHTS = ['regular', 'bold', 'fill'] as const;

export type IconWeight = (typeof ICON_WEIGHTS)[number];

export type IconPath = string;
