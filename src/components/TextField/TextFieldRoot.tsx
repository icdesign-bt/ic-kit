import type { ReactNode, Ref } from 'react';
import type { TextFieldShellProps } from './types';
import { useFieldIds } from './useFieldIds';
import { cn } from './utils';
import styles from './TextField.module.css';

export type TextFieldRootProps = TextFieldShellProps & {
  children: ReactNode;
  controlRef?: Ref<HTMLDivElement>;
};

export function TextFieldRoot({
  label,
  labelIcon,
  labelAction,
  helperText,
  error,
  fullWidth,
  className,
  id,
  children,
  controlRef,
}: TextFieldRootProps) {
  const { labelId, helperId } = useFieldIds(id);
  const hasLabel = Boolean(label || labelIcon || labelAction);

  return (
    <div className={cn(styles.root, fullWidth && styles.rootFullWidth, className)}>
      {hasLabel ? (
        <div className={styles.label} id={labelId}>
          <div className={styles.labelStart}>
            {labelIcon ? <span className={styles.iconSlot}>{labelIcon}</span> : null}
            {label ? <span className={styles.labelText}>{label}</span> : null}
          </div>
          {labelAction ? <span className={styles.labelAction}>{labelAction}</span> : null}
        </div>
      ) : null}
      <div ref={controlRef}>{children}</div>
      {helperText ? (
        <p
          id={helperId}
          className={cn(styles.helper, error && styles.helperError)}
          role={error ? 'alert' : undefined}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
