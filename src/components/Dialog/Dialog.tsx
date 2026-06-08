import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import { IconButton } from '../Button/IconButton';
import { Icon } from '../Icon';
import type { DialogWidth } from './types';
import styles from './Dialog.module.css';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  open: boolean;
  onClose?: () => void;
  width?: DialogWidth;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Default header icon; pass `false` to hide. */
  icon?: ReactNode | false;
  children?: ReactNode;
  textButtonLabel?: ReactNode;
  onTextButton?: () => void;
  secondaryButtonLabel?: ReactNode;
  onSecondaryButton?: () => void;
  mainButtonLabel?: ReactNode;
  onMainButton?: () => void;
  mainButtonStartIcon?: ReactNode;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
};

export function Dialog({
  open,
  onClose,
  width = 'sm',
  title,
  subtitle,
  icon,
  children,
  textButtonLabel,
  onTextButton,
  secondaryButtonLabel,
  onSecondaryButton,
  mainButtonLabel,
  onMainButton,
  mainButtonStartIcon,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className,
  ...rest
}: DialogProps) {
  const titleId = useId();
  const subtitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const showHeader = Boolean(title || subtitle || icon !== false || onClose);
  const showIcon = icon !== false;
  const resolvedIcon =
    icon === undefined ? (
      <Icon path="Arrows & Directions/CaretCircleRight" size={24} weight="regular" />
    ) : (
      icon
    );
  const showFooter = Boolean(textButtonLabel || secondaryButtonLabel || mainButtonLabel);
  const resolvedMainStartIcon =
    mainButtonStartIcon ?? (
      <Icon path="Arrows & Directions/CaretRight" size={18} weight="bold" />
    );

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusables[0] ?? panel).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => panel.removeEventListener('keydown', onKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const describedBy = subtitle ? subtitleId : undefined;

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (!closeOnOverlayClick || !onClose) return;
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={[styles.panel, className].filter(Boolean).join(' ')}
        data-width={width}
        {...rest}
      >
        {showHeader ? (
          <header className={styles.header}>
            <div className={styles.headerMain}>
              {showIcon && resolvedIcon ? (
                <span className={styles.headerIcon} aria-hidden>
                  {resolvedIcon}
                </span>
              ) : null}
              {(title || subtitle) && (
                <div className={styles.headerText}>
                  {title ? (
                    <h2 id={titleId} className={styles.title}>
                      {title}
                    </h2>
                  ) : null}
                  {subtitle ? (
                    <p id={subtitleId} className={styles.subtitle}>
                      {subtitle}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
            {onClose ? (
              <IconButton
                variant="text"
                color="neutral"
                size="xlg"
                aria-label="Закрыть"
                icon={<Icon path="Math & Finances/X" size={20} weight="bold" />}
                onClick={onClose}
              />
            ) : null}
          </header>
        ) : null}

        {children ? <div className={styles.body}>{children}</div> : null}

        {showFooter ? (
          <footer className={styles.footer}>
            {textButtonLabel ? (
              <Button variant="text" color="primary" size="lg" onClick={onTextButton}>
                {textButtonLabel}
              </Button>
            ) : null}
            {secondaryButtonLabel ? (
              <Button variant="outlined" color="primary" size="lg" onClick={onSecondaryButton}>
                {secondaryButtonLabel}
              </Button>
            ) : null}
            {mainButtonLabel ? (
              <Button
                variant="contained"
                color="primary"
                size="lg"
                startIcon={resolvedMainStartIcon}
                onClick={onMainButton}
              >
                {mainButtonLabel}
              </Button>
            ) : null}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
