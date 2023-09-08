import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EvmWallet } from '@wainola/wallet-manager';
import { SDKController } from '@wainola/sdk-manager';

@customElement('widget-test')
export class Widget extends LitElement {
  @property({ type: String })
  widgetApp: string = 'The Widget';

  @state()
  evmWallet: EvmWallet | undefined;

  sdkController: SDKController | undefined;

  constructor() {
    super();
    this.evmWallet = new EvmWallet();
    this.sdkController = new SDKController(this, this.evmWallet);
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

  @property({
    type: String
  })
  amountToTransfer = '';

  @property({
    type: String
  })
  addressToTransfer = '';

  private async _connectoToEvm() {
    console.log('Connecting to EVM');
    this.evmWallet?.connect();

    await this.evmWallet?.getAccount();
    await this.evmWallet?.getBalance();

    this.evmAccount = this.evmWallet?.currentAccount as string;
    this.evmBalance = this.evmWallet?.currentBalance as string;

    await this.sdkController?.createEvmAssetTransfer();
    console.log('Asset transfer', this.sdkController?.evmAssetTransfer);
  }

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    switch (name) {
      case 'amount':
        this.amountToTransfer = value;
        break;
      case 'address':
        this.addressToTransfer = value;
        break;
      default:
        break;
    }
  }

  private handleCheck(event: Event) {
    const target = event.target as HTMLInputElement;
    const { checked } = target;
    if (checked) {
      this.addressToTransfer = this.evmAccount as string;
      console.log('Address to transfer', this.addressToTransfer);
    } else {
      this.addressToTransfer = '';
    }
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Submitting', this.amountToTransfer, this.addressToTransfer);
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
        <div>
          <form @submit=${this.handleSubmit}>
            <div>
              <label for="amount">Amount</label>
              <input
                type="text"
                placeholder="Enter amount to transfer"
                name="amount"
                @change=${this.handleChange}
              />
            </div>
            <div>
              <label for="address">Address</label>
              <input
                type="text"
                placeholder="Enter address to transfer"
                name="address"
                value=${this.addressToTransfer}
              />
            </div>
            <div>
              <label for="checkbox">Use same connected address</label>
              <input
                type="checkbox"
                name="checkbox"
                @change=${this.handleCheck}
              />
            </div>
            <div>
              <button type="submit">Transfer</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
