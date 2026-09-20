import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Radio.module.scss";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

const Radio = ({
  label,
  className,
  disabled,
  ...props
}: RadioProps) => {
  return (
    <label
      className={clsx(
        styles.radio,
        disabled && styles.disabled,
        className,
      )}
    >
      <input
        type="radio"
        className={styles.input}
        disabled={disabled}
        {...props}
      />

      <span className={styles.control} aria-hidden="true" />

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Radio;