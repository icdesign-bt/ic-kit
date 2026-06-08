import styles from './Button.module.css';

export function ButtonProcessingDots() {
  return (
    <span className={styles.processingDots} aria-hidden>
      <span className={styles.processingDot} />
      <span className={styles.processingDot} />
      <span className={styles.processingDot} />
    </span>
  );
}
