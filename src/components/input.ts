import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { themeTokens, focusStyles, resetStyles } from '../theme/theme.js';

/**
 * A customizable input component with accessibility support
 *
 * @element lit-input
 *
 * @fires input - Dispatched when the input value changes
 * @fires change - Dispatched when the input loses focus after a value change
 *
 * @cssprop --lit-input-padding - Padding for the input
 * @cssprop --lit-input-font-size - Font size for input text
 * @cssprop --lit-input-border-radius - Border radius for the input
 */
@customElement('lit-input')
export class LitInput extends LitElement {
  static styles = [
    resetStyles,
    themeTokens,
    focusStyles,
    css`
      :host {
        display: block;
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--lit-spacing-xs);
      }

      label {
        font-family: var(--lit-font-family);
        font-size: var(--lit-font-size-sm);
        font-weight: var(--lit-font-weight-medium);
        color: var(--lit-color-text-primary);
      }

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      input {
        font-family: var(--lit-font-family);
        font-size: var(--lit-input-font-size, var(--lit-font-size-md));
        line-height: var(--lit-line-height);
        padding: var(--lit-input-padding, var(--lit-spacing-sm) var(--lit-spacing-md));
        border-radius: var(--lit-input-border-radius, var(--lit-border-radius-md));
        border: 1px solid var(--lit-color-border);
        background-color: var(--lit-color-background);
        color: var(--lit-color-text-primary);
        width: 100%;
        transition: border-color var(--lit-transition-fast);
      }

      input:hover:not(:disabled) {
        border-color: var(--lit-color-border-hover);
      }

      input:focus {
        outline: none;
        border-color: var(--lit-color-primary);
      }

      input:focus-visible {
        outline: var(--lit-focus-ring-width) solid var(--lit-focus-ring-color);
        outline-offset: var(--lit-focus-ring-offset);
      }

      input:disabled {
        background-color: var(--lit-color-surface);
        color: var(--lit-color-text-disabled);
        cursor: not-allowed;
      }

      input.error {
        border-color: var(--lit-color-error);
      }

      .helper-text {
        font-family: var(--lit-font-family);
        font-size: var(--lit-font-size-xs);
        color: var(--lit-color-text-secondary);
      }

      .helper-text.error {
        color: var(--lit-color-error);
      }

      .required-indicator {
        color: var(--lit-color-error);
        margin-left: 2px;
      }
    `,
  ];

  @query('input')
  private inputElement!: HTMLInputElement;

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Input label
   */
  @property({ type: String })
  label?: string;

  /**
   * Input placeholder
   */
  @property({ type: String })
  placeholder?: string;

  /**
   * Input type
   */
  @property({ type: String })
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Helper text to display below input
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message to display
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage?: string;

  /**
   * Input name attribute
   */
  @property({ type: String })
  name?: string;

  /**
   * ARIA label for accessibility
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * Minimum length for input validation
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Maximum length for input validation
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Pattern for input validation
   */
  @property({ type: String })
  pattern?: string;

  /**
   * Focus the input element
   */
  focus() {
    this.inputElement?.focus();
  }

  /**
   * Blur the input element
   */
  blur() {
    this.inputElement?.blur();
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const hasError = !!this.errorMessage;
    const displayHelperText = this.errorMessage || this.helperText;

    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`
              <label>
                ${this.label}
                ${this.required ? html`<span class="required-indicator">*</span>` : ''}
              </label>
            `
          : ''}
        <div class="input-container">
          <input
            type=${this.type}
            class=${hasError ? 'error' : ''}
            .value=${this.value}
            placeholder=${this.placeholder || ''}
            ?disabled=${this.disabled}
            ?required=${this.required}
            name=${this.name || ''}
            aria-label=${this.ariaLabel || this.label || ''}
            aria-invalid=${hasError ? 'true' : 'false'}
            aria-describedby=${displayHelperText ? 'helper-text' : ''}
            minlength=${this.minlength ?? ''}
            maxlength=${this.maxlength ?? ''}
            pattern=${this.pattern ?? ''}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
        </div>
        ${displayHelperText
          ? html`
              <div id="helper-text" class="helper-text ${hasError ? 'error' : ''}">
                ${displayHelperText}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-input': LitInput;
  }
}
