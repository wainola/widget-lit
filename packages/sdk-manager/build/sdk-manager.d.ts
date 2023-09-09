import { EVMAssetTransfer, EvmFee, Fungible, SubstrateAssetTransfer, Transfer } from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { EvmWallet, SubstrateWallet } from 'packages/wallet-manager/build';
declare class SDKController implements ReactiveController {
    private host;
    evmAssetTransfer: EVMAssetTransfer | undefined;
    substrateAssetTransfer: SubstrateAssetTransfer | undefined;
    evmWallet: EvmWallet | undefined;
    substrateWallet: SubstrateWallet | undefined;
    constructor(host: ReactiveControllerHost, evmWallet?: EvmWallet, substrateWallet?: SubstrateWallet);
    hostConnected(): void;
    hostDisconnected(): void;
    createEvmAssetTransfer(): Promise<void>;
    createFungibleTransfer(address: string, destinationChainId: number, destinationAddress: string, resourceId: string, amount: string): Promise<Transfer<Fungible>>;
    getFee(transfer: Transfer<Fungible>): Promise<EvmFee>;
    buildApprovals(transfer: Transfer<Fungible>, fee: EvmFee): Promise<unknown[]>;
}
export default SDKController;
