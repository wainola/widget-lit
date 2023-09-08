import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EvmWallet } from '@wainola/wallet-manager';

@customElement('widget-test')
export class Widget extends LitElement {
  @property({ type: String })
  widgetApp: string = 'The Widget';

  @state()
  evmWallet: EvmWallet | undefined;

  constructor() {
    super();
    this.evmWallet = new EvmWallet();
  }

  @property({
    type: String,
    hasChanged: (oldValue: string, newValue: string) => {
      console.log(oldValue, newValue);
      return oldValue !== newValue;
    }
  })
  evmAccount: string = '';

  @property({
    type: String,
    hasChanged: (oldValue: string, newValue: string) => {
      console.log(oldValue, newValue);
      return oldValue !== newValue;
    }
  })
  evmBalance: string = '';

  private async _connectoToEvm() {
    console.log('Connecting to EVM');
    this.evmWallet?.connect();

    await this.evmWallet?.getAccount();
    await this.evmWallet?.getBalance();

    this.evmAccount = this.evmWallet?.currentAccount as string;
    this.evmBalance = this.evmWallet?.currentBalance as string;
  }

  render() {
    return html`
      <div>
        <h1>${this.widgetApp}</h1>

        <div>
          <button @click=${this._connectoToEvm}>Connect to EVM</button>
          <p>
            Account connected:
            ${this.evmAccount !== '' ? this.evmAccount : 'No account connected'}
          </p>
          <p>
            Balance: ${this.evmBalance !== '' ? this.evmBalance : 'No balance'}
          </p>
        </div>
      </div>
    `;
  }
}
