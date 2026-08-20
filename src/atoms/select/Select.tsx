"use client";

import React from "react";
import styles from "./Select.module.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  wrapperClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      children,
      className,
      wrapperClassName,
      required,
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? name;

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
          className={`${styles.select} ${error ? styles.invalid : ""} ${className ?? ""}`.trim()}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;