import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { EvmWallet } from '@wainola/lit-wallet-manager';
import { SDKController } from '@wainola/lit-sdk-manager';
import { ethers } from 'ethers';
import { Transfer, Fungible, EvmFee } from '@buildwithsygma/sygma-sdk-core';

@customElement('widget-test')
export class Widget extends LitElement {
  @property({ type: String }) primaryColor?: string;
  @property({ type: String }) secondaryColor?: string;
  @property({ type: String }) borderRadius?: string;
  @property({ type: String }) fontWeight?: string;

  @property({
    type: String,
    converter: (value: string | null) => {
      return value || null;
    }
  })
  widgetApp?: string;

  // Composite properties
  @property({ type: Array })
  allowedRoutes?: Array<{
    id: number;
    name: string;
  }> = [];

  @property({ type: Array })
  allowedWallets?: Array<{ id: string; name: string }> = [];

  @property({ type: Object })
  defaultFromNetwork?: { id: string; name: string } = { id: '', name: '' };

  @property({ type: Array })
  resourceList?: Array<{
    resourceId: string;
    type: 'fungible' | 'permissionlessGeneric';
    address: string;
    symbol: string;
    decimals: number;
  }> = [];

  @property({
    type: String,
    converter: (value: string | null) => value || null
  })
  providerUrl?: string;

  @state()
  evmWallet: EvmWallet | undefined;

  sdkController: SDKController | undefined;

  constructor() {
    super();
    this.evmWallet = new EvmWallet();
    this.sdkController = new SDKController(this, this.evmWallet);
  }

  @state({
    hasChanged: (oldValue: string, newValue: string) => {
      return oldValue !== newValue;
    }
  })
  evmAccount: string = '';

  @state({
    hasChanged: (oldValue: string, newValue: string) => {
      console.log(oldValue, newValue);
      return oldValue !== newValue;
    }
  })
  evmBalance: string = '';

  @state()
  amountToTransfer = '';

  @state()
  addressToTransfer = '';

  @state()
  sepoliaChainId = 11155111;

  @state()
  resourceId =
    '0x0000000000000000000000000000000000000000000000000000000000000300';

  @state({
    hasChanged: (oldValue: string, newValue: string) => {
      return oldValue !== newValue;
    }
  })
  sendingApprovals: boolean = false;

  private async _connectoToEvm() {
    console.log('providerUrl: ', this.providerUrl);
    this.evmWallet?.connect();

    await this.evmWallet?.getAccount();
    await this.evmWallet?.getBalance();

    this.evmAccount = this.evmWallet?.currentAccount as string;
    this.evmBalance = this.evmWallet?.currentBalance as string;

    await this.sdkController?.createEvmAssetTransfer();
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
    } else {
      this.addressToTransfer = '';
    }
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();
    const parsedAmount = ethers.utils
      .parseEther(this.amountToTransfer)
      .toString();

    const transfer = await this.sdkController?.createFungibleTransfer(
      this.evmAccount as string,
      this.sepoliaChainId,
      this.addressToTransfer,
      this.resourceId,
      parsedAmount
    );

    const fee = await this.sdkController?.getFee(
      transfer as Transfer<Fungible>
    );

    const approvals = await this.sdkController?.buildApprovals(
      transfer as Transfer<Fungible>,
      fee as EvmFee
    );

    if (approvals !== undefined) {
      this.sendingApprovals = true;

      for (const approval of approvals) {
        const response = await this.evmWallet?.sendTransaction(approval);
        console.log('Sent approval with hash: ', response?.hash);
      }

      this.sendingApprovals = false;

      const transferTx = await this.sdkController?.buildTransferTransaction(
        transfer as Transfer<Fungible>,
        fee as EvmFee
      );

      const response = await this.evmWallet?.sendTransaction(transferTx!);
      console.log('Sent transfer with hash: ', response?.hash);
    }
  }

  render() {
    console.log(
      'Composite properties objects',
      this.allowedRoutes,
      this.allowedWallets,
      this.defaultFromNetwork,
      this.resourceList
    );
    const styles = {
      border: `2px solid ${this.primaryColor || ''}`,
      backgroundColor: this.secondaryColor || '',
      borderRadius: this.borderRadius || '',
      fontWeight: this.fontWeight || ''
    };
    return html`
      <div style=${styleMap(styles)}>
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
        <div>
          <p>${this.sendingApprovals ? 'Sending approvals' : ''}</p>
        </div>
      </div>
    `;
  }
}
