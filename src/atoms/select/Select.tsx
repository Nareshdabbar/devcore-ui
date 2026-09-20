"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectGap = "xs" | "sm" | "md" | "lg";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  wrapperClassName?: string;
  gap?: SelectGap;
}

const Select = ({
  label,
  error,
  helperText,
  options,
  children,
  className,
  wrapperClassName,
  required,
  id,
  gap = "xs",
  ...props
}: SelectProps) => {
  const generatedId = React.useId();
  const selectId = id ?? `select-${generatedId}`;

  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const ariaDescribedBy = [
    error && errorId,
    helperText && !error && helperId,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={clsx(
        styles.wrapper,
        styles[`gap-${gap}`],
        wrapperClassName,
      )}
    >
      {label && (
        <label
          className={styles.label}
          htmlFor={selectId}
        >
          {label}

          {required && (
            <span
              className={styles.required}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      <select
        id={selectId}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ariaDescribedBy || undefined}
        className={clsx(
          styles.select,
          error && styles.invalid,
          className,
        )}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))
          : children}
      </select>

      {error && (
        <div
          className={styles.error}
          id={errorId}
          role="alert"
        >
          {error}
        </div>
      )}

      {helperText && !error && (
        <div
          className={styles.helperText}
          id={helperId}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Select;