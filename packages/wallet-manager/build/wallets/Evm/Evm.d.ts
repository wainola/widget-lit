import { UnsignedTransaction, ethers } from 'ethers';
declare class EvmWallet {
    private metamask;
    private account;
    private provider;
    private balance;
    connect(): void;
    getAccount(): Promise<void>;
    getBalance(): Promise<void>;
    getSigner(): ethers.providers.JsonRpcSigner | undefined;
    sendTransaction(approval: UnsignedTransaction): Promise<ethers.providers.TransactionResponse> | undefined;
    get currentAccount(): string | undefined;
    get currentProvider(): ethers.providers.Web3Provider | undefined;
    get currentBalance(): string | undefined;
}
export default EvmWallet;