"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.scss";

export type CheckboxDirection = "row" | "column";
export type CheckboxGap = "xs" | "sm" | "md";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  direction?: CheckboxDirection;
  gap?: CheckboxGap;
}

const Checkbox = ({
  label,
  id,
  error,
  helperText,
  className,
  wrapperClassName,
  required,
  direction = "row",
  gap = "sm",
  ...props
}: CheckboxProps) => {
  const generatedId = React.useId();
  const checkboxId = id ?? `checkbox-${generatedId}`;

  const errorId = `${checkboxId}-error`;
  const helperId = `${checkboxId}-helper`;

  const ariaDescribedBy = [error && errorId, helperText && !error && helperId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <div
        className={clsx(
          styles.control,
          direction === "column" && styles.column,
          gap === "xs" && styles.gapXs,
          gap === "md" && styles.gapMd,
        )}
      >
        <input
          type="checkbox"
          id={checkboxId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy || undefined}
          className={clsx(styles.checkbox, className)}
          {...props}
        />

        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}

            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
      </div>

      {error && (
        <div className={styles.error} id={errorId} role="alert">
          {error}
        </div>
      )}

      {helperText && !error && (
        <div className={styles.helperText} id={helperId}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
