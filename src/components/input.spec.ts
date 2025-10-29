import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { LitInput } from './input.js';
import '../index.js';

describe('LitInput', () => {
  it('is defined', () => {
    const el = document.createElement('lit-input');
    expect(el).to.be.instanceOf(LitInput);
  });

  it('renders with default properties', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);
    expect(el.value).to.equal('');
    expect(el.type).to.equal('text');
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
  });

  it('renders with label', async () => {
    const el = await fixture<LitInput>(html`<lit-input label="Username"></lit-input>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.include('Username');
  });

  it('shows required indicator when required', async () => {
    const el = await fixture<LitInput>(html`<lit-input label="Email" required></lit-input>`);
    const indicator = el.shadowRoot!.querySelector('.required-indicator');
    expect(indicator).to.exist;
    expect(indicator!.textContent).to.equal('*');
  });

  it('renders with placeholder', async () => {
    const el = await fixture<LitInput>(html`<lit-input placeholder="Enter text..."></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('Enter text...');
  });

  it('sets input type attribute', async () => {
    const types: Array<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'> = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
    ];

    for (const type of types) {
      const el = await fixture<LitInput>(html`<lit-input type=${type}></lit-input>`);
      const input = el.shadowRoot!.querySelector('input')!;
      expect(input.type).to.equal(type);
    }
  });

  it('handles disabled state', async () => {
    const el = await fixture<LitInput>(html`<lit-input disabled></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('displays helper text', async () => {
    const el = await fixture<LitInput>(
      html`<lit-input helper-text="Enter at least 8 characters"></lit-input>`
    );
    const helperText = el.shadowRoot!.querySelector('.helper-text');
    expect(helperText).to.exist;
    expect(helperText!.textContent).to.include('Enter at least 8 characters');
  });

  it('displays error message', async () => {
    const el = await fixture<LitInput>(
      html`<lit-input error-message="Invalid email format"></lit-input>`
    );
    const helperText = el.shadowRoot!.querySelector('.helper-text.error');
    expect(helperText).to.exist;
    expect(helperText!.textContent).to.include('Invalid email format');
  });

  it('applies error class when error message is present', async () => {
    const el = await fixture<LitInput>(html`<lit-input error-message="Error"></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.className).to.include('error');
  });

  it('sets aria-invalid when error is present', async () => {
    const el = await fixture<LitInput>(html`<lit-input error-message="Error"></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  it('dispatches input event on user input', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const event = await oneEvent(el, 'input');
    expect(event).to.exist;
    expect(event.detail.value).to.equal('test');
  });

  it('dispatches change event on blur after value change', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    setTimeout(() => {
      input.value = 'changed';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const event = await oneEvent(el, 'change');
    expect(event).to.exist;
    expect(event.detail.value).to.equal('changed');
  });

  it('updates value property when input changes', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    input.value = 'new value';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('new value');
  });

  it('sets aria-label from property or label', async () => {
    const el1 = await fixture<LitInput>(html`<lit-input aria-label="Username"></lit-input>`);
    const input1 = el1.shadowRoot!.querySelector('input')!;
    expect(input1.getAttribute('aria-label')).to.equal('Username');

    const el2 = await fixture<LitInput>(html`<lit-input label="Email"></lit-input>`);
    const input2 = el2.shadowRoot!.querySelector('input')!;
    expect(input2.getAttribute('aria-label')).to.equal('Email');
  });

  it('sets validation attributes', async () => {
    const el = await fixture<LitInput>(
      html`<lit-input minlength="3" maxlength="10" pattern="[A-Za-z]+"></lit-input>`
    );
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('minlength')).to.equal('3');
    expect(input.getAttribute('maxlength')).to.equal('10');
    expect(input.getAttribute('pattern')).to.equal('[A-Za-z]+');
  });

  it('has focus and blur methods', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);
    const input = el.shadowRoot!.querySelector('input')!;

    el.focus();
    expect(el.shadowRoot!.activeElement).to.equal(input);

    el.blur();
    expect(el.shadowRoot!.activeElement).to.not.equal(input);
  });

  it('is accessible', async () => {
    const el = await fixture<LitInput>(html`<lit-input label="Name"></lit-input>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible when required', async () => {
    const el = await fixture<LitInput>(html`<lit-input label="Email" required></lit-input>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible when disabled', async () => {
    const el = await fixture<LitInput>(html`<lit-input label="Disabled" disabled></lit-input>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible with error message', async () => {
    const el = await fixture<LitInput>(
      html`<lit-input label="Email" error-message="Invalid email"></lit-input>`
    );
    await expect(el).to.be.accessible();
  });

  it('updates properties reactively', async () => {
    const el = await fixture<LitInput>(html`<lit-input></lit-input>`);

    el.value = 'test value';
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.value).to.equal('test value');

    el.disabled = true;
    await el.updateComplete;
    expect(input.disabled).to.be.true;

    el.errorMessage = 'Error occurred';
    await el.updateComplete;
    expect(input.className).to.include('error');
  });
});
