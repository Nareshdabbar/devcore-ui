"use client";

import React from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    const textareaId = id ?? name;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const ariaDescribedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        {label && (
          <label className={styles.label} htmlFor={textareaId}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={`${styles.textarea} ${error ? styles.invalid : ""} ${className ?? ""}`.trim()}
          {...props}
        />
        {error && <div className={styles.error} id={errorId}>{error}</div>}
        {helperText && !error && (
          <div className={styles.helperText} id={helperId}>{helperText}</div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
