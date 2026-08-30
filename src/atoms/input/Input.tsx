"use client";

import React from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      id,
      error,
      helperText,
      className,
      wrapperClassName,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? name;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const ariaDescribedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={clsx(
            styles.input,
            error && styles.invalid,
            className,
          )}
          {...props}
        />

        {error && <div className={styles.error} id={errorId}>{error}</div>}

        {helperText && !error && (
          <div className={styles.helperText} id={helperId}>{helperText}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;