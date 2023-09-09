var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EvmWallet } from '@wainola/wallet-manager';
import { SDKController } from '@wainola/sdk-manager';
import { ethers } from 'ethers';
let Widget = class Widget extends LitElement {
    constructor() {
        super();
        this.evmAccount = '';
        this.evmBalance = '';
        this.amountToTransfer = '';
        this.addressToTransfer = '';
        this.sepoliaChainId = 11155111;
        this.resourceId = '0x0000000000000000000000000000000000000000000000000000000000000300';
        this.sendingApprovals = false;
        this.evmWallet = new EvmWallet();
        this.sdkController = new SDKController(this, this.evmWallet);
        console.log('property widgetApp', this.widgetApp);
    }
    async _connectoToEvm() {
        console.log('Connecting to EVM');
        this.evmWallet?.connect();
        await this.evmWallet?.getAccount();
        await this.evmWallet?.getBalance();
        this.evmAccount = this.evmWallet?.currentAccount;
        this.evmBalance = this.evmWallet?.currentBalance;
        await this.sdkController?.createEvmAssetTransfer();
        console.log('Asset transfer', this.sdkController?.evmAssetTransfer);
    }
    handleChange(event) {
        const target = event.target;
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
    handleCheck(event) {
        const target = event.target;
        const { checked } = target;
        if (checked) {
            this.addressToTransfer = this.evmAccount;
            console.log('Address to transfer', this.addressToTransfer);
        }
        else {
            this.addressToTransfer = '';
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting', this.amountToTransfer, this.addressToTransfer);
        const parsedAmount = ethers.utils
            .parseEther(this.amountToTransfer)
            .toString();
        console.log('Parsed amount', parsedAmount);
        const transfer = await this.sdkController?.createFungibleTransfer(this.evmAccount, this.sepoliaChainId, this.addressToTransfer, this.resourceId, parsedAmount);
        const fee = await this.sdkController?.getFee(transfer);
        const approvals = await this.sdkController?.buildApprovals(transfer, fee);
        if (approvals !== undefined) {
            this.sendingApprovals = true;
            for (const approval of approvals) {
                const response = await this.evmWallet?.sendTransaction(approval);
                console.log('Sent approval with hash: ', response?.hash);
            }
            this.sendingApprovals = false;
            const transferTx = await this.sdkController?.buildTransferTransaction(transfer, fee);
            const response = await this.evmWallet?.sendTransaction(transferTx);
            console.log('Sent transfer with hash: ', response?.hash);
        }
    }
    render() {
        return html `
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
        <div>
          <p>${this.sendingApprovals ? 'Sending approvals' : ''}</p>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({
        type: String,
        converter: (value) => {
            return value || null;
        }
    })
], Widget.prototype, "widgetApp", void 0);
__decorate([
    property({
        type: String,
        converter: (value) => value || null
    })
], Widget.prototype, "providerUrl", void 0);
__decorate([
    state()
], Widget.prototype, "evmWallet", void 0);
__decorate([
    state({
        hasChanged: (oldValue, newValue) => {
            console.log(oldValue, newValue);
            return oldValue !== newValue;
        }
    })
], Widget.prototype, "evmAccount", void 0);
__decorate([
    state({
        hasChanged: (oldValue, newValue) => {
            console.log(oldValue, newValue);
            return oldValue !== newValue;
        }
    })
], Widget.prototype, "evmBalance", void 0);
__decorate([
    state()
], Widget.prototype, "amountToTransfer", void 0);
__decorate([
    state()
], Widget.prototype, "addressToTransfer", void 0);
__decorate([
    state()
], Widget.prototype, "sepoliaChainId", void 0);
__decorate([
    state()
], Widget.prototype, "resourceId", void 0);
__decorate([
    state({
        hasChanged: (oldValue, newValue) => {
            console.log(oldValue, newValue);
            return oldValue !== newValue;
        }
    })
], Widget.prototype, "sendingApprovals", void 0);
Widget = __decorate([
    customElement('widget-test')
], Widget);
export { Widget };
