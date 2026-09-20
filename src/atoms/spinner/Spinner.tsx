import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Spinner.module.scss";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

const Spinner = ({
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) => {
  return (
    <span
      className={clsx(
        styles.spinner,
        styles[size],
        className,
      )}
      role="status"
      aria-label={label}
      {...props}
    >
      <span className={styles.circle} aria-hidden="true" />
    </span>
  );
};

export default Spinner;