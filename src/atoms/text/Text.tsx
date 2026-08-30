"use client";

import React, { JSX } from "react";
import styles from "./Text.module.scss";

type SemanticVariant = 
  | "title"           // Page title - h1, 32px, bold
  | "sectionTitle"    // Section header - h2, 24px, semibold
  | "subsection"      // Subsection - h3, 20px, semibold
  | "body"            // Main text - p, 16px, normal
  | "bodySmall"       // Secondary text - p, 14px, normal
  | "small"           // Tertiary text - span, 12px, normal
  | "caption";        // Helper text - span, 12px, light

type TextColor =
  | "primary"
  | "text"
  | "text-light"
  | "error"
  | "success"
  | "warning"
  | "info";

interface TextProps {
  variant?: SemanticVariant;
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "body",
      color,
      className = "",
      children,
      as,
      ...props
    },
    ref
  ) => {
    // Map semantic variants to HTML elements
    const elementMap: Record<SemanticVariant, keyof JSX.IntrinsicElements> = {
      title: "h1",
      sectionTitle: "h2",
      subsection: "h3",
      body: "p",
      bodySmall: "p",
      small: "span",
      caption: "span",
    };

    const Component = as || elementMap[variant];

    const classNames = [
      styles.text,
      styles[variant],
      color && styles[`color-${color}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return React.createElement(
      Component,
      { ref, className: classNames, ...props },
      children
    );
  }
);

Text.displayName = "Text";

export default Text;
