# Testing Guide

## Running Tests

The library uses [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) with Playwright for cross-browser testing.

### Prerequisites

Before running tests, install Playwright browsers:

```bash
npx playwright install --with-deps chromium-headless-shell
```

### Run Tests

```bash
# Run tests once with coverage
npm test

# Run tests in watch mode
npm test:watch
```

### Test Coverage

The test suite is configured to enforce >90% code coverage on:
- Statements
- Branches
- Functions
- Lines

Current test files:
- `src/components/button.spec.ts` - Button component tests
- `src/components/input.spec.ts` - Input component tests
- `src/components/card.spec.ts` - Card component tests

### Manual Testing

For manual testing and visual inspection, open the demo pages in a browser:

1. **Full Demo**: Open `demo.html` in a browser to see all components with examples
2. **Simple Test**: Open `test.html` for basic component verification

To serve the files locally, you can use:

```bash
npx http-server . -p 8080
```

Then navigate to:
- http://localhost:8080/demo.html
- http://localhost:8080/test.html

## Writing Tests

Tests are written using [@open-wc/testing](https://open-wc.org/docs/testing/testing-package/) which provides a convenient wrapper around standard testing tools.

### Example Test Structure

```typescript
import { html, fixture, expect } from '@open-wc/testing';
import { MyComponent } from './my-component.js';
import '../index.js';

describe('MyComponent', () => {
  it('renders with default properties', async () => {
    const el = await fixture<MyComponent>(
      html`<my-component></my-component>`
    );
    expect(el.someProperty).to.equal('default');
  });

  it('is accessible', async () => {
    const el = await fixture<MyComponent>(
      html`<my-component>Content</my-component>`
    );
    await expect(el).to.be.accessible();
  });
});
```

## Accessibility Testing

All components include accessibility tests using the `expect(el).to.be.accessible()` matcher, which uses [axe-core](https://github.com/dequelabs/axe-core) under the hood.

## Continuous Integration

Tests run automatically in GitHub Actions on every push and pull request. See `.github/workflows/ci.yml` for the configuration.
