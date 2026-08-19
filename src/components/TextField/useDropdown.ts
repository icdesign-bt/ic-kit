import { useCallback, useEffect, useRef, useState } from 'react';

export type DropdownPlacement = 'bottom' | 'top';

const MENU_FALLBACK_HEIGHT = 240;

export function useDropdown(disabled?: boolean) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DropdownPlacement>('bottom');
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => {
    if (!disabled) setOpen((v) => !v);
  }, [disabled]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) {
      setPlacement('bottom');
      return;
    }

    const updatePlacement = () => {
      const el = rootRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const menu = el.querySelector<HTMLElement>('[data-name="menu"]');
      const menuHeight = menu?.offsetHeight || MENU_FALLBACK_HEIGHT;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const fitsBelow = spaceBelow >= menuHeight + gap;
      const fitsAbove = spaceAbove >= menuHeight + gap;

      if (!fitsBelow && (fitsAbove || spaceAbove > spaceBelow)) {
        setPlacement('top');
      } else {
        setPlacement('bottom');
      }
    };

    updatePlacement();
    const frame = requestAnimationFrame(updatePlacement);
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [open]);

  return { open, setOpen, toggle, close, rootRef, placement };
}
