import { EVMAssetTransfer, SubstrateAssetTransfer } from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';
declare class SDKController implements ReactiveController {
    private host;
    evmAssetTransfer: EVMAssetTransfer | undefined;
    substrateAssetTransfer: SubstrateAssetTransfer | undefined;
    constructor(host: ReactiveControllerHost);
    hostConnected(): void;
    hostDisconnected(): void;
}
export default SDKController;
