# DevCore UI Components

Reusable React UI components with built-in theming support using CSS Variables.

## How to Release
We use `standard-version` for automated versioning and changelog generation.

**To release a new version:**

1. **Commit your changes:**
```bash
   git add .
   git commit -m "feat: your descriptive message"

## Features

- **Atomic Design Components** - 9 fully-featured UI atoms
- **Light & Dark Theme Support** - Complete theme system with SCSS variables
- **CSS Variables (SSR Friendly)** - No JavaScript runtime for theming
- **Works with Next.js and React** - Framework agnostic
- **Easy Customization** - Override theme variables at the project level
- **TypeScript Support** - Full type definitions included
- **SCSS Modules** - Scoped styles with CSS variables

## Installation

```bash
npm install @dev-core-ui/components
```

## Quick Start

### 1. Enable Sass in your app

DevCore UI exports theme SCSS and uses CSS Modules. Your app must compile SCSS files from `node_modules`.

If you do not already have Sass support, install it:

```bash
npm install sass
```

### 2. Import the theme once at app root

In your global stylesheet, add:

```scss
@import '@dev-core-ui/components/theme/theme.scss';
```

Then import that stylesheet from your application entry, for example:

```ts
import './styles/global.scss';
```

If your bundler supports importing SCSS directly from JavaScript, you can also use:

```ts
import '@dev-core-ui/components/theme/theme.scss';
```

> Note: `theme.scss` is the library's default theme entry. It registers the CSS variables required by all components.

### 3. Use components

```tsx
import { Button, Input, Text } from '@dev-core-ui/components';

export default function App() {
  return (
    <div>
      <Text variant="h1">Welcome to DevCore UI</Text>
      <Input label="Email" name="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## Available Components

### Button
Primary, secondary, ghost, and danger variants with loading and disabled states.

**Props**
- `variant`: `primary | secondary | ghost | danger`
- `size`: `sm | md | lg`
- `isLoading`: `boolean`
- `disabled`: `boolean`
- `className`: `string`
- `style`: `CSSProperties`
- Native button props are forwarded.

```tsx
<Button
  variant="primary"
  className="my-button"
  style={{ minWidth: 120 }}
>
  Submit
</Button>
```

### Input
Text input with label, error state, helper text, and native input support.

**Props**
- `name`: `string` (required)
- `label`: `string`
- `error`: `string`
- `helperText`: `string`
- `className`: `string` — applies to the input element
- `wrapperClassName`: `string` — applies to the component wrapper
- `style`: `CSSProperties`
- Native `<input>` props such as `type`, `placeholder`, `value`, `onChange`, `disabled`, etc.

```tsx
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="Enter email"
  className="my-input"
  style={{ minHeight: 50 }}
/>
```

### Select
Dropdown select component with optional options list or custom children.

**Props**
- `label`: `string`
- `error`: `string`
- `options`: `{ value: string; label: string }[]`
- `className`: `string` — applies to the select element
- `wrapperClassName`: `string` — applies to the component wrapper
- `style`: `CSSProperties`
- Native `<select>` props such as `name`, `value`, `onChange`, etc.

```tsx
<Select
  label="Choose"
  name="option"
  className="my-select"
>
  <option value="">Select one</option>
  <option value="1">Option 1</option>
</Select>
```

### Checkbox
Checkbox with label and native props.

**Props**
- `label`: `string`
- `className`: `string` — applies to the checkbox input
- `wrapperClassName`: `string` — applies to the component wrapper
- `style`: `CSSProperties`
- Native `<input type="checkbox">` props such as `checked`, `onChange`, `disabled`, and `name`.

```tsx
<Checkbox label="I agree" name="agree" className="my-checkbox" />
```

### Textarea
Multi-line text input with optional rows.

**Props**
- `label`: `string`
- `error`: `string`
- `helperText`: `string`
- `className`: `string` — applies to the textarea element
- `wrapperClassName`: `string` — applies to the component wrapper
- `style`: `CSSProperties`
- Native `<textarea>` props such as `rows`, `name`, `value`, `onChange`, etc.

```tsx
<Textarea
  label="Message"
  name="message"
  rows={4}
  className="my-textarea"
/>
```

### Label
Label component with optional required indicator.

**Props**
- `required`: `boolean`
- `className`: `string`
- `style`: `CSSProperties`
- Native `<label>` props such as `htmlFor`.

```tsx
<Label htmlFor="email" required className="my-label">
  Email
</Label>
```

### Text
Semantic text component with headings, paragraphs, labels, captions, and code.

**Props**
- `variant`: `h1 | h2 | h3 | h4 | h5 | h6 | p | label | small | caption | code`
- `size`: `xs | sm | md | lg | xl | 2xl | 3xl | 4xl`
- `weight`: `light | normal | medium | semibold | bold`
- `color`: `primary | text | text-light | error | success | warning`
- `as`: custom element type
- `className`: `string`
- `style`: `CSSProperties`

```tsx
<Text variant="h1">Heading</Text>
<Text variant="p" className="my-paragraph">
  Paragraph text
</Text>
```

### FileUpload
File input component with size validation.

**Props**
- `label`: `string`
- `error`: `string`
- `accept`: `string`
- `maxSize`: `number` (MB)
- `className`: `string` — applies to the file input
- `wrapperClassName`: `string` — applies to the component wrapper
- `style`: `CSSProperties`
- Native `<input type="file">` props such as `name`, `disabled`, and `onChange`.

```tsx
<FileUpload
  label="Upload File"
  name="file"
  accept=".pdf,.doc"
  className="my-file-upload"
/>
```

### FormCard
Container card for form layout sections.

**Props**
- `className`: `string`
- `style`: `CSSProperties`
- `children`: `ReactNode`

```tsx
<FormCard className="my-card" style={{ padding: 24 }}>
  <Input label="Name" name="name" />
  <Button variant="primary">Submit</Button>
</FormCard>
```

### Required
Render a required field marker with customizable color.

**Props**
- `color`: `string`
- `className`: `string`
- `style`: `CSSProperties`

```tsx
<Required color="#d9534f" />
```

### Divider
Horizontal or vertical line with flexible size, color, and className.

**Props**
- `orientation`: `horizontal | vertical`
- `thickness`: `string`
- `length`: `string`
- `color`: `string`
- `className`: `string`
- `style`: `CSSProperties`

```tsx
<Divider />
<Divider orientation="vertical" length="100px" />
<Divider thickness="2px" color="#d1d5db" className="my-divider" />
```

## Theming

All components use CSS variables from the theme. Import the theme once at your app root and override variables in a stylesheet loaded after the theme file.

```scss
@import '@dev-core-ui/components/theme/theme.scss';

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
```

### Available Theme Variables

**Colors:**
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

**Typography:**
- `--typography-fontFamily`
- `--typography-h1-fontSize`
- `--typography-h1-fontWeight`
- `--typography-h1-lineHeight`
- `--typography-h2-fontSize`
- `--typography-h2-fontWeight`
- `--typography-h2-lineHeight`
- `--typography-h3-fontSize`
- `--typography-h3-fontWeight`
- `--typography-h3-lineHeight`
- `--typography-body-fontSize`
- `--typography-body-fontWeight`
- `--typography-body-lineHeight`
- `--typography-button-fontSize`
- `--typography-button-fontWeight`
- `--typography-button-lineHeight`
- `--typography-caption-fontSize`
- `--typography-caption-fontWeight`
- `--typography-caption-lineHeight`

**Spacing:**
- `--spacing-xxs`
- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`
- `--spacing-xl`

**Border Radius:**
- `--radius-none`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

**Shadow:**
- `--shadow-xs`
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`

**Motion:**
- `--motion-fast`
- `--motion-normal`
- `--motion-slow`
- `--motion-easing`







Keep the README up to date with examples and make sure `package.json` `files` includes only the published assets (`dist`, `theme`).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Repository

[GitHub - devcore-ui](https://github.com/naresha-dev/devcore-ui)
