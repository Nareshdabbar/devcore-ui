"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Divider.module.scss";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerColor =
| "border"
| "borderStrong"
| "primary"
| "secondary"
| "success"
| "warning"
| "error"
| "info";

export interface DividerProps
extends React.HTMLAttributes<HTMLDivElement> {
orientation?: DividerOrientation;
color?: DividerColor;
thickness?: string;
length?: string;
}

const colorVariables: Record<DividerColor, string> = {
border: "var(--colors-border)",
borderStrong: "var(--colors-borderStrong)",
primary: "var(--colors-primary)",
secondary: "var(--colors-secondary)",
success: "var(--colors-success)",
warning: "var(--colors-warning)",
error: "var(--colors-error)",
info: "var(--colors-info)",
};

const Divider = ({
orientation = "horizontal",
className,
color = "border",
thickness,
length,
style,
...props
}: DividerProps) => {
const dividerStyle: React.CSSProperties = {
backgroundColor: colorVariables[color],
...(orientation === "horizontal"
? {
...(length ? { width: length } : {}),
...(thickness ? { height: thickness } : {}),
}
: {
...(thickness ? { width: thickness } : {}),
...(length ? { height: length } : {}),
}),
...style,
};

return (
<div
role="separator"
aria-orientation={
orientation === "vertical" ? "vertical" : undefined
}
className={clsx(
styles.divider,
styles[orientation],
className,
)}
style={dividerStyle}
{...props}
/>
);
};

export default Divider;
