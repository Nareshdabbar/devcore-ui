import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    />
  );
};

export default Badge;