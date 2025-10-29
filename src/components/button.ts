import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeTokens, focusStyles, resetStyles } from '../theme/theme.js';

/**
 * A customizable button component with accessibility support
 *
 * @element lit-button
 *
 * @fires click - Dispatched when the button is clicked (unless disabled)
 *
 * @cssprop --lit-button-padding - Padding for the button
 * @cssprop --lit-button-font-size - Font size for button text
 * @cssprop --lit-button-border-radius - Border radius for the button
 *
 * @slot - Default slot for button content
 */
@customElement('lit-button')
export class LitButton extends LitElement {
  static styles = [
    resetStyles,
    themeTokens,
    focusStyles,
    css`
      :host {
        display: inline-block;
      }

      button {
        font-family: var(--lit-font-family);
        font-size: var(--lit-button-font-size, var(--lit-font-size-md));
        font-weight: var(--lit-font-weight-medium);
        line-height: var(--lit-line-height);
        padding: var(--lit-button-padding, var(--lit-spacing-sm) var(--lit-spacing-md));
        border-radius: var(--lit-button-border-radius, var(--lit-border-radius-md));
        border: 1px solid transparent;
        cursor: pointer;
        transition: all var(--lit-transition-fast);
        min-width: 64px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--lit-spacing-sm);
      }

      button:focus-visible {
        outline: var(--lit-focus-ring-width) solid var(--lit-focus-ring-color);
        outline-offset: var(--lit-focus-ring-offset);
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      /* Primary variant */
      .primary {
        background-color: var(--lit-color-primary);
        color: var(--lit-color-text-on-primary);
      }

      .primary:hover:not(:disabled) {
        background-color: var(--lit-color-primary-dark);
        box-shadow: var(--lit-shadow-md);
      }

      .primary:active:not(:disabled) {
        background-color: var(--lit-color-primary-dark);
        box-shadow: var(--lit-shadow-sm);
      }

      /* Secondary variant */
      .secondary {
        background-color: var(--lit-color-secondary);
        color: var(--lit-color-text-on-primary);
      }

      .secondary:hover:not(:disabled) {
        background-color: var(--lit-color-secondary-dark);
        box-shadow: var(--lit-shadow-md);
      }

      .secondary:active:not(:disabled) {
        background-color: var(--lit-color-secondary-dark);
        box-shadow: var(--lit-shadow-sm);
      }

      /* Outlined variant */
      .outlined {
        background-color: transparent;
        color: var(--lit-color-primary);
        border-color: var(--lit-color-primary);
      }

      .outlined:hover:not(:disabled) {
        background-color: rgba(25, 118, 210, 0.04);
        border-color: var(--lit-color-primary-dark);
      }

      .outlined:active:not(:disabled) {
        background-color: rgba(25, 118, 210, 0.08);
      }

      /* Text variant */
      .text {
        background-color: transparent;
        color: var(--lit-color-primary);
        min-width: auto;
      }

      .text:hover:not(:disabled) {
        background-color: rgba(25, 118, 210, 0.04);
      }

      .text:active:not(:disabled) {
        background-color: rgba(25, 118, 210, 0.08);
      }

      /* Size variants */
      .small {
        font-size: var(--lit-font-size-sm);
        padding: var(--lit-spacing-xs) var(--lit-spacing-sm);
        min-width: 48px;
      }

      .large {
        font-size: var(--lit-font-size-lg);
        padding: var(--lit-spacing-md) var(--lit-spacing-lg);
      }

      /* Full width */
      :host([fullwidth]) {
        display: block;
      }

      :host([fullwidth]) button {
        width: 100%;
      }
    `,
  ];

  /**
   * Button variant style
   */
  @property({ type: String, reflect: true })
  variant: 'primary' | 'secondary' | 'outlined' | 'text' = 'primary';

  /**
   * Button size
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Button type attribute
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Dispatch a custom event that bubbles and can be cancelled
    const clickEvent = new CustomEvent('click', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(clickEvent);
  }

  render() {
    const classes = [
      this.variant,
      this.size === 'small' ? 'small' : '',
      this.size === 'large' ? 'large' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <button
        type=${this.type}
        class=${classes}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}
