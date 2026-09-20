"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export type InputGap = "xs" | "sm" | "md" | "lg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  gap?: InputGap;
}

const Input = ({
  label,
  id,
  error,
  helperText,
  className,
  wrapperClassName,
  gap = "xs",
  required,
  disabled,
  readOnly,
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? `input-${generatedId}`;

  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

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
        <label className={styles.label} htmlFor={inputId}>
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

      <input
        id={inputId}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ariaDescribedBy || undefined}
        className={clsx(
          styles.input,
          error && styles.invalid,
          className,
        )}
        {...props}
      />

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

export default Input;