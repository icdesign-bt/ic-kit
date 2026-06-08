import catalog from '../../tokens/typography-catalog.json';

export type TypographyWeight = 'regular' | 'bold';

export type TypographyStyleSpec = {
  name: string;
  slug: string;
  sizePx: number;
  linePx: number;
  weight: TypographyWeight;
  trackingVar?: string;
  mono?: boolean;
};

export type TypographyGroupSpec = {
  id: string;
  title: string;
  description: string[];
  styles: TypographyStyleSpec[];
};

export type TextColorTokenSpec = {
  token: string;
  cssVar: string;
  description: string;
};

export type SurfaceTokenSpec = {
  token: string;
  cssVar: string;
  description: string;
};

export const TYPOGRAPHY_META = catalog.meta;
export const TYPOGRAPHY_GROUPS = catalog.groups as TypographyGroupSpec[];
export const TYPOGRAPHY_TEXT_COLORS = catalog.textColors as TextColorTokenSpec[];
export const TYPOGRAPHY_SURFACE_TOKENS = catalog.surfaceTokens as SurfaceTokenSpec[];

export const TYPOGRAPHY_SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';

export type TypographyVariant = TypographyStyleSpec['slug'];

const variantSet = new Set(TYPOGRAPHY_GROUPS.flatMap((g) => g.styles.map((s) => s.slug)));

export function isTypographyVariant(value: string): value is TypographyVariant {
  return variantSet.has(value as TypographyVariant);
}

export function pxToRem(px: number): string {
  return `${(px / 16).toFixed(3).replace(/\.?0+$/, '')}rem`;
}

export function typographyClassFor(variant: TypographyVariant): string {
  return `text-${variant}`;
}
