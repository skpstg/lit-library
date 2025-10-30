import { html, fixture, expect } from '@open-wc/testing';
import { LitCard } from './card.js';
import '../index.js';

describe('LitCard', () => {
  it('is defined', () => {
    const el = document.createElement('lit-card');
    expect(el).to.be.instanceOf(LitCard);
  });

  it('renders with default properties', async () => {
    const el = await fixture<LitCard>(html`<lit-card>Content</lit-card>`);
    expect(el.variant).to.equal('default');
  });

  it('renders slot content', async () => {
    const el = await fixture<LitCard>(html`<lit-card>Test Content</lit-card>`);
    const content = el.shadowRoot!.querySelector('.content');
    expect(content).to.exist;
    const slot = content!.querySelector('slot')!;
    const nodes = slot.assignedNodes();
    expect(nodes.length).to.be.greaterThan(0);
  });

  it('renders header slot', async () => {
    const el = await fixture<LitCard>(html`
      <lit-card>
        <span slot="header">Card Header</span>
        <p>Card content</p>
      </lit-card>
    `);
    const header = el.shadowRoot!.querySelector('.header');
    expect(header).to.exist;
    const slot = header!.querySelector('slot[name="header"]')!;
    expect(slot).to.exist;
  });

  it('renders footer slot', async () => {
    const el = await fixture<LitCard>(html`
      <lit-card>
        <p>Card content</p>
        <span slot="footer">Card Footer</span>
      </lit-card>
    `);
    const footer = el.shadowRoot!.querySelector('.footer');
    expect(footer).to.exist;
    const slot = footer!.querySelector('slot[name="footer"]')!;
    expect(slot).to.exist;
  });

  it('applies variant classes correctly', async () => {
    const elDefault = await fixture<LitCard>(html`<lit-card variant="default"></lit-card>`);
    const cardDefault = elDefault.shadowRoot!.querySelector('.card')!;
    expect(cardDefault.className).to.include('default');

    const elElevated = await fixture<LitCard>(html`<lit-card variant="elevated"></lit-card>`);
    const cardElevated = elElevated.shadowRoot!.querySelector('.card')!;
    expect(cardElevated.className).to.include('elevated');

    const elOutlined = await fixture<LitCard>(html`<lit-card variant="outlined"></lit-card>`);
    const cardOutlined = elOutlined.shadowRoot!.querySelector('.card')!;
    expect(cardOutlined.className).to.include('outlined');
  });

  it('has role="region" for accessibility', async () => {
    const el = await fixture<LitCard>(html`<lit-card>Content</lit-card>`);
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.getAttribute('role')).to.equal('region');
  });

  it('is accessible', async () => {
    const el = await fixture<LitCard>(html`<lit-card>Accessible Card</lit-card>`);
    await expect(el).to.be.accessible();
  });

  it('is accessible with header and footer', async () => {
    const el = await fixture<LitCard>(html`
      <lit-card>
        <h2 slot="header">Card Title</h2>
        <p>Card content goes here</p>
        <div slot="footer">Footer content</div>
      </lit-card>
    `);
    await expect(el).to.be.accessible();
  });

  it('updates properties reactively', async () => {
    const el = await fixture<LitCard>(html`<lit-card>Content</lit-card>`);

    el.variant = 'elevated';
    await el.updateComplete;
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.className).to.include('elevated');

    el.variant = 'outlined';
    await el.updateComplete;
    expect(card.className).to.include('outlined');
  });
});
