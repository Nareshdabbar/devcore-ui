"use client";

import React from "react";
import clsx from "clsx";
import styles from "./FileUpload.module.scss";

export interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  maxSize?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onValidationError?: (message: string) => void;
  wrapperClassName?: string;
}

const FileUpload = ({
  label,
  id,
  error,
  helperText,
  maxSize,
  className,
  wrapperClassName,
  required,
  onChange,
  onValidationError,
  ...props
}: FileUploadProps) => {
  const generatedId = React.useId();
  const fileId = id ?? `file-upload-${generatedId}`;

  const errorId = `${fileId}-error`;
  const helperId = `${fileId}-helper`;

  const ariaDescribedBy = [
    error && errorId,
    helperText && !error && helperId,
  ]
    .filter(Boolean)
    .join(" ");

  const validateFiles = (
    files: FileList | null,
  ): string | undefined => {
    if (!files || maxSize === undefined) {
      return undefined;
    }

    const maxBytes = maxSize * 1024 * 1024;

    for (const file of Array.from(files)) {
      if (file.size > maxBytes) {
        return `${file.name} exceeds the maximum file size of ${maxSize} MB.`;
      }
    }

    return undefined;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const validationError = validateFiles(event.target.files);

    if (validationError) {
      event.target.value = "";
      onValidationError?.(validationError);
      return;
    }

    onChange?.(event);
  };

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      {label && (
        <label className={styles.label} htmlFor={fileId}>
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
        type="file"
        id={fileId}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={ariaDescribedBy || undefined}
        className={clsx(
          styles.input,
          error && styles.invalid,
          className,
        )}
        {...props}
        onChange={handleChange}
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

export default FileUpload;