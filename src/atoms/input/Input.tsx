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
      error,
      helperText,
      className,
      wrapperClassName,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        {label && (
          <label className={styles.label} htmlFor={name}>
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
          id={name}
          name={name}
          required={required}
          className={clsx(
            styles.input,
            error && styles.invalid,
            className,
          )}
          {...props}
        />

        {error && <div className={styles.error}>{error}</div>}

        {helperText && !error && (
          <div className={styles.helperText}>{helperText}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;