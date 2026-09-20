# DevCore UI Components

Reusable React UI components with a lightweight SCSS theme system, CSS Modules, and CSS custom properties.

`@dev-core-ui/components` is designed for application teams that want a small, consistent, customizable UI foundation without bringing in a large design system.

## Highlights

* 17 reusable UI components
* React 18 and React 19 support
* TypeScript declarations included
* CSS custom property driven theming
* SCSS-based component styling
* CSS Modules for component styles
* Light, dark, and system theme support
* Native HTML behavior and accessibility where appropriate
* No UI framework dependency
* Small dependency footprint

## Installation

```bash
npm install @dev-core-ui/components
```

The package requires React and React DOM as peer dependencies.

If your application does not already use Sass, you only need Sass when you want to work directly with SCSS in your application. The published package includes compiled CSS.

## Quick Start

Import the components you need and import the package styles once at the application root.

```tsx
import {
  Button,
  Input,
  Text,
} from "@dev-core-ui/components";

import "@dev-core-ui/components/styles";

export default function App() {
  return (
    <div>
      <Text variant="h1">Welcome to DevCore UI</Text>

      <Input
        name="email"
        label="Email"
        type="email"
      />

      <Button variant="primary">
        Submit
      </Button>
    </div>
  );
}
```

## Framework Usage

### Next.js

Import the package styles once in the root layout.

```tsx
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
```

### Vite, CRA, Remix, and other React applications

Import the package styles once near the application entry point.

```tsx
import "@dev-core-ui/components/styles";
```

## Components

### Button

Reusable button with variants, sizes, loading state, and native button attributes.

```tsx
<Button variant="primary" size="md">
  Save changes
</Button>
```

Common props:

* `variant`: `primary | secondary | ghost | danger`
* `size`: `sm | md | lg`
* `isLoading`: `boolean`
* Native button attributes are supported.

### Input

Text input with label, helper text, error state, and native input attributes.

```tsx
<Input
  name="email"
  label="Email"
  type="email"
  placeholder="name@example.com"
  helperText="We'll never share your email."
/>
```

### Select

Reusable select control supporting options or custom children.

```tsx
<Select
  name="plan"
  label="Plan"
  options={[
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
  ]}
/>
```

### Checkbox

Reusable checkbox with label and native checkbox attributes.

```tsx
<Checkbox
  name="terms"
  label="I agree to the terms"
/>
```

### Textarea

Multi-line input with label, helper text, error state, and native textarea attributes.

```tsx
<Textarea
  name="message"
  label="Message"
  rows={4}
/>
```

### Label

Reusable accessible label.

```tsx
<Label htmlFor="email" required>
  Email
</Label>
```

### Text

Semantic text primitive for headings and other text content.

```tsx
<Text variant="h2" color="primary">
  Section title
</Text>
```

### FileUpload

Reusable file input with file-size validation support.

```tsx
<FileUpload
  name="resume"
  label="Upload resume"
  accept=".pdf,.doc,.docx"
/>
```

### FormCard

Reusable container for grouping form content.

```tsx
<FormCard>
  <Input
    name="fullName"
    label="Full name"
  />

  <Button type="submit">
    Submit
  </Button>
</FormCard>
```

### Required

Reusable required-field marker.

```tsx
<Required />
```

### Divider

Horizontal or vertical separator.

```tsx
<Divider />

<Divider
  orientation="vertical"
  length="24px"
/>
```

### Badge

Reusable status or label indicator with theme-based variants and sizes.

```tsx
<Badge variant="success">
  Active
</Badge>
```

Available variants:

* `primary`
* `secondary`
* `success`
* `warning`
* `error`
* `info`
* `neutral`

Available sizes:

* `sm`
* `md`
* `lg`

### Spinner

Reusable loading indicator.

```tsx
<Spinner size="md" />
```

Available sizes:

* `sm`
* `md`
* `lg`

A custom accessible label can be provided:

```tsx
<Spinner label="Loading results" />
```

### Modal

Controlled modal built on the native HTML `<dialog>` element.

```tsx
<Modal
  open={open}
  title="Confirm action"
  onClose={() => setOpen(false)}
>
  Are you sure you want to continue?
</Modal>
```

Available placement options:

* `center`
* `top`
* `bottom`
* `left`
* `right`

The Modal does not impose a fixed width or maximum width. Applications can control dimensions and layout through `className`, `style`, or CSS custom properties.

The following behavior can also be controlled:

* `showCloseButton`
* `closeOnOverlayClick`
* `closeOnEscape`

### Radio

Reusable native radio control with customizable label content.

```tsx
<Radio
  name="plan"
  value="pro"
  label="Professional"
/>
```

The component preserves native radio behavior and supports native input attributes.

### RadioGroup

Reusable fieldset for grouping Radio components.

```tsx
<RadioGroup
  name="plan"
  legend="Choose a plan"
  orientation="vertical"
>
  <Radio
    name="plan"
    value="starter"
    label="Starter"
  />

  <Radio
    name="plan"
    value="pro"
    label="Professional"
  />
</RadioGroup>
```

Available orientations:

* `vertical`
* `horizontal`

Layout spacing can be customized using the component's CSS custom properties instead of requiring project-specific spacing props.

### EmptyState

Reusable empty-content presentation for lists, tables, search results, dashboards, and other application areas.

```tsx
<EmptyState
  heading="No products found"
  description="There are no products available yet."
  action={
    <Button>
      Add Product
    </Button>
  }
/>
```

Supports:

* `heading`
* `description`
* `icon`
* `action`
* custom children
* native `div` attributes

The component does not impose application-specific actions or illustrations.

## Theming

DevCore UI uses CSS custom properties for runtime theming.

Import the package styles first:

```tsx
import "@dev-core-ui/components/styles";
```

Then override the variables from your application's stylesheet:

```scss
:root {
  --colors-primary: #2563eb;
  --colors-surface: #ffffff;
  --colors-textPrimary: #111827;
  --colors-border: #e5e7eb;

  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

This allows an application to customize DevCore UI without modifying the package source.

## Theme Modes

The theme supports:

* Light
* Dark
* System

Theme selection can be controlled with the `data-theme` attribute:

```html
<html data-theme="dark">
```

Supported values:

```text
light
dark
system
```

When `data-theme="system"` is used, the theme follows the user's `prefers-color-scheme` preference.

## Theme Tokens

### Colors

```text
--colors-background
--colors-surface
--colors-surfaceRaised
--colors-overlay

--colors-textPrimary
--colors-textSecondary
--colors-textDisabled
--colors-textOnPrimary

--colors-primary
--colors-primaryHover
--colors-primaryActive

--colors-secondary
--colors-secondaryHover
--colors-secondaryActive

--colors-accent

--colors-success
--colors-warning
--colors-error
--colors-info

--colors-border
--colors-borderStrong
--colors-focus
--colors-shadow
```

### Typography

```text
--typography-fontFamily

--typography-fontWeight-regular
--typography-fontWeight-medium
--typography-fontWeight-semibold
--typography-fontWeight-bold

--typography-title-fontSize
--typography-title-fontWeight
--typography-title-lineHeight

--typography-sectionTitle-fontSize
--typography-sectionTitle-fontWeight
--typography-sectionTitle-lineHeight

--typography-subsection-fontSize
--typography-subsection-fontWeight
--typography-subsection-lineHeight

--typography-body-fontSize
--typography-body-fontWeight
--typography-body-lineHeight

--typography-bodySmall-fontSize
--typography-bodySmall-fontWeight
--typography-bodySmall-lineHeight

--typography-caption-fontSize
--typography-caption-fontWeight
--typography-caption-lineHeight

--typography-button-fontSize
--typography-button-fontWeight
--typography-button-lineHeight
```

### Spacing

```text
--spacing-xxs
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl
```

### Radius

```text
--radius-none
--radius-sm
--radius-md
--radius-lg
--radius-pill
```

### Shadows

```text
--shadow-xs
--shadow-sm
--shadow-md
--shadow-lg
```

### Borders and focus

```text
--border-width
--border-style
--focus-ring-width
```

### Z-index

```text
--zIndex-dropdown
--zIndex-modal
--zIndex-tooltip
```

### Motion

```text
--motion-fast
--motion-normal
--motion-slow
--motion-easing
```

### Component sizes

```text
--components-button-height
--components-control-height-sm
--components-control-height-md
--components-control-height-lg
```

## Component Customization

Components are designed to be customized by the consuming application.

Use:

* `className`
* native HTML attributes
* CSS custom properties
* application-level CSS

For example:

```scss
.customModal {
  width: min(90vw, 900px);
}

.compactRadioGroup {
  --radio-group-gap: var(--spacing-sm);
}

.customRadio {
  --radio-gap: var(--spacing-xs);
}
```

DevCore UI avoids forcing application-specific widths, layouts, spacing, and business rules into reusable components.

## Package Exports

The main package export:

```text
@dev-core-ui/components
```

Compiled package styles:

```text
@dev-core-ui/components/styles
```

Example:

```tsx
import {
  Button,
  Badge,
  Modal,
  Radio,
  RadioGroup,
  EmptyState,
} from "@dev-core-ui/components";

import "@dev-core-ui/components/styles";
```

## TypeScript

TypeScript declarations are included with the package.

Component prop types are exported from the main package:

```tsx
import type {
  ButtonProps,
  BadgeProps,
  ModalProps,
  RadioProps,
  RadioGroupProps,
  EmptyStateProps,
} from "@dev-core-ui/components";
```

## Build

Build the package with:

```bash
npm run build
```

The build generates:

* ESM output
* CommonJS output
* TypeScript declaration files
* Compiled CSS
* Source maps

The generated files are written to the `dist` directory.

## Release

The project uses `standard-version` for versioning and changelog generation.

```bash
npm run release
```

Follow semantic versioning when releasing:

* Patch: backward-compatible bug fixes
* Minor: backward-compatible new functionality
* Major: breaking API or behavior changes

## Browser Support

DevCore UI targets modern browsers:

* Latest Chrome
* Latest Edge
* Latest Firefox
* Latest Safari
* Modern mobile browsers

Components use standard web platform features and native HTML behavior where appropriate.

## License

MIT
