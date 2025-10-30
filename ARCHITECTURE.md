# Architecture and Design Decisions

This document explains the architecture and design decisions made for the @skpstg/lit-library.

## Technology Stack

### Core Framework: Lit 3.x

**Why Lit?**
- **Lightweight**: ~5KB gzipped, minimal runtime overhead
- **Web Standards**: Built on Web Components standards (Custom Elements, Shadow DOM)
- **Framework Agnostic**: Works with vanilla JS, React, Vue, Angular, Svelte, etc.
- **Performance**: Efficient reactive updates using fine-grained property tracking
- **Developer Experience**: Great TypeScript support, decorators, and tooling

### TypeScript

**Benefits:**
- Type safety for component APIs
- Better IDE support with autocomplete and inline documentation
- Catches errors at compile time
- Improves maintainability and refactoring

**Configuration:**
- Strict mode enabled for maximum type safety
- ES2020 target for modern JavaScript features
- Decorators enabled for Lit decorators
- Declaration files generated for consumers

### Build System: TypeScript Compiler (tsc)

**Why not a bundler?**
- Keep source files as ES modules for better tree-shaking
- Let consumers choose their bundler
- Faster build times
- Simpler configuration

## Component Architecture

### Base Structure

All components follow this pattern:

```typescript
@customElement('lit-component')
export class LitComponent extends LitElement {
  static styles = [resetStyles, themeTokens, focusStyles, css`...`];

  @property() prop = 'default';

  render() {
    return html`...`;
  }
}
```

### Style Composition

Components use multiple style layers:

1. **resetStyles**: Cross-browser normalization
2. **themeTokens**: CSS custom properties for theming
3. **focusStyles**: Accessible focus indicators
4. **Component styles**: Component-specific styles

This allows for:
- Consistent baseline styling
- Easy theming via CSS custom properties
- Accessibility by default
- Component-specific customization

## Theming System

### CSS Custom Properties

**Design Decision:** Use CSS custom properties instead of JavaScript theming.

**Benefits:**
- No JavaScript overhead
- Can be changed dynamically
- Works with standard CSS tools
- Easier to override at any level
- Better performance

**Structure:**
```css
:host {
  --lit-color-primary: #1976d2;
  --lit-spacing-md: 16px;
  /* ... */
}
```

**Customization Levels:**
1. Global: Override at `:root`
2. Container: Override on a parent element
3. Component: Override via component CSS properties

## Accessibility

### Strategy

Every component includes:

1. **Semantic HTML**: Use correct elements (`<button>`, `<input>`, etc.)
2. **ARIA Attributes**: Add when semantic HTML isn't enough
3. **Keyboard Navigation**: Support Tab, Enter, Space, Arrows
4. **Focus Management**: Visible focus indicators with `:focus-visible`
5. **Screen Reader Support**: Proper labels and descriptions

### Testing

- Automated tests with axe-core via `expect(el).to.be.accessible()`
- Manual testing with keyboard navigation
- Screen reader testing (NVDA, JAWS, VoiceOver)

## Testing Infrastructure

### @web/test-runner

**Why this choice?**
- Native browser testing (more accurate than JSDOM)
- Fast and modern
- Great TypeScript support
- Built-in coverage reporting
- Playwright for cross-browser testing

### Test Structure

```typescript
describe('Component', () => {
  it('renders with defaults', async () => { /* ... */ });
  it('handles user interaction', async () => { /* ... */ });
  it('is accessible', async () => { /* ... */ });
});
```

### Coverage Goals

- Statements: >90%
- Branches: >90%
- Functions: >90%
- Lines: >90%

## Code Quality Tools

### ESLint

**Configuration:**
- TypeScript ESLint parser
- Recommended rules enabled
- Customized for Lit patterns

### Prettier

**Benefits:**
- Consistent code formatting
- No debates about style
- Automatic fixing

**Configuration:**
- Single quotes
- Semicolons
- 2-space indentation
- 100-character line width

## Distribution Strategy

### ES Modules

**Format:** ES modules with TypeScript declarations

**Benefits:**
- Tree-shaking support
- Modern JavaScript
- Works in all modern environments
- Smaller bundle sizes

### Package Exports

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./theme": "./dist/theme/index.js"
  }
}
```

**Allows:**
- Import everything: `import '@skpstg/lit-library'`
- Import theme separately: `import { themeTokens } from '@skpstg/lit-library/theme'`

## Component Design Principles

### 1. Composition over Configuration

Use slots for flexibility:
```html
<lit-card>
  <h2 slot="header">Title</h2>
  <p>Content</p>
  <div slot="footer">Actions</div>
</lit-card>
```

### 2. Progressive Enhancement

Components work without JavaScript, then enhance:
- Button: Uses native `<button>`
- Input: Uses native `<input>`
- Card: Uses semantic HTML

### 3. Single Responsibility

Each component does one thing well:
- Button: Interactive element
- Input: Form field with validation
- Card: Content container

### 4. Extensibility

Components can be extended:
```typescript
class MyButton extends LitButton {
  // Custom behavior
}
```

## Performance Considerations

### 1. Lazy Property Updates

Lit only updates changed properties:
```typescript
@property() value = '';  // Reactive
private _internal = '';  // Not reactive
```

### 2. Minimal Re-renders

Only the affected parts of shadow DOM update:
```typescript
render() {
  return html`
    <div>${this.dynamic}</div>
    <div>Static</div>  <!-- Never re-renders -->
  `;
}
```

### 3. Shadow DOM Encapsulation

Styles are scoped, preventing global CSS conflicts:
- Faster style computation
- No cascade pollution
- Predictable styling

## Future Considerations

### Potential Additions

1. **More Components**
   - Dialog/Modal
   - Tooltip
   - Dropdown/Select
   - Tabs
   - Toast/Snackbar

2. **Advanced Features**
   - Form validation system
   - Animation utilities
   - Responsive utilities
   - Icon system

3. **Developer Tools**
   - Storybook integration
   - Visual regression testing
   - Custom elements manifest

4. **Documentation**
   - Interactive playground
   - Component gallery
   - Video tutorials

## Resources

- [Lit Documentation](https://lit.dev/)
- [Web Components Standards](https://www.webcomponents.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
