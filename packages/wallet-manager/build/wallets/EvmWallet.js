import { ethers } from 'ethers';
class EvmWallet {
    connect() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window.ethereum !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.metamask = window.ethereum;
            this.provider = new ethers.providers.Web3Provider(this.metamask);
        }
    }
    async getAccount() {
        if (this.metamask) {
            const accounts = await this.metamask.request({
                method: 'eth_requestAccounts'
            });
            this.account = accounts[0];
        }
    }
    async getBalance() {
        if (this.account && this.provider) {
            const signer = this.getSigner();
            const balance = await signer?.getBalance();
            this.balance = ethers.utils.formatEther(balance);
        }
    }
    getSigner() {
        if (this.provider) {
            return this.provider.getSigner();
        }
    }
    get currentAccount() {
        return this.account;
    }
    get currentProvider() {
        return this.provider;
    }
    get currentBalance() {
        return this.balance;
    }
}
export default EvmWallet;
