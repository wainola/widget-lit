import { ApiPromise } from '@polkadot/api';
declare class SubstrateWallet {
    private substrateAccount;
    api: ApiPromise | undefined;
    private wssProvider;
    private balance;
    connect(): Promise<void>;
    conntectToApi(): Promise<void>;
    getBalance(): Promise<void>;
    get currentAccount(): string | undefined;
    get currentApi(): ApiPromise;
    get currentBalance(): any;
}
export default SubstrateWallet;
