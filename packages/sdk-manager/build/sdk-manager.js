import { createEvmAssetTransfer } from './sdk-utils';
// This is a reactive controller that works as a react hook... kind of
class SDKController {
    constructor(host, evmWallet, substrateWallet) {
        // Storing the reference to the host element
        this.host = host;
        this.evmWallet = evmWallet;
        this.substrateWallet = substrateWallet;
        // Register for lifecycle updates
        host.addController(this);
    }
    hostConnected() {
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
    hostDisconnected() {
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
    async createEvmAssetTransfer() {
        if (this.evmWallet) {
            this.evmAssetTransfer = await createEvmAssetTransfer(this.evmWallet);
        }
    }
}
export default SDKController;
