var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EvmWallet } from '@wainola/wallet-manager';
let Widget = class Widget extends LitElement {
    constructor() {
        super();
        this.widgetApp = 'The Widget';
        this.evmAccount = '';
        this.evmBalance = '';
        this.evmWallet = new EvmWallet();
    }
    async _connectoToEvm() {
        console.log("Connecting to EVM");
        this.evmWallet?.connect();
        await this.evmWallet?.getAccount();
        await this.evmWallet?.getBalance();
        this.evmAccount = this.evmWallet?.currentAccount;
        this.evmBalance = this.evmWallet?.currentBalance;
    }
    render() {
        return html `
      <div>
        <h1>${this.widgetApp}</h1>

        <div>
          <button @click=${this._connectoToEvm}>Connect to EVM</button>
          <p>Account connected: ${this.evmAccount !== '' ? this.evmAccount : 'No account connected'}</p>
          <p>Balance: ${this.evmBalance !== '' ? this.evmBalance : 'No balance'}</p>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], Widget.prototype, "widgetApp", void 0);
__decorate([
    state()
], Widget.prototype, "evmWallet", void 0);
__decorate([
    property({ type: String, hasChanged: (oldValue, newValue) => {
            console.log(oldValue, newValue);
            return oldValue !== newValue;
        } })
], Widget.prototype, "evmAccount", void 0);
__decorate([
    property({ type: String, hasChanged: (oldValue, newValue) => {
            console.log(oldValue, newValue);
            return oldValue !== newValue;
        } })
], Widget.prototype, "evmBalance", void 0);
Widget = __decorate([
    customElement('widget-test')
], Widget);
export { Widget };
