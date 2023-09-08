import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { formatBalance } from '@polkadot/util';
formatBalance.setDefaults({ unit: 'DOT' });
class SubstrateWallet {
    async connect() {
        const injectors = await web3Enable('Polkadot Wallet');
        const polkadotInjector = injectors.find((injector) => injector.name === 'polkadot-js');
        if (polkadotInjector) {
            console.log('polkadot-js extension found');
            const allAccounts = await web3Accounts();
            this.substrateAccount = allAccounts[0].address;
        }
    }
    async conntectToApi() {
        this.wssProvider = new WsProvider('wss://rpc.polkadot.io');
        this.api = await ApiPromise.create({ provider: this.wssProvider });
    }
    async getBalance() {
        const { data: balance } = await this.api?.query.system.account(this.substrateAccount);
        const chainDecimals = this.api?.registry.chainDecimals[0];
        this.balance = formatBalance(balance.free, { decimals: chainDecimals });
    }
    get currentAccount() {
        return this.substrateAccount;
    }
    get currentApi() {
        return this.api;
    }
    get currentBalance() {
        return this.balance;
    }
}
export default SubstrateWallet;
