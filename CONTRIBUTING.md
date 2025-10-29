# Contributing to @skpstg/lit-library

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/skpstg/lit-library.git
   cd lit-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers (for testing)**
   ```bash
   npx playwright install --with-deps chromium-headless-shell
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write your code in the `src/` directory
- Follow the existing code structure and conventions
- Use TypeScript for type safety
- Ensure components are accessible

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format

# Build the project
npm run build

# Run tests
npm test
```

### 4. Add Tests

- Add tests for new components in `src/components/*.spec.ts`
- Ensure test coverage remains >90%
- Include accessibility tests for all interactive elements

### 5. Update Documentation

- Update README.md if you're adding new features
- Add JSDoc comments to public APIs
- Update TESTING.md if you're changing test infrastructure

### 6. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add new tooltip component"
```

Follow these commit message conventions:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 7. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Code Style

- **TypeScript**: All code must be written in TypeScript
- **Formatting**: Prettier is configured - run `npm run format` before committing
- **Linting**: ESLint is configured - run `npm run lint` to check
- **Components**: Follow Lit best practices and conventions

## Component Guidelines

### Structure

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeTokens, focusStyles, resetStyles } from '../theme/theme.js';

/**
 * Component description with @element tag
 *
 * @element component-name
 * @fires event-name - Event description
 * @cssprop --custom-property - Description
 * @slot - Default slot description
 */
@customElement('component-name')
export class ComponentName extends LitElement {
  static styles = [resetStyles, themeTokens, focusStyles, css`...`];

  @property({ type: String })
  someProp = 'default';

  render() {
    return html`<div>...</div>`;
  }
}
```

### Accessibility Requirements

- Use semantic HTML
- Add ARIA attributes when needed
- Support keyboard navigation
- Include focus styles
- Test with screen readers when possible
- Use the `expect(el).to.be.accessible()` test

### Theming

- Use CSS custom properties from `theme.ts`
- Allow component-level customization
- Document custom properties in JSDoc

### Testing

- Test default behavior
- Test all property variations
- Test events and user interactions
- Test accessibility
- Aim for >90% coverage

## Project Structure

```
lit-library/
├── src/
│   ├── components/     # Component implementations
│   │   ├── button.ts
│   │   ├── button.spec.ts
│   │   └── ...
│   ├── theme/          # Theme system
│   │   ├── theme.ts
│   │   └── index.ts
│   └── index.ts        # Main export file
├── dist/               # Built files (git-ignored)
├── demo.html           # Demo page
├── test.html           # Simple test page
├── package.json
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc.json
└── web-test-runner.config.mjs
```

## Questions?

If you have questions or need help, please:
- Open an issue on GitHub
- Check existing issues for similar questions
- Review the documentation

Thank you for contributing! 🎉
