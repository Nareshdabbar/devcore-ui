"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export type InputGap = "xs" | "sm" | "md" | "lg";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  gap?: InputGap;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  passwordShowIcon?: React.ReactNode;
  passwordHideIcon?: React.ReactNode;
  passwordShowLabel?: string;
  passwordHideLabel?: string;
}

const DefaultShowPasswordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const DefaultHidePasswordIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m3 3 18 18" />
    <path d="M10.6 5.2A10.8 10.8 0 0 1 12 5c6 0 9.5 7 9.5 7a17.8 17.8 0 0 1-3 3.9" />
    <path d="M6.7 6.7C4 8.5 2.5 12 2.5 12s3.5 7 9.5 7c1.5 0 2.8-.4 4-1" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);

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
  type = "text",
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  passwordShowIcon,
  passwordHideIcon,
  passwordShowLabel = "Show password",
  passwordHideLabel = "Hide password",
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? `input-${generatedId}`;

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const isPasswordInput = type === "password";
  const passwordToggleEnabled = showPasswordToggle && isPasswordInput;

  const inputType = passwordToggleEnabled && passwordVisible ? "text" : type;

  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const ariaDescribedBy = [error && errorId, helperText && !error && helperId]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={clsx(styles.wrapper, styles[`gap-${gap}`], wrapperClassName)}
    >
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

      <div
        className={clsx(
          styles.inputWrapper,
          error && styles.invalidWrapper,
          disabled && styles.disabledWrapper,
          readOnly && styles.readOnlyWrapper,
        )}
      >
        {leftIcon && (
          <span className={styles.leftIcon} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={inputType}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy || undefined}
          className={clsx(
            styles.input,
            error && styles.invalid,
            leftIcon && styles.hasLeftIcon,
            (rightIcon || passwordToggleEnabled) && styles.hasRightIcon,
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <span className={styles.rightIcon} aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {passwordToggleEnabled && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setPasswordVisible((visible) => !visible)}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-label={passwordVisible ? passwordHideLabel : passwordShowLabel}
          >
            {passwordVisible
              ? (passwordHideIcon ?? <DefaultHidePasswordIcon />)
              : (passwordShowIcon ?? <DefaultShowPasswordIcon />)}
          </button>
        )}
      </div>

      {error && (
        <div className={styles.error} id={errorId} role="alert">
          {error}
        </div>
      )}

      {helperText && !error && (
        <div className={styles.helperText} id={helperId}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;
