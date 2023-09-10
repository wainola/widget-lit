import { EVMAssetTransfer, EvmFee, Fungible, SubstrateAssetTransfer, Transfer } from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { EvmWallet, Substrate } from '@wainola/lit-wallet-manager';
import { UnsignedTransaction } from '@ethersproject/transactions';
import { PopulatedTransaction } from '@ethersproject/contracts';
declare class SDKController implements ReactiveController {
    private host;
    evmAssetTransfer: EVMAssetTransfer | undefined;
    substrateAssetTransfer: SubstrateAssetTransfer | undefined;
    evmWallet: EvmWallet | undefined;
    substrateWallet: Substrate | undefined;
    constructor(host: ReactiveControllerHost, evmWallet?: EvmWallet, substrateWallet?: Substrate);
    hostConnected(): void;
    hostDisconnected(): void;
    createEvmAssetTransfer(): Promise<void>;
    createFungibleTransfer(address: string, destinationChainId: number, destinationAddress: string, resourceId: string, amount: string): Promise<Transfer<Fungible>>;
    getFee(transfer: Transfer<Fungible>): Promise<EvmFee>;
    buildApprovals(transfer: Transfer<Fungible>, fee: EvmFee): Promise<UnsignedTransaction[]>;
    buildTransferTransaction(transfer: Transfer<Fungible>, fee: EvmFee): Promise<PopulatedTransaction>;
}
export default SDKController;
