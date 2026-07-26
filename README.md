# DevCore UI Components

Reusable React UI components with a lightweight SCSS theme system and CSS Modules-based styles.

`@dev-core-ui/components` is designed for app teams that want a small, consistent set of form and text primitives without bringing in a heavy design system.

## Highlights

- 11 exported UI atoms
- React 18 and React 19 support
- TypeScript declarations included
- CSS variable driven theming
- SCSS theme files available for custom builds
- Package-ready `styles` export for one-line CSS imports

## Installation

```bash
npm install @dev-core-ui/components
```

Peer dependencies:

- `react`
- `react-dom`

If your app does not already support Sass, install it too:

```bash
npm install sass
```

## Quick Start

Import the library and its styles once at the app root:

```tsx
import { Button, Input, Text } from "@dev-core-ui/components";
import "@dev-core-ui/components/styles";

export default function App() {
  return (
    <div>
      <Text variant="h1">Welcome to DevCore UI</Text>
      <Input name="email" label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## Framework Notes

### Next.js

Import the package styles in your root layout:

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

### Vite, CRA, Remix, and others

Import the styles once near your application entry point:

```tsx
import "@dev-core-ui/components/styles";
```

## Available Components

### Button

Primary button with loading and size variants.

Props:

- `variant`: `primary | secondary | ghost | danger`
- `size`: `sm | md | lg`
- `isLoading`: `boolean`

Example:

```tsx
<Button variant="primary" size="md">
  Save changes
</Button>
```

### Input

Text input with optional label, helper text, and error state.

Props:

- `name`: `string` required
- `label`: `string`
- `error`: `string`
- `helperText`: `string`
- `wrapperClassName`: `string`

Example:

```tsx
<Input
  name="email"
  label="Email"
  type="email"
  placeholder="name@example.com"
  helperText="We\'ll never share your email."
/>
```

### Select

Dropdown select with optional `options` or custom children.

Props:

- `label`: `string`
- `error`: `string`
- `options`: `{ value: string; label: string }[]`
- `wrapperClassName`: `string`

Example:

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

Checkbox with optional label and native input props.

Props:

- `label`: `string`
- `wrapperClassName`: `string`

Example:

```tsx
<Checkbox name="terms" label="I agree to the terms" />
```

### Textarea

Multi-line text input with label, helper text, and error state.

Props:

- `label`: `string`
- `error`: `string`
- `helperText`: `string`
- `wrapperClassName`: `string`

Example:

```tsx
<Textarea name="message" label="Message" rows={4} />
```

### Label

Accessible label with an optional required marker.

Props:

- `required`: `boolean`

Example:

```tsx
<Label htmlFor="email" required>
  Email
</Label>
```

### Text

Semantic text primitive for headings, body text, captions, and code.

Props:

- `variant`: `h1 | h2 | h3 | h4 | h5 | h6 | p | label | small | caption | code`
- `size`: `xs | sm | md | lg | xl | 2xl | 3xl | 4xl`
- `weight`: `light | normal | medium | semibold | bold`
- `color`: `primary | text | text-light | error | success | warning`
- `as`: custom element override

Example:

```tsx
<Text variant="h2" color="primary">
  Section title
</Text>
```

### FileUpload

File input with built-in max-size validation.

Props:

- `label`: `string`
- `error`: `string`
- `accept`: `string`
- `maxSize`: `number` in MB
- `wrapperClassName`: `string`

Example:

```tsx
<FileUpload name="resume" label="Upload resume" accept=".pdf,.doc,.docx" />
```

### FormCard

Simple container for form sections.

Props:

- standard `div` props

Example:

```tsx
<FormCard style={{ padding: 24 }}>
  <Input name="fullName" label="Full name" />
  <Button type="submit">Submit</Button>
</FormCard>
```

### Required

Renders a required-field marker.

Props:

- `color`: `string`

Example:

```tsx
<Required color="#ef4444" />
```

### Divider

Horizontal or vertical separator.

Props:

- `orientation`: `horizontal | vertical`
- `color`: `string`
- `thickness`: `string`
- `length`: `string`

Example:

```tsx
<Divider />
<Divider orientation="vertical" length="24px" />
```

## Theming

The package ships with SCSS theme files and CSS variables.

You can override the theme values in your global stylesheet after importing the package styles:

```scss
:root {
  --colors-background: #ffffff;
  --colors-surface: #f8fafc;
  --colors-textPrimary: #111827;
  --colors-primary: #2563eb;
  --colors-border: #e5e7eb;

  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

Theme source files are also exposed for apps that want to import the SCSS directly:

```scss
@import "@dev-core-ui/components/theme/theme.scss";
```

## Theme Tokens

Color variables:

- `--colors-background`
- `--colors-surface`
- `--colors-overlay`
- `--colors-textPrimary`
- `--colors-textSecondary`
- `--colors-textDisabled`
- `--colors-primary`
- `--colors-primaryHover`
- `--colors-primaryActive`
- `--colors-secondary`
- `--colors-accent`
- `--colors-success`
- `--colors-warning`
- `--colors-error`
- `--colors-info`
- `--colors-border`
- `--colors-shadow`

Spacing variables:

- `--spacing-xxs`
- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`
- `--spacing-xl`

Radius variables:

- `--radius-none`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

## Package Exports

- `@dev-core-ui/components`
- `@dev-core-ui/components/styles`
- `@dev-core-ui/components/theme/*`

## Build

```bash
npm run build
```

This builds the package with `tsup` and copies the theme files into `theme/`.

## Release

The project uses `standard-version` for versioning and changelog generation.

```bash
npm run release
```

## Browser Support

- Chrome and Edge latest
- Firefox latest
- Safari latest
- Modern mobile browsers

## License

MIT
