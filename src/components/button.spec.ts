import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { LitButton } from './button.js';
import '../index.js';

describe('LitButton', () => {
  it('is defined', () => {
    const el = document.createElement('lit-button');
    expect(el).to.be.instanceOf(LitButton);
  });

  it('renders with default properties', async () => {
    const el = await fixture<LitButton>(html`<lit-button>Click me</lit-button>`);
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('medium');
    expect(el.disabled).to.be.false;
    expect(el.type).to.equal('button');
  });

  it('renders slot content', async () => {
    const el = await fixture<LitButton>(html`<lit-button>Test Button</lit-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    const slot = button.querySelector('slot')!;
    const nodes = slot.assignedNodes();
    expect(nodes.length).to.be.greaterThan(0);
  });

  it('applies variant classes correctly', async () => {
    const elPrimary = await fixture<LitButton>(html`<lit-button variant="primary"></lit-button>`);
    const buttonPrimary = elPrimary.shadowRoot!.querySelector('button')!;
    expect(buttonPrimary.className).to.include('primary');

    const elSecondary = await fixture<LitButton>(
      html`<lit-button variant="secondary"></lit-button>`
    );
    const buttonSecondary = elSecondary.shadowRoot!.querySelector('button')!;
    expect(buttonSecondary.className).to.include('secondary');

    const elOutlined = await fixture<LitButton>(html`<lit-button variant="outlined"></lit-button>`);
    const buttonOutlined = elOutlined.shadowRoot!.querySelector('button')!;
    expect(buttonOutlined.className).to.include('outlined');

    const elText = await fixture<LitButton>(html`<lit-button variant="text"></lit-button>`);
    const buttonText = elText.shadowRoot!.querySelector('button')!;
    expect(buttonText.className).to.include('text');
  });

  it('applies size classes correctly', async () => {
    const elSmall = await fixture<LitButton>(html`<lit-button size="small"></lit-button>`);
    const buttonSmall = elSmall.shadowRoot!.querySelector('button')!;
    expect(buttonSmall.className).to.include('small');

    const elMedium = await fixture<LitButton>(html`<lit-button size="medium"></lit-button>`);
    const buttonMedium = elMedium.shadowRoot!.querySelector('button')!;
    expect(buttonMedium.className).to.not.include('small');
    expect(buttonMedium.className).to.not.include('large');

    const elLarge = await fixture<LitButton>(html`<lit-button size="large"></lit-button>`);
    const buttonLarge = elLarge.shadowRoot!.querySelector('button')!;
    expect(buttonLarge.className).to.include('large');
  });

  it('handles disabled state', async () => {
    const el = await fixture<LitButton>(html`<lit-button disabled>Disabled</lit-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('sets button type attribute', async () => {
    const elButton = await fixture<LitButton>(html`<lit-button type="button"></lit-button>`);
    const button1 = elButton.shadowRoot!.querySelector('button')!;
    expect(button1.type).to.equal('button');

    const elSubmit = await fixture<LitButton>(html`<lit-button type="submit"></lit-button>`);
    const button2 = elSubmit.shadowRoot!.querySelector('button')!;
    expect(button2.type).to.equal('submit');

    const elReset = await fixture<LitButton>(html`<lit-button type="reset"></lit-button>`);
    const button3 = elReset.shadowRoot!.querySelector('button')!;
    expect(button3.type).to.equal('reset');
  });

  it('sets aria-label when provided', async () => {
    const el = await fixture<LitButton>(html`<lit-button aria-label="Close dialog">X</lit-button>`);
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.getAttribute('aria-label')).to.equal('Close dialog');
  });

  it('dispatches click event when clicked', async () => {
    const el = await fixture<LitButton>(html`<lit-button>Click me</lit-button>`);
    const button = el.shadowRoot!.querySelector('button')!;

    setTimeout(() => button.click());
    const event = await oneEvent(el, 'click');
    expect(event).to.exist;
  });

  it('does not dispatch click event when disabled', async () => {
    const el = await fixture<LitButton>(html`<lit-button disabled>Click me</lit-button>`);
    const button = el.shadowRoot!.querySelector('button')!;

    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });

    button.click();
    await el.updateComplete;
    expect(clicked).to.be.false;
  });

  it('is accessible', async () => {
    const el = await fixture<LitButton>(html`<lit-button>Accessible Button</lit-button>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible when disabled', async () => {
    const el = await fixture<LitButton>(html`<lit-button disabled>Disabled Button</lit-button>`);
    await expect(el).to.be.accessible();
  });

  it('updates properties reactively', async () => {
    const el = await fixture<LitButton>(html`<lit-button>Button</lit-button>`);

    el.variant = 'secondary';
    await el.updateComplete;
    const button = el.shadowRoot!.querySelector('button')!;
    expect(button.className).to.include('secondary');

    el.disabled = true;
    await el.updateComplete;
    expect(button.disabled).to.be.true;
  });
});
