# DevCore UI Components

Reusable React UI components with built-in theming support using CSS Variables.

## Features

- **Atomic Design Components** - Fully-featured UI atoms
- **Light & Dark Theme Support** - Complete theme system with SCSS/CSS variables
- **CSS Variables (SSR Friendly)** - No JavaScript runtime for theming
- **Works with Next.js and React** - Framework agnostic
- **Easy Customization** - Override theme variables at the project level
- **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install @dev-core-ui/components


import type { Metadata } from "next";
import "@dev-core-ui/components/styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import "@dev-core-ui/components/styles";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

import { Button, Input, Text } from "@dev-core-ui/components";

export default function App() {
  return (
    <div>
      <Text variant="h1">Welcome to DevCore UI</Text>
      <Input label="Email" name="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}

Available Components  
Button  
Primary, secondary, ghost, and danger variants with loading and disabled states.  

Props

variant: primary | secondary | ghost | danger

size: sm | md | lg

isLoading: boolean

disabled: boolean

className: string

style: CSSProperties

<Button variant="primary" className="my-button" style={{ minWidth: 120 }}>
  Submit
</Button>

Input
Text input with label, error state, helper text, and native input support.

Props

name: string (required)

label: string

error: string

helperText: string

className: string — applies to the input element

wrapperClassName: string — applies to the component wrapper

style: CSSProperties
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="Enter email"
  className="my-input"
  style={{ minHeight: 50 }}
/>

Select
Dropdown select component with optional options list or custom children.

Props

label: string

error: string

options: { value: string; label: string }[]

className: string

wrapperClassName: string

style: CSSProperties
<Select label="Choose" name="option" className="my-select">
  <option value="">Select one</option>
  <option value="1">Option 1</option>
</Select>

Checkbox
Checkbox with label and native props.

Props

label: string

className: string

wrapperClassName: string

style: CSSProperties
<Checkbox label="I agree" name="agree" className="my-checkbox" />

Textarea
Multi-line text input with optional rows.

Props

label: string

error: string

helperText: string

className: string

wrapperClassName: string

style: CSSProperties

<Textarea label="Message" name="message" rows={4} className="my-textarea" />

Label
Label component with optional required indicator.

Props

required: boolean

className: string

style: CSSProperties

<Label htmlFor="email" required className="my-label">
  Email
</Label>

Text
Semantic text component with headings, paragraphs, labels, captions, and code.

Props

variant: h1 | h2 | h3 | h4 | h5 | h6 | p | label | small | caption | code

size: xs | sm | md | lg | xl | 2xl | 3xl | 4xl

weight: light | normal | medium | semibold | bold

color: primary | text | text-light | error | success | warning

className: string

style: CSSProperties
<Text variant="h1">Heading</Text>
<Text variant="p" className="my-paragraph">
  Paragraph text
</Text>

FileUpload
File input component with size validation.

Props

label: string

error: string

accept: string

maxSize: number (MB)

className: string

wrapperClassName: string

style: CSSProperties
<FileUpload label="Upload File" name="file" accept=".pdf,.doc" className="my-file-upload" />


FormCard
Container card for form layout sections.

Props

className: string

style: CSSProperties

<FormCard className="my-card" style={{ padding: 24 }}>
  <Input label="Name" name="name" />
  <Button variant="primary">Submit</Button>
</FormCard>

Required
Render a required field marker with customizable color.

Props

color: string

className: string

style: CSSProperties

<Required color="#d9534f" />

Divider
Horizontal or vertical line with flexible size, color, and className.

Props

orientation: horizontal | vertical

thickness: string

length: string

color: string

className: string

style: CSSProperties

<Divider />
<Divider orientation="vertical" length="100px" />
<Divider thickness="2px" color="#d1d5db" className="my-divider" />

Theming
All components use CSS variables from the theme. Override variables in your global stylesheet loaded after @dev-core-ui/components/styles:

CSS
:root {
  --colors-primary: #007bff;
  --colors-secondary: #6c757d;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
Available Theme Variables
Colors:

--colors-background

--colors-surface

--colors-overlay

--colors-textPrimary

--colors-textSecondary

--colors-textDisabled

--colors-primary

--colors-primaryHover

--colors-primaryActive

--colors-secondary

--colors-accent

--colors-success

--colors-warning

--colors-error

--colors-info

--colors-border

--colors-shadow

Spacing:

--spacing-xxs

--spacing-xs

--spacing-sm

--spacing-md

--spacing-lg

--spacing-xl

Border Radius:

--radius-none

--radius-sm

--radius-md

--radius-lg

--radius-pill

Browser Support
Chrome/Edge (latest)

Firefox (latest)

Safari (latest)

Mobile browsers

License
MIT © DevCore UI