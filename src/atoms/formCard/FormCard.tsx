import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./FormCard.module.scss";

export type FormCardVariant = "default" | "outlined" | "flat";

export type FormCardPadding = "none" | "sm" | "md" | "lg";

export type FormCardRadius = "none" | "sm" | "md" | "lg";

export interface FormCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: FormCardVariant;
  padding?: FormCardPadding;
  radius?: FormCardRadius;
  hover?: boolean;
}

export default function FormCard({
  children,
  className,
  variant = "default",
  padding = "lg",
  radius = "md",
  hover = false,
  ...props
}: FormCardProps) {
  const classes = clsx(
    styles.componentCard,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    styles[`radius-${radius}`],
    hover && styles.hover,
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}