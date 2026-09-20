import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./EmptyState.module.scss";

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

const EmptyState = ({
  heading,
  description,
  icon,
  action,
  children,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={clsx(styles.emptyState, className)}
      {...props}
    >
      {icon && (
        <div className={styles.icon} aria-hidden="true">
          {icon}
        </div>
      )}

      {heading && <h2 className={styles.title}>{heading}</h2>}

      {description && (
        <div className={styles.description}>{description}</div>
      )}

      {action && <div className={styles.action}>{action}</div>}

      {children}
    </div>
  );
};

export default EmptyState;