# Usage Examples

This document provides examples of using @skpstg/lit-library in various frameworks and environments.

## Vanilla JavaScript / HTML

The simplest way to use the library:

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
    <lit-input label="Username" required></lit-input>
  </body>
</html>
```

## React

Web components work seamlessly in React:

### Installation

```bash
npm install @skpstg/lit-library
```

### Usage

```jsx
import '@skpstg/lit-library';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleInput = (e) => {
    console.log('Input value:', e.detail.value);
  };

  return (
    <div>
      <lit-button variant="primary" onClick={handleClick}>
        Click me
      </lit-button>

      <lit-input
        label="Email"
        type="email"
        required
        onInput={handleInput}
      />

      <lit-card variant="elevated">
        <h2 slot="header">Welcome</h2>
        <p>This is a card component in React.</p>
      </lit-card>
    </div>
  );
}

export default App;
```

### TypeScript Support in React

For better TypeScript support, you can create type definitions:

```typescript
// types/web-components.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'lit-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'outlined' | 'text';
        size?: 'small' | 'medium' | 'large';
        disabled?: boolean;
      },
      HTMLElement
    >;
    'lit-input': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        label?: string;
        value?: string;
        type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        'helper-text'?: string;
        'error-message'?: string;
      },
      HTMLElement
    >;
    'lit-card': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        variant?: 'default' | 'elevated' | 'outlined';
      },
      HTMLElement
    >;
  }
}
```

## Vue 3

Vue has excellent support for web components:

### Setup

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import '@skpstg/lit-library';

const app = createApp(App);

// Configure Vue to recognize custom elements
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('lit-');

app.mount('#app');
```

### Usage

```vue
<template>
  <div>
    <lit-button variant="primary" @click="handleClick">
      Click me
    </lit-button>

    <lit-input
      label="Email"
      type="email"
      required
      @input="handleInput"
    />

    <lit-card variant="elevated">
      <h2 slot="header">Welcome</h2>
      <p>This is a card component in Vue.</p>
    </lit-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked!');
    },
    handleInput(e) {
      console.log('Input value:', e.detail.value);
    },
  },
};
</script>
```

### Vue 3 with TypeScript

```typescript
// vite.config.ts or vue.config.js
export default {
  // ...
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('lit-'),
  },
};
```

## Angular

Angular also supports web components with a small configuration:

### Setup

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@skpstg/lit-library';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Usage

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <lit-button variant="primary" (click)="handleClick()">
        Click me
      </lit-button>

      <lit-input
        label="Email"
        type="email"
        required
        (input)="handleInput($event)"
      ></lit-input>

      <lit-card variant="elevated">
        <h2 slot="header">Welcome</h2>
        <p>This is a card component in Angular.</p>
      </lit-card>
    </div>
  `,
})
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }

  handleInput(e: any) {
    console.log('Input value:', e.detail.value);
  }
}
```

## Svelte

Svelte works well with web components:

### Usage

```svelte
<script>
  import '@skpstg/lit-library';

  function handleClick() {
    console.log('Button clicked!');
  }

  function handleInput(e) {
    console.log('Input value:', e.detail.value);
  }
</script>

<div>
  <lit-button variant="primary" on:click={handleClick}>
    Click me
  </lit-button>

  <lit-input
    label="Email"
    type="email"
    required
    on:input={handleInput}
  />

  <lit-card variant="elevated">
    <h2 slot="header">Welcome</h2>
    <p>This is a card component in Svelte.</p>
  </lit-card>
</div>
```

## Theming Across Frameworks

You can customize the theme globally using CSS:

```html
<style>
  :root {
    --lit-color-primary: #9c27b0;
    --lit-color-secondary: #ff5722;
    --lit-font-family: 'Roboto', sans-serif;
    --lit-border-radius-md: 16px;
  }
</style>
```

Or scope it to specific components:

```html
<div style="
  --lit-color-primary: #2196f3;
  --lit-spacing-md: 24px;
">
  <lit-button>Custom themed button</lit-button>
</div>
```

## CDN Usage

You can also use the library from a CDN (once published):

```html
<script type="module">
  import 'https://unpkg.com/@skpstg/lit-library@1.0.0/dist/index.js';
</script>

<lit-button>Click me</lit-button>
```

## Server-Side Rendering (SSR)

Web components can be used in SSR with declarative shadow DOM (supported in newer frameworks):

```html
<lit-button>
  <template shadowroot="open">
    <!-- Shadow DOM content -->
  </template>
  Button text
</lit-button>
```

For more details on SSR with Lit, see the [Lit SSR documentation](https://lit.dev/docs/ssr/overview/).
