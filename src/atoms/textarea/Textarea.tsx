"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Textarea.module.scss";

export type TextareaGap = "xs" | "sm" | "md" | "lg";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  gap?: TextareaGap;
}

const Textarea = ({
  label,
  id,
  error,
  helperText,
  className,
  wrapperClassName,
  required,
  gap = "xs",
  ...props
}: TextareaProps) => {
  const generatedId = React.useId();
  const textareaId = id ?? `textarea-${generatedId}`;

  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

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
          htmlFor={textareaId}
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

      <textarea
        id={textareaId}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ariaDescribedBy || undefined}
        className={clsx(
          styles.textarea,
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

export default Textarea;