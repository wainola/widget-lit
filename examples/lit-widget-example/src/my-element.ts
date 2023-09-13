import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import litLogo from './assets/lit.svg';
import viteLogo from '/vite.svg';
import '@wainola/lit-widget';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  @state()
  providerUrl = import.meta.env.VITE_PROVIDER_URL;

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <widget-test
        widgetApp="Widget App Demo"
        primaryColor="red"
        secondaryColor="blue"
        borderRadius="10px"
        fontWeight="bold"
        allowedRoutes='[{ "id": 1, "name": "ethereum" }]'
        allowedWallets='[{ "id": 1, "name": "metamask" }]'
        defaultFromNetwork='{"id": "1", "name": "ethereum"}'
        resourceList='[
        {
          "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000300",
          "type": "fungible",
          "address": "0x3F9A68fF29B3d86a6928C44dF171A984F6180009",
          "symbol": "ERC20LRTest",
          "decimals": 18
        },
        {
          "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000500",
          "type": "permissionlessGeneric",
          "address": "",
          "symbol": "",
          "decimals": 0
        },
        {
          "resourceId": "0x0000000000000000000000000000000000000000000000000000000000001000",
          "type": "fungible",
          "address": "0xB376b0Ee6d8202721838e76376e81eEc0e2FE864",
          "symbol": "GPHA",
          "decimals": 18
        }]'
      ></widget-test>
      <!-- <widget-test></widget-test> -->
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
