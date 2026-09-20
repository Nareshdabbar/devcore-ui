"use client";

import React from "react";
import clsx from "clsx";
import styles from "./Text.module.scss";

export type SemanticVariant =
  | "title"
  | "sectionTitle"
  | "subsection"
  | "body"
  | "bodySmall"
  | "small"
  | "caption";

export type TextColor =
  | "primary"
  | "text"
  | "text-light"
  | "error"
  | "success"
  | "warning"
  | "info";

export type TextElement = React.ElementType;

export interface TextProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: SemanticVariant;
  color?: TextColor;
  children: React.ReactNode;
  as?: TextElement;
}

const elementMap: Record<
  SemanticVariant,
  keyof React.JSX.IntrinsicElements
> = {
  title: "h1",
  sectionTitle: "h2",
  subsection: "h3",
  body: "p",
  bodySmall: "p",
  small: "span",
  caption: "span",
};

const Text = ({
  variant = "body",
  color,
  className,
  children,
  as,
  ...props
}: TextProps) => {
  const Component = as ?? elementMap[variant];

  return React.createElement(
    Component,
    {
      className: clsx(
        styles.text,
        styles[variant],
        color && styles[`color-${color}`],
        className,
      ),
      ...props,
    },
    children,
  );
};

export default Text;