import {
  Children,
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { createPortal } from 'react-dom';
import type { TooltipPointerAlignment, TooltipPointerPosition } from './types';
import styles from './Tooltip.module.css';

type Coords = { top: number; left: number };

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    });
  };
}

function getCoords(
  trigger: DOMRect,
  bubble: DOMRect,
  position: TooltipPointerPosition,
  alignment: TooltipPointerAlignment,
  offset: number,
): Coords {
  const gap = offset;

  if (position === 'top') {
    const top = trigger.top - bubble.height - gap;
    if (alignment === 'start') return { top, left: trigger.left };
    if (alignment === 'end') return { top, left: trigger.right - bubble.width };
    return { top, left: trigger.left + trigger.width / 2 - bubble.width / 2 };
  }

  if (position === 'bottom') {
    const top = trigger.bottom + gap;
    if (alignment === 'start') return { top, left: trigger.left };
    if (alignment === 'end') return { top, left: trigger.right - bubble.width };
    return { top, left: trigger.left + trigger.width / 2 - bubble.width / 2 };
  }

  if (position === 'left') {
    const left = trigger.left - bubble.width - gap;
    if (alignment === 'start') return { top: trigger.top, left };
    if (alignment === 'end') return { top: trigger.bottom - bubble.height, left };
    return { top: trigger.top + trigger.height / 2 - bubble.height / 2, left };
  }

  const left = trigger.right + gap;
  if (alignment === 'start') return { top: trigger.top, left };
  if (alignment === 'end') return { top: trigger.bottom - bubble.height, left };
  return { top: trigger.top + trigger.height / 2 - bubble.height / 2, left };
}

export type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'content'> & {
  /** Tooltip body — string or custom block. */
  content: ReactNode;
  children: ReactElement;
  position?: TooltipPointerPosition;
  alignment?: TooltipPointerAlignment;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Delay before show on hover/focus, ms. */
  showDelay?: number;
  /** Delay before hide, ms. */
  hideDelay?: number;
  disabled?: boolean;
};

export function Tooltip({
  content,
  children,
  position = 'top',
  alignment = 'middle',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  showDelay = 200,
  hideDelay = 0,
  disabled = false,
  className,
  ...rest
}: TooltipProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [coords, setCoords] = useState<Coords | null>(null);

  const isControlled = openProp !== undefined;
  const open = !disabled && (isControlled ? openProp : uncontrolledOpen);

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const clearTimers = () => {
    clearTimeout(showTimerRef.current);
    clearTimeout(hideTimerRef.current);
  };

  const scheduleShow = () => {
    clearTimers();
    showTimerRef.current = setTimeout(() => setOpen(true), showDelay);
  };

  const scheduleHide = () => {
    clearTimers();
    hideTimerRef.current = setTimeout(() => setOpen(false), hideDelay);
  };

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }

    const trigger = triggerRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble) return;

    const update = () => {
      const next = getCoords(
        trigger.getBoundingClientRect(),
        bubble.getBoundingClientRect(),
        position,
        alignment,
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--tooltip-offset'),
        ) || 8,
      );
      setCoords(next);
    };

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, position, alignment, content]);

  useEffect(() => () => clearTimers(), []);

  type TriggerProps = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> };
  const child = Children.only(children) as ReactElement<TriggerProps>;
  const childRef = (child as ReactElement & { ref?: Ref<HTMLElement> }).ref;

  const trigger = cloneElement<TriggerProps>(child, {
    ref: mergeRefs(childRef, triggerRef),
    'aria-describedby': open ? tooltipId : undefined,
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      child.props.onMouseEnter?.(event);
      if (!event.defaultPrevented) scheduleShow();
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      child.props.onMouseLeave?.(event);
      if (!event.defaultPrevented) scheduleHide();
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      child.props.onFocus?.(event);
      if (!event.defaultPrevented) scheduleShow();
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      child.props.onBlur?.(event);
      if (!event.defaultPrevented) scheduleHide();
    },
  });

  const bubble =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={bubbleRef}
            id={tooltipId}
            role="tooltip"
            className={styles.bubble}
            data-position={position}
            data-alignment={alignment}
            style={
              coords
                ? { top: coords.top, left: coords.left, visibility: 'visible' }
                : { top: -9999, left: -9999, visibility: 'hidden' }
            }
          >
            <span className={styles.pointer} aria-hidden />
            {typeof content === 'string' ? <p className={styles.text}>{content}</p> : content}
          </div>,
          document.body,
        )
      : null;

  return (
    <span className={[styles.trigger, className].filter(Boolean).join(' ')} {...rest}>
      {trigger}
      {bubble}
    </span>
  );
}
