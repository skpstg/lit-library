# @skpstg/lit-library

A modern, accessible, and themeable web component library built with Lit and TypeScript.

## Features

✨ **TypeScript First** - Full TypeScript support with comprehensive type definitions  
🎨 **Themeable** - Global theming system using CSS custom properties  
♿ **Accessible** - Built with WCAG 2.1 Level AA compliance in mind  
🧪 **Well Tested** - >90% test coverage with comprehensive test suite  
📦 **Platform Agnostic** - Works with vanilla JS, React, Vue, Angular, and more  
🛠️ **Developer Experience** - ESLint, Prettier, and modern tooling included

## Installation

```bash
npm install @skpstg/lit-library
```

## Usage

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@skpstg/lit-library';
    </script>
  </head>
  <body>
    <lit-button variant="primary">Click me</lit-button>
    <lit-input label="Username" placeholder="Enter username"></lit-input>
    <lit-card variant="elevated">
      <h2 slot="header">Card Title</h2>
      <p>Card content goes here</p>
    </lit-card>
  </body>
</html>
```

### React

```jsx
import '@skpstg/lit-library';

function App() {
  return (
    <div>
      <lit-button variant="primary" onClick={() => console.log('clicked')}>
        Click me
      </lit-button>
      <lit-input
        label="Email"
        type="email"
        onInput={(e) => console.log(e.detail.value)}
      />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <lit-button variant="primary" @click="handleClick">Click me</lit-button>
    <lit-input label="Email" type="email" @input="handleInput" />
  </div>
</template>

<script>
import '@skpstg/lit-library';

export default {
  methods: {
    handleClick() {
      console.log('clicked');
    },
    handleInput(e) {
      console.log(e.detail.value);
    },
  },
};
</script>
```

## Components

### Button (`<lit-button>`)

A customizable button component with multiple variants and sizes.

#### Properties

| Property      | Type                                         | Default     | Description                    |
| ------------- | -------------------------------------------- | ----------- | ------------------------------ |
| `variant`     | `'primary' \| 'secondary' \| 'outlined' \| 'text'` | `'primary'` | Button style variant           |
| `size`        | `'small' \| 'medium' \| 'large'`            | `'medium'`  | Button size                    |
| `disabled`    | `boolean`                                    | `false`     | Whether button is disabled     |
| `type`        | `'button' \| 'submit' \| 'reset'`           | `'button'`  | Button type attribute          |
| `aria-label`  | `string`                                     | -           | ARIA label for accessibility   |

#### Example

```html
<lit-button variant="primary" size="large">Primary Button</lit-button>
<lit-button variant="outlined" disabled>Disabled Button</lit-button>
```

### Input (`<lit-input>`)

An accessible input field with label, validation, and error handling.

#### Properties

| Property        | Type                                              | Default  | Description                    |
| --------------- | ------------------------------------------------- | -------- | ------------------------------ |
| `label`         | `string`                                          | -        | Input label                    |
| `value`         | `string`                                          | `''`     | Input value                    |
| `type`          | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type                     |
| `placeholder`   | `string`                                          | -        | Placeholder text               |
| `disabled`      | `boolean`                                         | `false`  | Whether input is disabled      |
| `required`      | `boolean`                                         | `false`  | Whether input is required      |
| `helper-text`   | `string`                                          | -        | Helper text below input        |
| `error-message` | `string`                                          | -        | Error message to display       |
| `minlength`     | `number`                                          | -        | Minimum length validation      |
| `maxlength`     | `number`                                          | -        | Maximum length validation      |
| `pattern`       | `string`                                          | -        | Pattern validation             |

#### Methods

- `focus()` - Focus the input
- `blur()` - Blur the input

#### Events

- `input` - Fired when input value changes
- `change` - Fired when input loses focus after value change

#### Example

```html
<lit-input
  label="Email"
  type="email"
  required
  helper-text="Enter your email address"
></lit-input>

<lit-input
  label="Password"
  type="password"
  error-message="Password must be at least 8 characters"
></lit-input>
```

### Card (`<lit-card>`)

A container component for displaying content in a structured layout.

#### Properties

| Property  | Type                                   | Default     | Description          |
| --------- | -------------------------------------- | ----------- | -------------------- |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Card style variant   |

#### Slots

- `header` - Card header content
- `default` - Card main content
- `footer` - Card footer content

#### Example

```html
<lit-card variant="elevated">
  <h2 slot="header">Card Title</h2>
  <p>This is the card content.</p>
  <div slot="footer">
    <lit-button>Action</lit-button>
  </div>
</lit-card>
```

## Theming

The library uses CSS custom properties for theming. You can override these at the document or component level.

### Theme Tokens

```css
:root {
  /* Colors */
  --lit-color-primary: #1976d2;
  --lit-color-secondary: #dc004e;
  --lit-color-success: #4caf50;
  --lit-color-error: #f44336;

  /* Spacing */
  --lit-spacing-xs: 4px;
  --lit-spacing-sm: 8px;
  --lit-spacing-md: 16px;
  --lit-spacing-lg: 24px;

  /* Typography */
  --lit-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --lit-font-size-md: 16px;

  /* Border radius */
  --lit-border-radius-md: 8px;

  /* Shadows */
  --lit-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Custom Theme Example

```html
<style>
  :root {
    --lit-color-primary: #9c27b0;
    --lit-color-secondary: #ff5722;
    --lit-border-radius-md: 16px;
  }
</style>

<lit-button>Custom Themed Button</lit-button>
```

## Accessibility

All components are built with accessibility in mind:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ High contrast mode support
- ✅ Semantic HTML

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
npm run lint:fix
```

### Format

```bash
npm run format
npm run format:check
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
