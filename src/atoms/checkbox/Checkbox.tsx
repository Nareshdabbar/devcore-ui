"use client";

import React from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    name,
    id,
    error,
    helperText,
    className,
    wrapperClassName,
    required,
    ...props
  }, ref) => {
    const checkboxId = id ?? name ?? `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    const ariaDescribedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={`${styles.checkbox} ${className ?? ""}`.trim()}
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
        {error && <div className={styles.error} id={errorId}>{error}</div>}
        {helperText && !error && (
          <div className={styles.helperText} id={helperId}>{helperText}</div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
