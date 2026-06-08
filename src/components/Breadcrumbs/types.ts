import type { ReactNode } from 'react';

export type BreadcrumbItemData = {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
};
