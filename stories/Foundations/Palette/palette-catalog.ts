export type PaletteToken = {
  label: string;
  cssVar: string;
};

export type PaletteGroup = {
  id: string;
  title: string;
  description?: string;
  tokens: PaletteToken[];
};

function tokens(prefix: string, entries: [string, string][]): PaletteToken[] {
  return entries.map(([label, suffix]) => ({
    label,
    cssVar: `--${prefix}-${suffix}`,
  }));
}

export const BRAND_PALETTE_GROUPS: PaletteGroup[] = [
  {
    id: 'primary',
    title: 'Primary',
    description: 'Основной брендовый цвет (ИЦ — фиолетовый, ЦОДД — зелёный).',
    tokens: tokens('primary', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover', 'tonal-hover'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
  {
    id: 'secondary',
    title: 'Secondary',
    tokens: tokens('secondary', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover 2', 'tonal-hover-2'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
  {
    id: 'neutral',
    title: 'Neutral',
    tokens: tokens('neutral', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover', 'tonal-hover'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
  {
    id: 'success',
    title: 'Success',
    tokens: tokens('success', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover', 'tonal-hover'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
  {
    id: 'error',
    title: 'Error',
    tokens: tokens('error', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover', 'tonal-hover'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
  {
    id: 'warning',
    title: 'Warning',
    tokens: tokens('warning', [
      ['main', 'main'],
      ['main hover', 'main-hover'],
      ['main contrast text', 'main-contrast-text'],
      ['tonal', 'tonal'],
      ['tonal hover', 'tonal-hover'],
      ['tonal contrast text', 'tonal-contrast-text'],
    ]),
  },
];

export const INTERFACE_PALETTE_GROUPS: PaletteGroup[] = [
  {
    id: 'surfaces',
    title: 'Surfaces',
    tokens: tokens('surfaces', [
      ['background', 'background'],
      ['surface 1', 'surface-1'],
      ['surface 2', 'surface-2'],
      ['surface hover', 'surface-hover'],
      ['surface toner', 'surface-toner'],
      ['surface gradient start', 'surface-gradient-start'],
      ['surface gradient finish', 'surface-gradient-finish'],
      ['d-n gradient start', 'd-n-surface-gradient-start'],
      ['d-n gradient finish', 'd-n-surface-gradient-finish'],
      ['surface invisible start', 'surface-invisible-start'],
    ]),
  },
  {
    id: 'text',
    title: 'Text',
    tokens: [
      { label: 'main on surface', cssVar: '--text-main-on-surface' },
      { label: 'secondary on surface', cssVar: '--text-secondary-on-surface' },
      { label: 'disabled on surface', cssVar: '--text-disabled-on-surface' },
      { label: 'main on inverse', cssVar: '--text-main-on-inverse-bg' },
      { label: 'secondary on inverse', cssVar: '--text-secondary-on-inverse-bg' },
      { label: 'disabled on inverse', cssVar: '--text-disabled-on-inverse-bg' },
      { label: 'text primary', cssVar: '--text-text-primary' },
      { label: 'text hover', cssVar: '--text-text-hover' },
    ],
  },
  {
    id: 'action',
    title: 'Action',
    tokens: tokens('action', [
      ['hover', 'hover'],
      ['active', 'active'],
      ['selected', 'selected'],
      ['focus', 'focus'],
      ['disabled', 'disabled'],
      ['disabled background', 'disabled-background'],
    ]),
  },
  {
    id: 'outlines',
    title: 'Outlines & divider',
    tokens: [
      { label: 'border', cssVar: '--outlines-border' },
      { label: 'border hover', cssVar: '--outlines-border-hover' },
      { label: 'focused', cssVar: '--outlines-focused' },
      { label: 'divider', cssVar: '--divider' },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    tokens: [
      { label: 'positive container', cssVar: '--status-positive-container' },
      { label: 'positive on container', cssVar: '--status-positive-on-container' },
      { label: 'positive tonal container', cssVar: '--status-positive-tonal-container' },
      { label: 'positive tonal on container', cssVar: '--status-positive-tonal-on-container' },
      { label: 'negative container', cssVar: '--status-negative-container' },
      { label: 'negative on container', cssVar: '--status-negative-on-container' },
      { label: 'negative tonal container', cssVar: '--status-negative-tonal-container' },
      { label: 'negative tonal on container', cssVar: '--status-negative-tonal-on-container' },
    ],
  },
  {
    id: 'base',
    title: 'Base',
    tokens: [
      { label: 'palette white', cssVar: '--palette-white' },
      { label: 'palette black', cssVar: '--palette-black' },
      { label: 'bright surface', cssVar: '--color-keepers-bright-surface' },
    ],
  },
  {
    id: 'shadows',
    title: 'Shadows',
    tokens: tokens('shadows', [
      ['low orbit', 'low-orbit'],
      ['medium orbit', 'medium-orbit'],
    ]),
  },
  {
    id: 'button-selected',
    title: 'Button selected',
    tokens: tokens('btn-selected', [
      ['contained', 'contained'],
      ['tonal', 'tonal'],
      ['outlined', 'outlined'],
    ]),
  },
];

const CHART_CATEGORY_IDS = [
  { id: 'category-main', title: 'Chart / Main', shadow: true, categorisedDisabled: false },
  { id: 'category-1', title: 'Chart / Category 1', shadow: false, categorisedDisabled: true },
  { id: 'category-2', title: 'Chart / Category 2', shadow: false, categorisedDisabled: true },
  { id: 'category-3', title: 'Chart / Category 3', shadow: false, categorisedDisabled: true },
  { id: 'category-4', title: 'Chart / Category 4', shadow: false, categorisedDisabled: true },
  { id: 'category-5', title: 'Chart / Category 5', shadow: false, categorisedDisabled: true },
  { id: 'category-6', title: 'Chart / Category 6', shadow: false, categorisedDisabled: true },
  { id: 'category-7', title: 'Chart / Category 7', shadow: false, categorisedDisabled: true },
  { id: 'category-8', title: 'Chart / Category 8', shadow: false, categorisedDisabled: true },
  { id: 'category-9', title: 'Chart / Category 9', shadow: false, categorisedDisabled: true },
  { id: 'category-10', title: 'Chart / Category 10', shadow: false, categorisedDisabled: true },
  { id: 'category-neutral', title: 'Chart / Neutral', shadow: true, categorisedDisabled: false },
  { id: 'category-positive', title: 'Chart / Positive', shadow: true, categorisedDisabled: false },
  { id: 'category-negative', title: 'Chart / Negative', shadow: true, categorisedDisabled: false },
  { id: 'category-warning', title: 'Chart / Warning', shadow: true, categorisedDisabled: false },
] as const;

function buildChartGroup(entry: (typeof CHART_CATEGORY_IDS)[number]): PaletteGroup {
  const prefix = `--chart-${entry.id}`;
  const tokensList: PaletteToken[] = [];

  for (let step = 1; step <= 5; step += 1) {
    tokensList.push({
      label: `mono data ${step}`,
      cssVar: `${prefix}-monochromatic-data-${step}`,
    });
  }

  tokensList.push(
    { label: 'active', cssVar: `${prefix}-categorised-active` },
    { label: 'active hover', cssVar: `${prefix}-categorised-active-hover` },
  );

  if (entry.categorisedDisabled) {
    tokensList.push({ label: 'disabled', cssVar: `${prefix}-categorised-disabled` });
  }

  if (entry.shadow) {
    tokensList.push(
      { label: 'shadow 0', cssVar: `${prefix}-monochromatic-shadow-0` },
      { label: 'shadow 30', cssVar: `${prefix}-monochromatic-shadow-30` },
    );
  }

  return {
    id: entry.id,
    title: entry.title,
    tokens: tokensList,
  };
}

export const CHART_PALETTE_GROUPS: PaletteGroup[] = CHART_CATEGORY_IDS.map(buildChartGroup);

export const ALL_PALETTE_GROUPS: PaletteGroup[] = [
  ...BRAND_PALETTE_GROUPS,
  ...INTERFACE_PALETTE_GROUPS,
  ...CHART_PALETTE_GROUPS,
];
