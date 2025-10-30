import { css } from 'lit';

/**
 * Default theme tokens using CSS custom properties
 * These can be overridden at the document or component level
 */
export const themeTokens = css`
  :host {
    /* Colors */
    --lit-color-primary: #1976d2;
    --lit-color-primary-dark: #115293;
    --lit-color-primary-light: #4791db;
    --lit-color-secondary: #dc004e;
    --lit-color-secondary-dark: #9a0036;
    --lit-color-secondary-light: #e33371;
    --lit-color-success: #4caf50;
    --lit-color-warning: #ff9800;
    --lit-color-error: #f44336;
    --lit-color-info: #2196f3;

    /* Text colors */
    --lit-color-text-primary: #212121;
    --lit-color-text-secondary: #757575;
    --lit-color-text-disabled: #bdbdbd;
    --lit-color-text-on-primary: #ffffff;

    /* Background colors */
    --lit-color-background: #ffffff;
    --lit-color-surface: #f5f5f5;
    --lit-color-surface-variant: #e0e0e0;

    /* Border colors */
    --lit-color-border: #e0e0e0;
    --lit-color-border-hover: #bdbdbd;

    /* Spacing */
    --lit-spacing-xs: 4px;
    --lit-spacing-sm: 8px;
    --lit-spacing-md: 16px;
    --lit-spacing-lg: 24px;
    --lit-spacing-xl: 32px;

    /* Typography */
    --lit-font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --lit-font-size-xs: 12px;
    --lit-font-size-sm: 14px;
    --lit-font-size-md: 16px;
    --lit-font-size-lg: 18px;
    --lit-font-size-xl: 24px;
    --lit-font-weight-normal: 400;
    --lit-font-weight-medium: 500;
    --lit-font-weight-bold: 700;
    --lit-line-height: 1.5;

    /* Border radius */
    --lit-border-radius-sm: 4px;
    --lit-border-radius-md: 8px;
    --lit-border-radius-lg: 12px;
    --lit-border-radius-full: 9999px;

    /* Shadows */
    --lit-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --lit-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --lit-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --lit-transition-fast: 150ms ease-in-out;
    --lit-transition-base: 250ms ease-in-out;
    --lit-transition-slow: 350ms ease-in-out;

    /* Focus */
    --lit-focus-ring-color: #1976d2;
    --lit-focus-ring-width: 2px;
    --lit-focus-ring-offset: 2px;
  }
`;

/**
 * Common styles for focus visible states (accessibility)
 */
export const focusStyles = css`
  :focus-visible {
    outline: var(--lit-focus-ring-width) solid var(--lit-focus-ring-color);
    outline-offset: var(--lit-focus-ring-offset);
  }
`;

/**
 * Reset styles for consistent cross-browser rendering
 */
export const resetStyles = css`
  :host {
    box-sizing: border-box;
    display: inline-block;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
