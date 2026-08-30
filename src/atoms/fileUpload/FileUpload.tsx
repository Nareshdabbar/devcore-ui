"use client";

import React from "react";
import styles from "./FileUpload.module.scss";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  maxSize?: number; // in MB
  wrapperClassName?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    label,
    name,
    id,
    error,
    helperText,
    accept = "image/*,.pdf",
    maxSize = 5,
    className,
    wrapperClassName,
    required,
    onChange,
    ...props
  }, ref) => {
    const fileId = id ?? name;
    const errorId = `${fileId}-error`;
    const helperId = `${fileId}-helper`;

    const ariaDescribedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && maxSize) {
        const maxBytes = maxSize * 1024 * 1024;
        if (file.size > maxBytes) {
          alert(`File size must be less than ${maxSize}MB`);
          e.target.value = "";
          return;
        }
      }
      onChange?.(e);
    };

    return (
      <div className={`${styles.wrapper} ${wrapperClassName ?? ""}`.trim()}>
        {label && (
          <label className={styles.label} htmlFor={fileId}>
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
          type="file"
          id={fileId}
          name={name}
          accept={accept}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={`${styles.input} ${error ? styles.invalid : ""} ${className ?? ""}`.trim()}
          {...props}
          onChange={handleChange}
        />
        {error && <div className={styles.error} id={errorId}>{error}</div>}
        {helperText && !error && (
          <div className={styles.helperText} id={helperId}>{helperText}</div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
