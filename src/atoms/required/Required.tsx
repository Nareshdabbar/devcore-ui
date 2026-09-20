"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Required.module.scss";

export interface RequiredProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const Required = ({
  className,
  ...props
}: RequiredProps) => {
  return (
    <span
      className={clsx(styles.required, className)}
      {...props}
      aria-hidden="true"
    >
      *
    </span>
  );
};

export default Required;