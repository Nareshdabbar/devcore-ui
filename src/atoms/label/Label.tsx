"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Label.module.scss";

export type LabelProps =
React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({
className,
...props
}: LabelProps) => {
return (
<label
className={clsx(styles.label, className)}
{...props}
/>
);
};

export default Label;
