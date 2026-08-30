"use client";

import React from "react";

import styles from "./Select.module.scss";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  wrapperClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      children,
      className,
      wrapperClassName,
      required,
      name,
      id,
      onChange,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? name;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const ariaDescribedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        {label && (
          <label className={styles.label} htmlFor={selectId}>
            {label}

            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={`${styles.select} ${
            error ? styles.invalid : ""
          } ${className ?? ""}`.trim()}
          {...props}
          onChange={(event) => {
            onChange?.(event);
            event.currentTarget.blur();
          }}
        >
          {options
            ? options.map((option, index) => (
                <option
                  key={`${option.value}-${index}`}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>

        {error && <div className={styles.error} id={errorId}>{error}</div>}

        {helperText && !error && (
          <div className={styles.helperText} id={helperId}>{helperText}</div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
