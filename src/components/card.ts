import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { themeTokens, resetStyles } from '../theme/theme.js';

/**
 * A card component for displaying content in a contained layout
 *
 * @element lit-card
 *
 * @slot - Default slot for card content
 * @slot header - Slot for card header
 * @slot footer - Slot for card footer
 *
 * @cssprop --lit-card-padding - Padding for the card
 * @cssprop --lit-card-border-radius - Border radius for the card
 */
@customElement('lit-card')
export class LitCard extends LitElement {
  static styles = [
    resetStyles,
    themeTokens,
    css`
      :host {
        display: block;
      }

      .card {
        background-color: var(--lit-color-background);
        border-radius: var(--lit-card-border-radius, var(--lit-border-radius-lg));
        padding: var(--lit-card-padding, var(--lit-spacing-lg));
        box-shadow: var(--lit-shadow-md);
        font-family: var(--lit-font-family);
        color: var(--lit-color-text-primary);
      }

      .card.elevated {
        box-shadow: var(--lit-shadow-lg);
      }

      .card.outlined {
        box-shadow: none;
        border: 1px solid var(--lit-color-border);
      }

      .header {
        margin-bottom: var(--lit-spacing-md);
      }

      .content {
        flex: 1;
      }

      .footer {
        margin-top: var(--lit-spacing-md);
      }

      ::slotted([slot='header']) {
        font-size: var(--lit-font-size-lg);
        font-weight: var(--lit-font-weight-bold);
      }
    `,
  ];

  /**
   * Card variant style
   */
  @property({ type: String, reflect: true })
  variant: 'elevated' | 'outlined' | 'default' = 'default';

  render() {
    const classes = `card ${this.variant}`;

    return html`
      <div class=${classes} role="region">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-card': LitCard;
  }
}
